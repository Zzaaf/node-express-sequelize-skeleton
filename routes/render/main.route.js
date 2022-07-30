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
      res.redirect('/auth');
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
      res.redirect('/auth');
    }
  });

// маршрутизация панели управления
router.route('/dashboard')
  .get((req, res) => {
    const { user } = req.session;

    if (user) {
      res.renderComponent(Dashboard, { title: 'Your Dashboard', user });
    } else {
      res.redirect('/auth');
    }
  });

module.exports = router;
