var express = require('express');
const { findAll, findById } = require('../controllers/PlanPeriodicityController');
var router = express.Router();

router.get("/all", findAll);
router.get('/:id', findById);

module.exports = router;