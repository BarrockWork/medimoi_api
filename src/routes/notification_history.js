var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
} = require('./../controllers/NotificationHistory');

router.get('/', getAll);
router.post('/new', createOne);
router.get('/:id', getOneById);
router.put('/:id/edit', updateOne);
router.delete('/:id/delete', deleteOne);
module.exports = router;
