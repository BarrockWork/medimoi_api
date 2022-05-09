let express = require('express');
let router = express.Router();

const {
  createOne,
  createMany,
  findOneByNameSlug,
  getAll,
  getMany,
  GetOneById,
  updateOne,
  updateOneById,
  deleteOne,
  deleteOneById,
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
 *              "tva": "FR789456123"
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
 * @apiSampleRequest http://localhost:4000/api/company/all
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

/**
 * @apiDescription Get all Companies with some ressources
 * @api {GET} /api/company/many Get all Company
 * @apiName GetManyCompany
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
 * @apiSampleRequest http://localhost:4000/api/company/many
 * @apiVersion 0.1.0
 */
router.get('/many', getMany);
/**
 * @apiDescription Get a Company by the nameSlug
 * @api {GET} /api/company/:nameSlug Get Company by nameSlug
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
router.get('/slug/:nameSlug', findOneByNameSlug);

/**
 * @apiDescription Get a Company by the Id
 * @api {GET} /api/company/:id Get Company by Id
 * @apiName GetByIdCompany
 * @apiGroup Company
 *
 * @apiParam {int} id id of the Company.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', GetOneById);

/**
 * @apiDescription Update a single Company by nameSlug
 * @api {PUT} /api/company/:nameslug Update single Company by nameSlug
 * @apiName UpdateSingleCompanyByNameslug
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
router.put('/slug/:nameSlug', updateOne);

/**
 * @apiDescription Delete a single Company
 * @api {DELETE} /api/company/:id Delete single Company by ID
 * @apiName DeleteSingleCompanyById
 * @apiGroup Company
 * @apiParam {Int} id Company's ID
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse CompanyNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/company/:id
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOneById);

/**
 * @apiDescription Update a single Company by ID
 * @api {PUT} /api/company/:id Update single Company by ID
 * @apiName UpdateSingleCompanyById
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
 * @apiParam {Int} id company's ID
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
 * @apiSampleRequest http://localhost:4000/api/company/:id
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOneById);

/**
 * @apiDescription Delete a single Company by NameSlug
 * @api {DELETE} /api/company/:nameSLug Delete single Company by NameSlug
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
router.delete('/slug/:nameSlug', deleteOne);

module.exports = router;
