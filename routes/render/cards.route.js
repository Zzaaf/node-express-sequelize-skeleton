/* eslint-disable max-len */
const router = require('express').Router();
const { Card } = require('../../db/models');
const CardsList = require('../../views/CardsList');
const CardItem = require('../../views/CardItem');

router.route('/')
  .get(async (req, res) => {
    const { userId } = req.session;

    Card.findAll({ where: { author: userId }, raw: true })
      .then((cards) => res.renderComponent(CardsList, { user: res.locals.user, title: 'Your cards', cards }));
  })
  .post(async (req, res) => {
    const { userId } = req.session;
    const { title, content } = req.body;

    if (title && content) {
      Card.create({ title, content, author: userId })
        .then(({ dataValues }) => res.status(201).renderComponent(CardItem, { card: dataValues }, { doctype: false }));
    } else {
      res.status(400).json({ created: false });
    }
  });

router.route('/:id')
  .get((req, res) => {

  })
  .put((req, res) => {

  })
  .delete(async (req, res) => {
    const { id } = req.params;

    Card.destroy({ where: { id } })
      .then((deletedCard) => (deletedCard ? res.json(id) : res.status(404).json(deletedCard)))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
