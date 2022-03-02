var express = require('express');
var router = express.Router();

const {
  createOne,
  getAllUserType,
  getOneBySlug,
  deleteUserType,
} = require('./../controllers/UserTypeController');

router.get('/', getAllUserType);
router.get('/:nameSlug', getOneBySlug);
router.post('/new', createOne);
router.delete('/:nameSlug', deleteUserType);
module.exports = router;
