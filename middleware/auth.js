const { User } = require('../db/models');

// промежуточная функция для очистки куки при истёкшей сессии на сервере
const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_uid && !req.session.userId) {
    res.clearCookie('user_uid');
    res.redirect('/');
  } else {
    next();
  }
};

// промежуточная функция проверки авторизированного пользователя
const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

// промежуточная функция наполнения локальных переменных
const resLocals = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
  }

  next();
};

// промежуточная функция поиска пользователя в БД по ID из сессии
const getUser = async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findByPk(Number(req.session.userId), { raw: true });
  }

  next();
};

module.exports = {
  cookiesCleaner, sessionChecker, resLocals, getUser,
};
