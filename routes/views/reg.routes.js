const router = require('express').Router();
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../../middleware/auth');
const { User } = require('../../db/models');

// компоненты
const Registration = require('../../components/Registration');

const saltRounds = 10;

// маршрутизация регистрации
router.route('/')
  .get(sessionChecker, (req, res) => {
    res.renderComponent(Registration);
  })

  // POST запрос с функцией next, для передачи ошибки
  .post(async (req, res, next) => {
    const { username, email, password } = req.body;

    // получение пользователя из БД для дальнейшей проверки
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

        // наполнение сессии ID зарегистрированного пользователя
        req.session.userId = user.id;

        res.status(201).json({ registration: true, url: '/dashboard' });
      } catch (error) {
        next(error);
      }
    }
  });

module.exports = router;
