var express = require('express');
var router = express.Router();
const {
  createOne,
  createMany,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUser,
} = require('./../controllers/UserController');

/**
 * Define parameters for the request
 *
 * @apiDefine UserParams
 * @apiBody {String[2..50]} firstName user's firstName.
 * @apiBody {String[2..50]} lastName user's lastName.
 * @apiBody {Int} age user's age.
 * @apiBody {String[2..50]} email user's email
 * @apiBody {String[2..255]} password user's plain password.
 * @apiBody {String[2..50]}  cellphone user's  cellphone.
 * @apiBody {String[2..50]} homephone user's  homephone.
 * @apiBody {String[2..50]}[workphone] workphone user's workphone.
 * @apiBody {Boolean} [isActive=true] User state
 */

/**
 * Define a global User not found
 * @apiDefine UserNotFoundError
 * @apiError UserNotFoundError User was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFoundError"
 *     }
 */

/**
 * @apiDescription This is how we get a user by email
 * @apiGroup User
 * @api {GET} /api/users/:email Get user by Id
 * @apiName getUserByEmail
 *
 * @apiUse UserNotFoundError
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
 *     age:             30,
 *     email:           "jdoe@medimoi.com"
 *     password:        "plain password",
 *     cellphone:       "0123456789"
 *     homephone:       "0123456789"
 *
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/users/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription This is how we create
 * @apiGroup User
 * @api {POST} /api/user/news Create many user
 * @apiName createMany
 *
 * @apiUse UserParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *{
      "entries":[
 *    {
 *      firstName:       "john",
 *      lastName:        "doe",
 *      age:             30,
 *      email:           "jdoe@medimoi.com"
 *      password:        "plain password",
 *      cellphone:       "0123456789"
 *      homephone:       "0123456789"
 *
 *    },
 *   {
 *      firstName:       "john",
 *      lastName:        "doe",
 *      age:             30,
 *      email:           "jdoe@medimoi.com"
 *      password:        "plain password",
 *      cellphone:       "0123456789"
 *      homephone:       "0123456789"
 *
 *    },
 *    {
 *     firstName:       "john",
 *     lastName:        "doe",
 *     age:             30,
 *     email:           "jdoe@medimoi.com"
 *     password:        "plain password",
 *     cellphone:       "0123456789"
 *     homephone:       "0123456789"
 *
 *     }
 *    ]
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/users/news
 *
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription This is how we update a user by ID
 * @apiGroup User
 * @api {PUT} /api/user/:id/edit Update user
 * @apiName updateUserByEmail
 *
 *
 * @apiBody {String[2..50]} [firstName] user's firstName.
 * @apiBody {String[2..50]} [lastName] user's lastName.
 * @apiBody {Int} [age] user's age.
 * @apiBody {String[2..50]} [email] user's email
 * @apiBody {String[2..255]} [password] user's  plain password.
 * @apiBody {String[2..50]}  [cellphone] user's  cellphone.
 * @apiBody {String[2..50]} [homephone] user's  homephone.
 * @apiBody {String[2..50]} [workphone] user's workphone.
 * @apiBody {String[2..50]} [isActive=true] User state
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     firstName:       "brian",
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/users/:email/edit
 *
 * @apiUse UserNotFoundError
 *
 * @apiParam {String[2..50]} email User Email
 *
 * @apiVersion 0.1.0
 */
router.put('/:email/edit', updateUserByEmail);

/**
 * @apiDescription This is how we delete a user by ID
 * @apiGroup User
 * @api {DELETE} /api/user/:id/delete Delete a user
 * @apiName deleteUser
 *
 * @apiBody {String[2..50]}  Email User email.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     email:       "jdoe@medimoi.com",
 *  }
 * @apiSampleRequest http://localhost:4000/api/users/:email/delete
 *
 * @apiParam {String[50]} email User Email
 *
 * @apiUse UserNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:email/delete', deleteUser);

/**
 * @apiDescription This is how we get all the users
 * @apiGroup User
 * @api {GET} /api/user/all Get all Users
 * @apiName getAllUsers
 *
 * @apiSampleRequest http://localhost:4000/api/users/all
 *
 * @apiUse UserNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/:isActive?', getAllUsers);

module.exports = router;
