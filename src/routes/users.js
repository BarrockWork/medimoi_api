var express = require('express');
var router = express.Router();
const {
  createOne,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUser,
} = require('./../controllers/UserController');

/**
 * Define parameters for the request
 *
 * @apiDefine UserParams
 * @apiBody {String} [firstName=john] firstName user's firstName.
 * @apiBody {String} [lastName=doe] user's lastName.
 * @apiBody {Int} [age=30]age user's age.
 * @apiBody {String} [email=john.doe@medimoi.com] email user's email
 * @apiBody {String} [password=password] password user's  password.
 * @apiBody {String} [cellphone=0123456789] cellphone user's  cellphone.
 * @apiBody {String} [homephone=0123456789] homephone user's  homephone.
 * @apiBody {String} [Workphone=""]  user's workphone.
 * @apiBody {Date} [createdAt=now()] Created date (YYYY-MM-DD hh:mm:ss).
 * @apiBody {Date} [updatedAt=updatedAt()] Updated date (YYYY-MM-DD hh:mm:ss).
 * @apiBody {Boolean} [isActive=true] If user is active at the creation
 */

/**
 * @apiDescription This is how we get all the users
 * @apiGroup User
 * @api {GET} /api/user Get all Users
 * @apiName getAllUsers
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/users
 *
 * @apiSampleRequest http://localhost:4000/api/users/new
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAllUsers);

/**
 * @apiDescription This is how we get a user by ID
 * @apiGroup User
 * @api {GET} /api/users/:id Get user by Id
 * @apiName getUserByEmail
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/users/4711
 *
 * @apiVersion 0.1.0
 */
router.get('/:email', getUserByEmail);

/**
 * @apiDescription This is how we create
 * @apiGroup User
 * @api {POST} /api/user/new Create new user
 * @apiName Createuser
 *
 * @apiUse UserParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     firstName:       "john",
 *     lastName:        "doe",
 *     age:             "30",
 *     password:        "password",
 *     cellphone:       "0123456789"
 *     homephone:       "0123456789"
 *
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/users/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription This is how we update a user by ID
 * @apiGroup User
 * @api {PUT} /api/user/:id Update user
 * @apiName updateUserByEmail
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:       "150",
 *  }
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/users/123
 *
 * @apiSampleRequest http://localhost:4000/api/users/put
 *
 * @apiVersion 0.1.0
 */
router.put('/:email/edit', updateUserByEmail);

/**
 * @apiDescription This is how we delete a user by ID
 * @apiGroup User
 * @api {DELETE} /api/user/:id Delete a user
 * @apiName deleteUser
 *
 * @apiBody {Int}  ID User identifier.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:       "150",
 *  }
 * @apiSampleRequest http://localhost:4000/api/users/delete
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/users/123
 *
 * @apiVersion 0.1.0
 */
router.delete('/:email/delete', deleteUser);

module.exports = router;
