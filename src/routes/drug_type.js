var express = require('express');
var router = express.Router();
const {
    createDrugType, 
    createManyDrugType, 
    deleteBySlug, 
    findAll, 
    findBySlug, 
    updateBySlug, 
    findMany,
    findById,
    deleteById,
    updateById,
} = require('../controllers/DrugTypeController');


/**
 * Define a global DrugType not found
 * @apiDefine DrugTypeNotFoundError
 * @apiError DrugTypeNotFoundError DrugType was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DrugTypeNotFoundError"
 *     }
 */



/**
 * Define parameters for the request
 *
 * @apiDefine DrugTypeParams
 * @apiBody {String[2..50]} name DrugType name.
 * @apiBody {String[2..50]} description DrugType description.
 */



/**
 * @apiGroup DrugType
 * @api {POST} /api/drug_types/new Create new Drug type
 * @apiName CreateDrugType
 *
 * @apiUse DrugTypeParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    name: "pommade",
 *    description: "gel froid ",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDrugType);

/**
 * @apiDescription Insert many level of drugs
 * @api {POST} /api/drug_types/news Create many DrugsType
 * @apiName CreateManyDrugsType
 * @apiGroup DrugType
 *
 *
 * @apiUse DrugTypeParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *             level: 3,
 *             description: "niveau 3",
 *          },
 *          {
 *          level: 4,
 *          description: "niveau 4",
 *          },
 *          {
 *            level: 5,
 *            description: "niveau 5",
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/drug_types/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDrugType);

/**
 * @apiGroup DrugType
 * @api {GET} /api/drug_types/all?filter={}&range=[0,10]&sort=["id","ASC"] Get all Drug Type
 * @apiName GetAllDrug
 * @apiDescription Get all Drug Type filtered by filter and sorted by sort
 * 
 * @apiParam {Object} [filter] Filter on a criteria
 * @apiParam {Object} [range] To retrieve only some entries
 * @apiParam {Object} [sort] To sort the entries
 *
 * @apiUse DrugTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_types/all?filter={}&range=[0,10]&sort=["id","ASC"]
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);


/**
 * @apiGroup DrugType
 * @api {GET} /api/drug_types/many?filterMany={"id":[1]} Get Many Drug Type filtered by filterMany
 * @apiName GetManyDrugType
 * @apiDescription Get Drug Type list filtered by ressources Ids
 * 
 * @apiUse DrugTypeNotFoundError
 * 
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 * 
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/drug_types/many?filterMany={"id":[1]}
 * 
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);


/**
 * @apiGroup DrugType
 * @api {GET} /api/drug_types/slug/:nameSlug Get drug by slug
 * @apiName GetDrugBySlug
 *
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_types/slug/test
 *
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findBySlug);

/**
 * @apiGroup DrugType
 * @api {GET} /api/drug_types/:id Get drug by id
 * @apiName GetDrugById
 * 
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} id Id
 * 
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/drug_types/1
 * 
 * @apiVersion 0.1.0
 */
router.get('/:id', findById);

/**
 * @apiGroup DrugType
 * @api {PUT} /api/drug_types/slug/:nameSlug Update drug
 * @apiName UpdateDrugTypeBySlug
 *
 *
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiBody {String[2..50]} [name] drug name.
 * @apiBody {String[2..50]} [description] drug.
 * @apiBody {Boolean} [isActive=false] Optional drug slug.
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    name: "lisopaine",
 *    description: "gellulle gout menthe",
 *    isActive: true,
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateBySlug);

/**
 * @apiGroup DrugType
 * @api {PUT} /api/drug_types/:id Update drug
 * @apiName UpdateDrugTypeById
 * 
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} id Id
 * 
 * @apiBody {String[2..50]} [name] drug name.
 * @apiBody {String[2..50]} [description] drug.
 * @apiBody {Boolean} [isActive=false] Optional drug slug.
 * 
 * @apiHeaderExample {json} Header-Example:
 *  {
 *   'Content-Type': 'application/json'
 * }
 * 
 * @apiParamExample {json} Request-Example
 * {
 *   name: "lisopaine",
 *   description: "gellulle gout menthe",
 *   isActive: true,
 * }
 * 
 * @apiVersion 0.1.0
 */
router.put('/:id', updateById);


/**
 * @apiGroup DrugType
 * @api {DELETE} /api/drug_types/slug/:nameSlug Delete drug
 * @apiName DeleteDrugType
 *
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_types/slug/comprime
 *
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteBySlug);


/**
 * @apiGroup DrugType
 * @api {DELETE} /api/drug_types/:id Delete drug
 * @apiName DeleteDrugType
 * 
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} id Id
 * 
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/drug_types/1
 * 
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteById);


module.exports = router;