const router = require('express').Router();
const bcrypt = require('bcrypt');
const { mailer, messageCreator } = require('../../config/nodemailerConfig');
const { User } = require('../../db/models');

// компоненты
const Authorization = require('../../components/Authorization');
const Forgot = require('../../components/Forgot');

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
    const userInDb = await User.findOne({ where: { email }, raw: true });

    if (userInDb) {
      // формирование письма на почту + клиентское информирование
      console.log(userInDb);

      // фактическая отправка письма на почту пользователя
      mailer(messageCreator(userInDb.email, 'Reset your password', `
        If you have forgotten your account password, you can recover it at any time.
      `));

      // JSON ответ для редиректа на панель управления
      res.json({ reset: true, message: 'Password reset email has been sent' });
    } else {
      // JSON ответ с сообщением в случае некорректного ввода или отсутствия пользователя в БД
      res.status(403).json({ reset: false, message: 'This email is not used in the system' });
    }
  });

module.exports = router;
