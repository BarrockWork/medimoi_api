var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
} = require('./../controllers/UserNotificationType');

router.get('/', getAll);
router.get('/:id', getOneById);
router.post('/new', createOne);
router.put('/:id/edit', updateOne);
router.delete('/:id/delete', deleteOne);
module.exports = router;
