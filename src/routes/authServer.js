// Initialize express server
const express = require("express");
const router = express.Router();

const {signUp, login, verify} = require('./../controllers/AuthentificationController');


/* Formulaire de connexion */
/**
 * @apiDescription This is how we connect to dashboard
 * @apiGroup Login
 * @api {POST} /api/auth/login Login user
 * @apiName Login
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 * {
 *   "email": "admin@mail.com",
 *   "password":"Azerty"
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/auth/login
 *
 * @apiVersion 0.1.0
 */
router.post('/login', login)

//inscription
/**
 * @apiDescription This is how we signup to dashboard
 * @apiGroup Signup
 * @api {POST} /api/auth/signup Register user
 * @apiName signUp
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 * {
 *   "firstName": "test",
 *   "lastName": "user",
 *   "age": 31,
 *   "cellphone": "0314568899",
 *   "homephone": "0314568899",
 *   "email": "user@gmail.com",
 *   "password": "password12345",
 *    user_type_id": 1
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/auth/signup
 *
 * @apiVersion 0.1.0
 */
router.post('/signup', signUp)

router.get('/', verify)

module.exports = router;

