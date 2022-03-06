var express = require('express');
var router = express.Router();
const {
    createDrug,
    getAllDrug,
    findBySlug,
    updateBySlug,
    deleteBySlug,
} = require('../controllers/drugController');


/**
 * @apiGroup Drug
 * @api {POST} /api/drugs/new Create new Drug
 * @apiName CreateDrug
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
 *    isPrescription: true,
 *    drug_level_id: 1,
 *    drug_type_id: 1,
 *    medical_administration_id: 1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDrug);

/**
 * @apiGroup Drug
 * @api {GET} /api/drugs Get all Drug
 * @apiName GetAllDrug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAllDrug);

/**
 * @apiGroup Drug
 * @api {GET} /api/drugs/:nameSlug Get drug by slug
 * @apiName GetDrugBySlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/test
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findBySlug);


/**
 * @apiGroup Drug
 * @api {PUT} /api/drugs/:nameSlug/edit Update drug
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
 *    isPrescription: true,
 *    drug_level_id: 1,
 *    drug_type_id: 1,
 *    medical_administration_id: 1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug/edit', updateBySlug);

/**
 * @apiGroup Drug
 * @api {DELETE} /api/drugs/:nameSlug/delete Delete drug
 * @apiName DeleteDrug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/doliprane/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteBySlug);


module.exports = router;