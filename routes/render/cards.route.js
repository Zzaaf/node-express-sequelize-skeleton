const router = require('express').Router();
const CardsList = require('../../views/CardsList');
const { Card } = require('../../db/models');

router.route('/')
  .get((req, res) => {
    res.renderComponent(CardsList);
  })
  .post(async (req, res) => {
    await Card.create({ title: 'Example', author: req.session.userId });
    res.send('Card created!');
  });

router.route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
