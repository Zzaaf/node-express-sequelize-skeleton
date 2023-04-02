const router = require('express').Router();
const { User } = require('../../db/models');

router.route('/users')
  .get((req, res) => {
    User.findAll({ raw: true })
      .then((allUsers) => res.json(allUsers))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .post((req, res) => {
    User.create(req.body)
      .then((newUser) => res.status(201).json(newUser))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

router.route('/users/:id')
  .put((req, res) => {
    const { id } = req.params;

    User.update(req.body, { where: { id }, returning: true })
      .then((updatedUser) => res.status(201).json(updatedUser))
      .catch((error) => res.status(500).json({ error }));
  })
  .delete((req, res) => {
    const { id } = req.params;

    User.destroy({ where: { id } })
      .then((deletedUser) => (deletedUser ? res.json(id) : res.status(404).json(deletedUser)))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
