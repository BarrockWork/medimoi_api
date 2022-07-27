var express = require('express');
const { findAll, findById } = require('../controllers/PlanController');
var router = express.Router();

router.get("/all", findAll);
router.get('/:id', findById);

module.exports = router;