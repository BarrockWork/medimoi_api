var express = require('express');
var router = express.Router();
const {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
} = require('../controllers/KhysInfoController');

router.post('/new', createOne);
router.get('/all', getAll);
router.get('/:id', getOneById);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;
