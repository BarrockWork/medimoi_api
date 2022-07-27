var express = require('express');
const { findAll, findById, createUserPlan} = require('../controllers/UserPlanController');
var router = express.Router();

router.get("/all", findAll);
router.get('/:id', findById);
router.post("/new", createUserPlan);

module.exports = router;