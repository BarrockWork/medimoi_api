const express = require('express');
const router = express.Router();

// import route functions from controller
const {
 createTreatmentDrug,
 createMany,
 getTreatmentDrugById,
 findAll,
 updateTreatmentDrug,
 deleteTreatmentDrug,
 findMany
} = require('../controllers/TreatmentDrugController');

/** DEFINES ------------------------------------------------- */

/**
 * Define a global TreatmentDrug not found
 * @apiDefine TreatmentDrugNotFoundError
 * @apiError TreatmentDrugNotFound TreatmentDrug was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TreatmentDrugNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine TreatmentDrugPOSTParam
 * @apiBody {Number} treatment_id  Treatment id.
 * @apiBody {Number} drug_id  Drug id.
 * @apiBody {String[0..5000]} [comments=null] Treatment drug comments.
 * @apiBody {Boolean} [isActive=true] Treatmemt drug state.
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Create single TreatmentDrug
 * @api {POST} /api/treatment_drugs/new Create single TreatmentDrug.
 * @apiName CreateSingleTreatmentDrug
 * @apiGroup TreatmentDrug
 * @apiParam {Number} treatment_id Required: Id Treatment
 * @apiParam {Number} drug_id Required: Id Drug
 * @apiParam {String[0..191]} [comments] Comments
 * @apiUse TreatmentDrugPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "treatment_id": 1,
 *     "drug_id":      1,
 *     "comments": "Bla bla bla"
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/new
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentDrug);

/**
 * @apiDescription Create many TreatmentDrugs
 * @api {POST} /api/treatment_drugs/news Create many TreatmentDrugs.
 * @apiName CreateManyTreatmentDrug
 * @apiGroup TreatmentDrug
 *
 * @apiParam {Number} treatment_id Required: Id Treatment
 * @apiParam {Number} drug_id Required: Id Drug
 * @apiParam {String[0..191]} [comments] Comments
 *
 * @apiUse TreatmentDrugPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 * {
 *      "entries":[
 *           {
 *               "treatment_id": 1,
 *               "drug_id":      1,
 *               "comments": "Bla bla bla"
 *           },
 *           {
 *               "treatment_id": 2,
 *               "drug_id":      2,
 *               "comments": "Bla bla bla"
 *           }
 *      ]
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/news
 * @apiVersion 0.1.0
 */
router.post("/news", createMany);

/**
 * @apiDescription Get TreatmentDrug filtered by ressources Ids
 * @api {GET} /api/treatment_drugs/many?filterMany={"id":[1]} Get TreatmentDrug filtered by ressources Ids
 * @apiName GetManyTreatmentDrug
 * @apiGroup TreatmentDrug
 *
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentDrugNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/many?filterMany={"id":[1]}
 * @apiVersion 0.1.0
 */
router.get("/many", findMany);

/**
 * @apiDescription Get a list of TreatmentDrug
 * @api {GET} /api/treatment_drugs/all?filter={}&range=[0,10]&sort=["id","ASC"] Get a list of TreatmentDrug
 * @apiName GetListTreatmentDrug
 * @apiGroup TreatmentDrug
 *
 * @apiParam {Object} [filter] Filter on a criteria
 * @apiParam {Object} [range] To retrieve only some entries
 * @apiParam {Object} [sort] To sort the entries
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentDrugNotFoundError
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/all?filter={}&range=[0,10]&sort=["id","ASC"]
 * @apiVersion 0.1.0
 */
router.get("/all", findAll);

/**
 * @apiDescription Get TreatmentDrug by id
 * @api {GET} /api/treatment_drugs/:id Get TreatmentDrug by id
 * @apiName GetByIdTreatmentDrugById
 * @apiGroup TreatmentDrug
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentDrugNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentDrugById);

/**
 * @apiDescription Update a TreatmentDrug by id
 * @api {PUT} /api/treatment_drugs/:id Update a TreatmentDrug by id
 * @apiName UpdateByIdTreatmentDrug
 * @apiGroup TreatmentDrug

 * @apiBody {String} [comments=last]  TreatmentDrug comments.
 * @apiBody {Boolean} [isActive=last] TreatmentDrug state.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "comments":         "Some comment",
 *     "isActive":         false
 *  }
 * @apiUse TreatmentDrugNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/:id
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentDrug);


/**
 * @apiDescription Delete TreatmentDrug by id
 * @api {DELETE} /api/treatment_drugs/:id Delete TreatmentDrug by id
 * @apiName DeleteByIdTreatmentDrug
 * @apiGroup TreatmentDrug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentDrugNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/:id
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentDrug);

module.exports = router;