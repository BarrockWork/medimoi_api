var express = require('express');
var router = express.Router();
const {
  createOne,
  getAllUsers,
  getUserById,
  updateUserByid,
  deleteUser,
} = require('./../controllers/UserController');

/**
 * @apiDescription This is how we get all the users
 * @apiGroup User
 * @api {GET} /api/user Get all Users
 * @apiName getAllUsers
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/user
 *
 * @apiVersion 0.1.0
 */
router.get('/users', getAllUsers);

/**
 * @apiDescription This is how we get a user by ID
 * @apiGroup User
 * @api {GET} /api/user/:id Get user by Id
 * @apiName getUserById
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/user/4711
 *
 * @apiVersion 0.1.0
 */
router.get('/user/:id', getUserById);

/**
 * @apiDescription This is how we create
 * @apiGroup User
 * @api {POST} /api/user/new Create new user
 * @apiName Createuser
 *
 * @apiBody {String} firstName user's firstName.
 * @apiBody {String} lastName user's lastName.
 * @apiBody {Int} age user's  r age.
 * @apiBody {String} password user's  password.
 * @apiBody {String} cellphone user's  cellphone.
 * @apiBody {String} homephone user's  homephone.
 * @apiBody {String} [default=empty]  workphone user's  workphone.
 * @apiBody {Date} [default=now()] createdAt   date when a user is created.
 * @apiBody {Date} [default=now()] updatedAt Optional date when a user update his data.
 * @apiBody {Boolean} [isActive=true] If user is active at the creation
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "user exemple",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post('/user/new', createOne);

/**
 * @apiDescription This is how we update a user by ID
 * @apiGroup User
 * @api {PUT} /api/user/:id Update user
 * @apiName updateUserByid
 *
 * @apiBody {String} firstName user's firstName.
 * @apiBody {String} lastName user's lastName.
 * @apiBody {Int} age user's  r age.
 * @apiBody {String} password user's  password.
 * @apiBody {String} cellphone user's  cellphone.
 * @apiBody {String} homephone user's  homephone.
 * @apiBody {String} [default=empty]  workphone user's  workphone.
 * @apiBody {Date} [default=now()] createdAt   date when a user is created.
 * @apiBody {Date} [default=now()] updatedAt Optional date when a user update his data.
 * @apiBody {Boolean} [isActive=true] If user is active at the creation
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:       "user's ID",
 *  }
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/user/123
 *
 * @apiVersion 0.1.0
 */
router.put('/user/:id', updateUserByid);

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
 *     id:       "user's ID",
 *  }
 *
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/user/123
 *
 * @apiVersion 0.1.0
 */
router.delete('/user/:id', deleteUser);

module.exports = router;
