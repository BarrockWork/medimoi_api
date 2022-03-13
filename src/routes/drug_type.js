var express = require('express');
var router = express.Router();
const {createDrugType, createManyDrugType, deleteBySlug, getAllDrugType, findBySlug, updateBySlug} = require('../controllers/DrugTypeController');


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
 * @apiGroup Drug_Type
 * @api {POST} /api/drugTypes/new Create new Drug type
 * @apiName CreateDrug_Type
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
 * @api {POST} /api/drugs/news Create many DrugsType
 * @apiName CreateManyDrugsType
 * @apiGroup Drug_Type
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
 * @apiSampleRequest http://localhost:4000/api/drugTypes/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDrugType);

/**
 * @apiGroup Drug_Type
 * @api {GET} /api/drugTypes Get all Drug Type
 * @apiName GetAllDrug
 *
 * @apiUse DrugTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAllDrugType);


/**
 * @apiGroup Drug_Type
 * @api {GET} /api/drugTypes/:nameSlug Get drug by slug
 * @apiName GetDrugBySlug
 *
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes/test
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findBySlug);

/**
 * @apiGroup Drug_Type
 * @api {PUT} /api/drugTypes/:nameSlug/edit Update drug
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
router.put('/:nameSlug/edit', updateBySlug);


/**
 * @apiGroup Drug_Type
 * @api {DELETE} /api/drugTypes/:nameSlug/delete Delete drug
 * @apiName DeleteDrugType
 *
 * @apiUse DrugTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes/comprime/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteBySlug);


module.exports = router;