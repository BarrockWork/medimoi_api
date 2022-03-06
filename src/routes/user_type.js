var express = require('express');
var router = express.Router();

const {
  createOne,
  getAllUserType,
  getOneBySlug,
  updateOne,
  deleteOne,
} = require('./../controllers/UserTypeController');

router.get('/', getAllUserType);
router.get('/:nameSlug', getOneBySlug);
router.post('/new', createOne);
router.put('/:nameSlug/edit', updateOne);
router.delete('/:nameSlug/delete', deleteOne);
module.exports = router;
