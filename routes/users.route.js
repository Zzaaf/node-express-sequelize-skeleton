const express = require('express');
const { User } = require('../db/models');

// компоненты
const Login = require('../views/Login');
const Edit = require('../views/Edit');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.renderComponent(Login);
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    res.renderComponent(Edit, { user, id, title: 'Edit your profile' });
  })
  .put((req, res) => {
    const { id } = req.params;

    User.update(req.body, { where: { id }, returning: true, raw: true })
      .then((updatedUser) => {
        const [, [update]] = updatedUser;
        // req.session.user = updatedUser[1][0];
        req.session.user = update;
        res.json({ updated: true, message: '/profile' });
      })
      .catch((error) => res.status(500).render('error', { error: error.message }));
  })
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
