var express = require('express');
var router = express.Router();
const {
    createDrug,
    createManyDrug,
    findAll,
    findMany,
    findBySlug,
    updateBySlug,
    deleteBySlug,
    findById,
    deleteById,
    updateById
} = require('../controllers/DrugController');


/**
 * Define a global Drug not found
 * @apiDefine DrugNotFoundError
 * @apiError DrugNotFoundError Drug was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DrugNotFoundError"
 *     }
 */


/**
 * Define parameters for the request
 *
 * @apiDefine DrugParams
 * @apiBody {String[2..50]} name Drug name.
 * @apiBody {String[2..50]} description Drug description.
 * @apiBody {Boolean} [isPrescription=false] Optional prescription drug.
 * @apiBody {Number} drug_level_id  Drug level  id
 * @apiBody {Number} drug_type_id  Drug type  id
 * @apiBody {Number} medical_administration_id  Medical administration  id
 */

/**
 * @apiGroup Drug
 * @api {POST} /api/drugs/new Create new Drug
 * @apiName CreateDrug
 *
 * @apiUse DrugParams
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
 * @apiDescription Insert many drugs
 * @api {POST} /api/drugs/news Create many Drugs
 * @apiName CreateManyDrugs
 * @apiGroup Drug
 *
 *
 * @apiUse DrugParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *            name: "lisopaine",
 *            description: "gellulle gout menthe",
 *            isPrescription: true,
 *            drug_level_id: 1,
 *            drug_type_id: 1,
 *            medical_administration_id: 1
 *          },
 *          {
 *            name: "voltarene",
 *            description: "pommade ",
 *            isPrescription: true,
 *            drug_level_id: 1,
 *            drug_type_id: 1,
 *            medical_administration_id: 1
 *          },
 *          {
 *            name: "toplexis",
 *            description: "sirop pour la toux",
 *            isPrescription: true,
 *            drug_level_id: 1,
 *            drug_type_id: 1,
 *            medical_administration_id: 1
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/drugs/news
 * @apiVersion 0.1.0
 */
router.post('/news', createManyDrug)

/**
 * @apiGroup Drug
 * @api {GET} /api/drugs/many Get Many Drug
 * @apiName GetManyDrug
 *
 * @apiUse DrugNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/many
 *
 * @apiVersion 0.1.0
 */
 router.get('/many', findMany);

/**
 * @apiGroup Drug
 * @api {GET} /api/drugs/all Get all Drug
 * @apiName GetAllDrug
 *
 * @apiUse DrugNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/all
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);

/**
 * @apiGroup Drug
 * @api {GET} /api/drugs/:nameSlug Get drug by slug
 * @apiName GetDrugBySlug
 *
 * @apiUse DrugNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/test
 *
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findBySlug);


/**
 * @apiGroup Drug
 * @api {GET} /api/drugs/:id Get drug by id
 * @apiName GetDrugById
 *
 * @apiUse DrugNotFoundError
 * @apiParam {Number} id Drug id
 *
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/drugs/1
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', findById);


/**
 * @apiGroup Drug
 * @api {PUT} /api/drugs/:nameSlug/edit Update drug
 * @apiName UpdatedrugBySlug
 *
 * @apiBody {String[2..50]} [name] drug name.
 * @apiBody {String[2..50]} [description] drug.
 * @apiBody {Boolean} [isPrescription=false] Optional prescription.
 * @apiBody {Boolean} [isActive=true] Optional active.
 * @apiBody {Number} [drug_level_id]  Drug level  id
 * @apiBody {Number} [drug_type_id]  Drug type  id
 * @apiBody {Number} [medical_administration_id]  Medical administration  id
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
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
 *    isActive: true,
 *    drug_level_id: 1,
 *    drug_type_id: 1,
 *    medical_administration_id: 1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateBySlug);


/**
 * @apiGroup Drug
 * @api {PUT} /api/drugs/:id Update drug
 * @apiName UpdateDrugById
 *
 * @apiBody {String[2..50]} [name] drug name.
 * @apiBody {String[2..50]} [description] drug.
 * @apiBody {Boolean} [isPrescription=false] Optional prescription.
 * @apiBody {Boolean} [isActive=true] Optional active.
 * @apiBody {Number} [drug_level_id]  Drug level  id
 * @apiBody {Number} [drug_type_id]  Drug type  id
 * @apiBody {Number} [medical_administration_id]  Medical administration  id
 *
 * @apiParam {Number} id Drug id
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *   'Content-Type': 'application/json'
 *  }
 *
 * @apiParamExample {json} Request-Example
 * {
 *   name: "lisopaine",
 *   description: "gellulle gout menthe",
 *   isPrescription: true,
 *   isActive: true,
 *   drug_level_id: 1,
 *   drug_type_id: 1,
 *   medical_administration_id: 1
 * }
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateById);

/**
 * @apiGroup Drug
 * @api {DELETE} /api/drugs/:nameSlug/delete Delete drug
 * @apiName DeleteDrugById
 *
 * @apiUse DrugNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/drugs/doliprane/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteBySlug);


/**
 * @apiGroup Drug
 * @api {DELETE} /api/drugs/:id/ Delete drug by id
 * @apiName DeleteDrug
 *
 * @apiUse DrugNotFoundError
 * @apiParam {Number} id Drug id
 *
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/drugs/1
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteById);

module.exports = router;