var express = require('express');
var router = express.Router();

const { getClientByEmail } = require('./../controllers/TestController');

/**
 * GET home page.
 * @api {get} /test/:id Request Test information
 * @apiName Example
 * @apiGroup Example
 *
 * @apiParam {Number} id Test unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: "Bienvenue sur l 'api Médi'Moi" });
});

router.get('/client', getClientByEmail);

module.exports = router;
