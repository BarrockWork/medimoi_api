var express = require('express');
var router = express.Router();
const {createDrugLevel, createManyDrugLevel, getAllDrugLevel, getById, deleteById, updateById} = require('../controllers/drugLevelController');


/**
 * @apiGroup Drug_Level
 * @api {POST} /api/drugLevels/new Create new Drug level
 * @apiName CreateDrug_Level
 *
 * @apiBody {Int} level drug level.
 * @apiBody {String} description drug level.
 *
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
 * @api {POST} /api/drugs/news Create many DrugsLevel
 * @apiName CreateManyDrugsLevel
 * @apiGroup Drug_Level
 *
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
 * @apiSampleRequest http://localhost:4000/api/drugs/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDrugLevel);


/**
 * @apiGroup Drug_Level
 * @api {GET} /api/drugLevels Get all Drug Level
 * @apiName GetAllDrug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugLevels
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAllDrugLevel);

/**
 * @apiGroup Drug_Level
 * @api {GET} /api/drugLevels/:id Get Drug Level by id
 * @apiName GetDrugById
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugLevels/1
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getById);

/**
 * @apiGroup Drug_Level
 * @api {PUT} /api/drugLevels/:id/edit Update drug
 * @apiName UpdatedrugLevelById
 *
 * @apiBody {Int} level drug level.
 * @apiBody {String} description drug level.
 * @apiBody {Boolean} [isActive=false]
 *
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
 *   isActive: true,
 *  }
 *
 *  @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugLevels/doliprane/edit
 *
 * @apiVersion 0.1.0
 */
router.put('/:id/edit', updateById);


/**
 * @apiGroup Drug_Level
 * @api {DELETE} /api/drugs/:id/delete Delete drugLevel
 * @apiName DeleteDrugLevel
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugLevels/1/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id/delete', deleteById);


module.exports = router;