const router = require('express').Router();
const CardsList = require('../../views/CardsList');

router.route('/')
  .get((req, res) => {
    res.renderComponent(CardsList);
  })
  .post();

router.route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
