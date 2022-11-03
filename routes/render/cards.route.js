const router = require('express').Router();
const CardsList = require('../../views/CardsList');
const { Card } = require('../../db/models');

router.route('/')
  .get(async (req, res) => {
    const { userId } = req.session;

    const cards = await Card.findAll({ where: { author: userId }, raw: true });

    res.renderComponent(CardsList, { user: res.locals.user, title: 'Your cards', cards });
  })
  .post(async (req, res) => {
    const { userId } = req.session;

    await Card.create({ title: 'Example', author: userId });

    res.send('Card created!');
  });

router.route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
