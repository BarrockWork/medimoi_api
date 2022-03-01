var express = require('express');
var router = express.Router();

const { createOne, getAll } = require('./../controllers/UserTypeController');

router.post('/new', createOne);
router.get('/', getAll);

module.exports = router;
