var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneBySlug,
  updateOne,
  deleteOne,
} = require('./../controllers/AddressRoadTypeController');

router.get('/', getAll);
router.get('/:nameSlug', getOneBySlug);
router.post('/new', createOne);
router.put('/:nameSlug/edit', updateOne);
router.delete('/:nameSlug/delete', deleteOne);
module.exports = router;
