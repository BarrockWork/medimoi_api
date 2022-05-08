let express = require('express');
let router = express.Router();

const {
  createOne,
  createMany,
  findOneById,
  findAll,
  findMany,
  findByUserId,
  updateOne,
  deleteOne,
} = require('./../controllers/UserCompanyController');

/* DEFINES -------------------------------------------*/

/**
 * Define a global UserCompany not found
 * @apiDefine UserCompanyNotFoundError
 * @apiError UserCompanyNotFound UserCompany was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserCompanyNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine UserCompanyPOSTParam
 * @apiBody {Number} company_id Company id.
 * @apiBody {Number} user_id User id.
 */

/* ROUTES --------------------------------------------*/
/**
 * @apiDescription Insert single UserCompany
 * @api {POST} /api/user_company/new Create single UserCompany
 * @apiName CreateUserCompany
 * @apiGroup UserCompany
 *
 * @apiUse UserCompanyPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "company_id": 1,
 *     "user_id": 1
 *  }
 * @apiSampleRequest http://localhost:4000/api/user_company/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Update a single UserCompany
 * @api {PUT} /api/user_company/:id Update single UserCompany
 * @apiName UpdateSingleUserCompany
 * @apiGroup UserCompany
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {Number} [company_id=1] Company id.
 * @apiBody {Boolean} [isActive=true] Is active.
 *
 * @apiParam {Number} id Id
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "company_id": 3,
 *     "isActive":   false
 *  }
 *
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/:id
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOne);

/**
 * @apiDescription Insert many UserCompany
 * @api {POST} /api/user_company/news Create many UserCompany
 * @apiName CreateManyUserCompany
 * @apiGroup UserCompany
 *
 * @apiUse UserCompanyPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *              "company_id": 1,
 *              "user_id": 1
 *          },
 *          {
 *              "company_id": 2,
 *              "user_id": 2
 *          },
 *          {
 *              "company_id": 3,
 *              "user_id": 3
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/user_company/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get UserCompanies by User id
 * @api {GET} /api/user_company/user/:id Get UserCompanies by User id
 * @apiName GetByUserIdUserCompany
 * @apiGroup UserCompany
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/user/:id
 * @apiVersion 0.1.0
 */
router.get('/user/:id', findByUserId);

/**
 * @apiDescription Get all UserCompanies
 * @api {GET} /api/user_company/all/:isActive? Get all UserCompany
 * @apiName GetAllUserCompany
 * @apiGroup UserCompany
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/all/:isActive?
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);

/**
 * @apiDescription Get all UserCompanies
 * @api {GET} /api/user_company/many Get many UserCompany
 * @apiName GetManyUserCompany
 * @apiGroup UserCompany
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/many
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiDescription Get a UserCompany by id
 * @api {GET} /api/user_company/:id Get UserCompany by id
 * @apiName GetByIdUserCompany
 * @apiGroup UserCompany
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', findOneById);

/**
 * @apiDescription Delete a single UserCompany
 * @api {DELETE} /api/user_company/:id Delete single UserCompany
 * @apiName DeleteSingleUserCompany
 * @apiGroup UserCompany
 * @apiParam {Number} id Id
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse UserCompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_company/:id
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOne);

module.exports = router;
