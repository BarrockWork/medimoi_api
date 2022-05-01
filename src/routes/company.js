let express = require('express');
let router = express.Router();

const {
  createOne,
  createMany,
  findOneByNameSlug,
  getAll,
  updateOne,
  deleteOne,
} = require('./../controllers/CompanyController');

/* DEFINES -------------------------------------------*/

/**
 * Define a global Company not found
 * @apiDefine CompanyNotFoundError
 * @apiError CompanyNotFound Company was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CompanyNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine CompanyPOSTParam
 * @apiBody {String[2..50]} name Name.
 * @apiBody {String[2..50]} siret Siret.
 * @apiBody {String[2..50]} tva TVA.
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single Company
 * @api {POST} /api/company/new Create single Company
 * @apiName CreateCompany
 * @apiGroup Company
 *
 * @apiUse CompanyPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "name": "Mon entreprise",
 *     "siret": "123456789152DDZ",
 *     "tva": "FR123456789"
 *  }
 * @apiSampleRequest http://localhost:4000/api/company/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many Company
 * @api {POST} /api/company/news Create many Company
 * @apiName CreateManyCompany
 * @apiGroup Company
 *
 * @apiUse CompanyPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *              "name": "Company 1",
 *              "siret": "123456789152DDZ",
 *              "tva": "FR123456789"
 *          },
 *          {
 *              "name": "Company 2",
 *              "siret": "15669999",
 *              "tva": "FR789456123",
 *          },
 *          {
 *              "name": "Company 3",
 *              "siret": "15669999",
 *              "tva": "FR789456123"
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/company/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get a Company by the nameSlug
 * @api {GET} /api/company/slug/:nameSlug Get Company by nameSlug
 * @apiName GetByNameSlugCompany
 * @apiGroup Company
 *
 * @apiParam {String[2..50]} nameSlug Name slug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findOneByNameSlug);

/**
 * @apiDescription Get all Companies
 * @api {GET} /api/company/all/:isActive? Get all Company
 * @apiName GetAllCompany
 * @apiGroup Company
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/all/:isActive?
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

/**
 * @apiDescription Update a single Company
 * @api {PUT} /api/company/slug/:nameSLug Update single Company
 * @apiName UpdateSingleCompany
 * @apiGroup Company
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [name="New name"] Name (50).
 * @apiBody {String[2..50]} [siret="New siret"] Siret (50).
 * @apiBody {String[2..50]} [tva="New tva"] TVA (50).
 * @apiBody {Boolean} [isActive=true] Is active.
 *
 * @apiParam {String[2..50]} nameSlug Name slug
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "name": "New Name",
 *     "siret": "123456789qsdq",
 *     "tva": "FR789456123",
 *     "isActive":   false
 *  }
 *
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug', updateOne);

/**
 * @apiDescription Delete a single Company
 * @api {DELETE} /api/company/slug/:nameSLug Delete single Company
 * @apiName DeleteSingleCompany
 * @apiGroup Company
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug', deleteOne);

module.exports = router;
