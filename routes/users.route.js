const express = require('express');
const { User } = require('../db/models');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('login');
  });

router.route('/:id')
  .delete((req, res) => {
    const { id } = req.params;

    User.destroy({ where: { id } })
      .then((deletedUser) => {
        if (deletedUser) {
          // удаление сессии на сервере
          req.session.destroy();

          // серверное удаление куки по имени
          res.clearCookie('user_uid');

          // формирование ответа при успешном удалении
          res.json({ delete: true, message: '/' });
        } else {
          // формирование ответа при некоректном удалении
          res.status(404).json({ delete: false });
        }
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
