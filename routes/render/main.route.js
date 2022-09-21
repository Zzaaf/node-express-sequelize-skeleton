const router = require('express').Router();
const { sessionChecker } = require('../../middleware/auth');

// компоненты
const Home = require('../../views/Home');
const Dashboard = require('../../views/Dashboard');
const Profile = require('../../views/Profile');

// маршрутизация главной страницы
router.route('/')
  .get(sessionChecker, (req, res) => {
    res.renderComponent(Home, { title: 'Simple Auth System' });
  });

router.route('/logout')
  .get((req, res, next) => {
    // получение пользователя из сессии
    const { userId } = req.session;

    if (userId) {
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
      res.redirect('/auth');
    }
  });

// маршрутизация профиля
router.route('/profile')
  .get((req, res) => {
    const { userId } = req.session;

    if (userId) {
      res.renderComponent(Profile, {
        user: res.locals.user,
        registration: res.locals.user.createdAt.toString(),
        ip: req.ip ?? '127.0.0.1',
        title: 'Your Profile',
      });
    } else {
      res.redirect('/auth');
    }
  });

// маршрутизация панели управления
router.route('/dashboard')
  .get((req, res) => {
    const { userId } = req.session;

    if (userId) {
      res.renderComponent(Dashboard, { title: 'Your Dashboard', user: res.locals.user });
    } else {
      res.redirect('/auth');
    }
  });

module.exports = router;
