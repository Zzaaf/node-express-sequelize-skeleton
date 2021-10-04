const express = require('express');
const { User } = require('../db/models');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('login');
  });

router.route('/:id')
  .delete(async (req, res) => {
    const { id } = req.params;

    const users = await User.findAll();

    const index = users.findIndex((el) => el.id === Number(id));

    if (index === -1) {
      res.status(404).json({ delete: false });
    } else {
      await User.destroy({ where: { id } })
        .then(() => {
          // удаление сессии на сервере
          req.session.destroy();
          // серверное удаление куки по имени
          res.clearCookie('user_uid');

          res.status(200).json({ delete: true, message: '/' });
        });
    }
  });

module.exports = router;
