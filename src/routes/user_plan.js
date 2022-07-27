var express = require('express');
const { findAll, findById, createUserPlan, getNbUserPlans, getCa, getLast} = require('../controllers/UserPlanController');
var router = express.Router();

router.get("/all", findAll);
router.get('/ca', getCa);
router.get("/last_orders", getLast)
router.get("/count/:isActive", getNbUserPlans);
router.get('/:id', findById);
router.post("/new", createUserPlan);


module.exports = router;