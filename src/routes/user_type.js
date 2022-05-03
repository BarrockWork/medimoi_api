var express = require('express');
var router = express.Router();

const {
  createOne,
  createMany,
  findAll,
  getOneBySlug,
  getOneById,
  updateOne,
  updateOneById,
  deleteOne,
  deleteOneById,
  findMany,
} = require('./../controllers/UserTypeController');

/**
 * Define a global User Type not found
 * @apiDefine UserTypeNotFoundError
 * @apiError UserTypeNotFoundError User type was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserTypeNotFoundError"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine UserTypePOSTParam
 * @apiBody {String[2..50]} name Name.
 */

/**
 * @apiDescription Get a user type
 * @apiGroup UserType
 * @api {GET} /api/user_type/all Get all user_type
 * @apiName getAllUsertType
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);


/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine UserTypePOSTParam
 * @apiBody {String[2..50]} name Name.
 */

/**
 * @apiDescription Get many user type
 * @apiGroup UserType
 * @api {GET} /api/user_type/many Get many user_type
 * @apiName getManyUserType
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/many
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiDescription Get a single user Type by name slug
 * @apiGroup UserType
 * @api {GET} /api/user_type/:nameSlug Get user_type by nameSlug
 * @apiName getOneBySlug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     nameSlug:           "test-slug"
 *  }
 *
 * @apiParam {String[2..50]} nameSlug User type nameSlug
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/:nameSlug
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', getOneBySlug);

/**
 * @apiDescription Get a single user Type by name slug
 * @apiGroup UserType
 * @api {GET} /api/user_type/:nameSlug Get user_type by id
 * @apiName getOneById
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     nameSlug:           "test-slug"
 *  }
 *
 * @apiParam {String[2..50]} nameSlug User type nameSlug
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/:nameSlug
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getOneById);

/**
 * @apiDescription Insert a single user type
 * @apiGroup UserType
 * @api {POST} /api/user_type/new Create new user_type
 * @apiName createOne
 *
 * @apiBody {String[2..50]} name name userType name.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":"name"
 *  }
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many user types
 * @api {POST} /api/user_type/news Create many user_type
 * @apiName createMany
 * @apiGroup UserType
 *
 * @apiUse UserTypePOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *              "name": "Type 1"
 *          },
 *          {
 *              "name": "Type 2"
 *          },
 *          {
 *              "name": "Type 3",
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/user_type/news
 *
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Update a user by ID
 * @apiGroup UserType
 * @api {PUT} /api/user/:nameSlug/edit Update user type
 * @apiName updateOne
 *
 * @apiBody {String[2..50]} name user type name.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "update-new-type",
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/:nameSlug/edit
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiParam {String[2..50]} nameSlug User type name slug
 *
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug/edit', updateOne);


/**
 * @apiDescription Update a user by ID
 * @apiGroup UserType
 * @api {PUT} /api/user_type/:id Update user type by ID
 * @apiName updateOneById
 *
 * @apiBody {String[2..50]} name user type name.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "update-new-type",
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/user_type/:id
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiParam {String[2..50]} nameSlug User type name slug
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOneById);

/**
 * @apiDescription Delete a user type by name slug
 * @apiGroup UserType
 * @api {DELETE} /api/user_type/:nameSlug/delete Delete a user type
 * @apiName deleteOne
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
 * @apiSampleRequest http://localhost:4000/api/user_type/:nameSlug/delete
 *
 * @apiParam {String[2..50]} nameSlug User type name slug
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteOne);


/**
 * @apiDescription Delete a user type by name slug
 * @apiGroup UserType
 * @api {DELETE} /api/user_type/:id Delete a user type by ID
 * @apiName deleteOneById
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
 * @apiSampleRequest http://localhost:4000/api/user_type/:id
 *
 * @apiParam {String[2..50]} nameSlug User type name slug
 *
 * @apiUse UserTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOneById);

module.exports = router;
