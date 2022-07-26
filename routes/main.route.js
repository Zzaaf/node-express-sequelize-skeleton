const express = require('express');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/auth');
const { User } = require('../db/models');

// компоненты
const Home = require('../views/Home');
const Registration = require('../views/Registration');
const Login = require('../views/Login');
const Dashboard = require('../views/Dashboard');
const Profile = require('../views/Profile');

const router = express.Router();
const saltRounds = 10;

// маршрутизация главной страницы
router.route('/')
  .get(sessionChecker, (req, res) => {
    res.renderComponent(Home, { title: 'Simple Auth System' });
  });

// маршрутизация регистрации
router.route('/registration')

  .get(sessionChecker, (req, res) => {
    res.renderComponent(Registration);
  })

  // POST запрос с функцией next, для передачи ошибки
  .post(async (req, res, next) => {
    const { username, email, password } = req.body;

    const userInDb = await User.findOne({ where: { email } });

    if (userInDb) {
      res.status(403).json({ registration: false, message: 'This email is already in use' });
    } else {
      try {
        const user = new User({
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
        });

        // дожидаемся асинхронного сохранения ресурса в базе
        await user.save();

        // формирование сессии, user добавляется в неё как объект
        req.session.user = user;

        res.status(201).json({ registration: true, message: '/dashboard' });
      } catch (error) {
        next(error);
      }
    }
  });

// маршрутизация авторизации
router.route('/login')
  .get((req, res) => {
    res.renderComponent(Login, { title: 'Login in system' });
  })

  .post(async (req, res) => {
    // получение значений из тела запроса
    const { email, password } = req.body;

    // поиск в БД по email и получение объекта пользователя
    const user = await User.findOne({ where: { email } });

    // двойная проверка, на наличие пользователя в БД и совпадение паролей в БД и теле запроса
    if (user && (await bcrypt.compare(password, user.password))) {
      // формирование сессии на основе полученного пользователя из БД
      req.session.user = user;

      // JSON ответ для редиректа на панель управления
      res.json({ login: true, message: '/dashboard' });
    } else {
      // JSON ответ с сообщением в случае некорректного ввода или отсутствия пользователя в БД
      res.status(403).json({ login: false, message: 'This email is not used in the system' });
    }
  });

router.route('/logout')
  .get((req, res, next) => {
    // получение пользователя из сессии
    const { user } = req.session;

    if (user) {
      try {
        // удаление сессии на сервере
        req.session.destroy();

        // серверное удаление куки по имени
        res.clearCookie('user_uid');

        // редирект на корень
        res.redirect('/');
      } catch (error) {
        next(error);
      }
    } else {
      res.redirect('/login');
    }
  });

// маршрутизация профиля
router.route('/profile')
  .get((req, res) => {
    const { user } = req.session;

    if (user) {
      res.renderComponent(Profile, {
        user,
        registration: user.createdAt.slice(0, 10),
        ip: req.ip ?? '127.0.0.1',
        title: 'Your Profile',
      });
    } else {
      res.redirect('/login');
    }
  });

// маршрутизация панели управления
router.route('/dashboard')
  .get((req, res) => {
    const { user } = req.session;

    if (user) {
      res.renderComponent(Dashboard, { title: 'Your Dashboard', user });
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;
