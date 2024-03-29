var express = require('express');
var router = express.Router();
const {createDrugLevel, createManyDrugLevel, findAll, findMany, getById, deleteById, updateById} = require('../controllers/DrugLevelController');

/**
 * Define a global Drug level not found
 * @apiDefine DrugLevelNotFoundError
 * @apiError DrugLevelNotFoundError DrugLevel was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DrugLevelNotFoundError"
 *     }
 */



/**
 * Define parameters for the request
 *
 * @apiDefine DrugLevelParams
 * @apiBody {Int} level drug level.
 * @apiBody {String} description description drug level.
 */


/**
 * @apiGroup Drug_Level
 * @api {POST} /api/drug_levels/new Create new Drug level
 * @apiName CreateDrug_Level
 *
 * @apiUse DrugLevelParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    level: 1,
 *    description: "niveau 1",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDrugLevel);

/**
 * @apiDescription Insert many level of drugs
 * @api {POST} /api/drug_levels/news Create many DrugsLevel
 * @apiName CreateManyDrugsLevel
 * @apiGroup Drug_Level
 *
 * @apiUse DrugLevelParams
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
 * @apiSampleRequest http://localhost:4000/api/drug_levels/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDrugLevel);


/**
 * @apiGroup Drug_Level
 * @api {GET} /api/drug_levels/all?filter={}&range=[0,10]&sort=["id","ASC"] Get all Drug Level 
 * @apiName GetAllDrug
 * @apiDescription Get all Drug Level filtered by filter and sorted by sort
 *
 * @apiUse DrugLevelNotFoundError
 * 
 * @apiParam {Object} [filter] Filter on a criteria
 * @apiParam {Object} [range] To retrieve only some entries
 * @apiParam {Object} [sort] To sort the entries
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_levels/all?filter={}&range=[0,10]&sort=["id","ASC"]
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);

/**
 * @apiGroup Drug_Level
 * @api {GET} /api/drug_levels/many?filterMany={"id":[1]} Get Many Drug Level
 * @apiName GetManyDrugLevel
 * @apiDescription Get Many Drug Level filtered by filterMany
 * 
 * @apiUse DrugLevelNotFoundError
 * 
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 * 
 * @apiExample {curl} Exemple uasage:
 *    curl -i http://localhost:4000/api/drug_levels/many?filterMany={"id":[1]}
 * 
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiGroup Drug_Level
 * @api {GET} /api/drug_levels/:id Get Drug Level by id
 * @apiName GetDrugById
 *
 * @apiUse DrugLevelNotFoundError
 * @apiParam {Int} id id
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_levels/1
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getById);

/**
 * @apiGroup Drug_Level
 * @api {PUT} /api/drug_levels/:id Update drug
 * @apiName UpdatedrugLevelById
 *
 * @apiBody {Int} [level] drug level.
 * @apiBody {String[2..50]} [description] drug level.
 * @apiBody {Boolean} [isActive=false]
 *
 * @apiUse DrugLevelNotFoundError
 * @apiParam {Int} id id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *   level: 1,
 *   description: "niveau 1",
 *   isActive: true
 *  }
 *
 *  @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_levels/1
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateById);


/**
 * @apiGroup Drug_Level
 * @api {DELETE} /api/drugs/:id/delete Delete drugLevel
 * @apiName DeleteDrugLevel
 *
 * @apiUse DrugLevelNotFoundError
 * @apiParam {Int} id id
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drug_levels/1
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteById);


module.exports = router;