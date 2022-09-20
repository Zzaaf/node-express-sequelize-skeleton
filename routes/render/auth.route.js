const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

// компоненты
const Authorization = require('../../views/Authorization');
const Forgot = require('../../views/Forgot');

// маршрутизация авторизации
router.route('/')
  .get((req, res) => {
    res.renderComponent(Authorization, { title: 'Login in system' });
  })

  .post(async (req, res) => {
    // получение значений из тела запроса
    const { email, password } = req.body;

    // поиск в БД по email и получение объекта пользователя
    const user = await User.findOne({ where: { email } });

    // двойная проверка, на наличие пользователя в БД и совпадение паролей в БД и теле запроса
    if (user && (await bcrypt.compare(password, user.password))) {
      // наполнение сессии ID авторизованного пользователя
      req.session.userId = user.id;

      // JSON ответ для редиректа на панель управления
      res.json({ login: true, url: '/dashboard' });
    } else {
      // JSON ответ с сообщением в случае некорректного ввода или отсутствия пользователя в БД
      res.status(403).json({ login: false, message: 'This email is not used in the system' });
    }
  });

router.route('/forgot')
  .get((req, res) => {
    res.renderComponent(Forgot, { title: 'Reset your password' });
  })
  .post(async (req, res) => {
    // получение значений из тела запроса
    const { email } = req.body;

    // поиск в БД по email и получение объекта пользователя
    const user = await User.findOne({ where: { email } });

    // двойная проверка, на наличие пользователя в БД и совпадение паролей в БД и теле запроса
    if (user) {
      // формирование письма на почту + клиентское информирование
      console.log(user);

      // JSON ответ для редиректа на панель управления
      res.json({ reset: true, message: 'Password reset email has been sent' });
    } else {
      // JSON ответ с сообщением в случае некорректного ввода или отсутствия пользователя в БД
      res.status(403).json({ reset: false, message: 'This email is not used in the system' });
    }
  });

module.exports = router;
