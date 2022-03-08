var express = require('express');
var router = express.Router();
const {createDrugType, createManyDrugType, deleteBySlug, getAllDrugType, findBySlug, updateBySlug} = require('../controllers/DrugTypeController');

/**
 * @apiGroup Drug_Type
 * @api {POST} /api/drugTypes/new Create new Drug type
 * @apiName CreateDrug_Type
 *
 * @apiBody {Int} type drug type.
 * @apiBody {String} description drug type.
 *
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
 * @api {POST} /api/drugs/news Create many DrugsLevel
 * @apiName CreateManyDrugsLevel
 * @apiGroup Drug_Type
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
 * @apiSampleRequest http://localhost:4000/api/drugTypes/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDrugType);

/**
 * @apiGroup drugTypes
 * @api {GET} /api/drugTypes Get all Drug Type
 * @apiName GetAllDrug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAllDrugType);


/**
 * @apiGroup drugTypes
 * @api {GET} /api/drugTypes/:nameSlug Get drug by slug
 * @apiName GetDrugBySlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes/test
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findBySlug);

/**
 * @apiGroup drugTypes
 * @api {PUT} /api/drugTypes/:nameSlug/edit Update drug
 * @apiName UpdatedrugBySlug
 *
 * @apiBody {String} name drug name.
 * @apiBody {String} description drug.
 * @apiBody {Boolean} [isPrescription=false] Optional drug slug.
 * @apiBody {Number} drug_level_id  Drug level  id
 * @apiBody {Number} drug_type_id  Drug type  id
 * @apiBody {Number} medical_administration_id  Medical administration  id
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
 * @apiGroup drugTypes
 * @api {DELETE} /api/drugTypes/:nameSlug/delete Delete drug
 * @apiName DeleteDrug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugTypes/comprime/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteBySlug);


module.exports = router;