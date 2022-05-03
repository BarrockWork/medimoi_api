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
 * @apiDescription Create single treatment drug
 * @api {POST} /api/treatment_drugs/new Create new treatment drug.
 * @apiName CreateTreatmentDrug
 * @apiGroup TreatmentDrug
 * 
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
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/new
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentDrug);

/**
 * @apiDescription Create Many treatment drugs
 * @api {POST} /api/treatment_drugs/news Create many treatment drugs.
 * @apiName CreateManyTreatmentDrug
 * @apiGroup TreatmentDrug
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
 *           },
 *           {
 *               "treatment_id": 2,
 *               "drug_id":      2,
 *           }
 *      ]
 * }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/news
 * @apiVersion 0.1.0
 */
 router.post("/news", createMany);

/**
 * @apiDescription Get many TreatmentDrug
 * @api {GET} /api/treatment_drugs/many Get many TreatmentDrug
 * @apiName GetManyTreatmentDrug
 * @apiGroup TreatmentDrug
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentDrugNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/many
 * @apiVersion 0.1.0
 */
router.get("/many", findMany);

 /**
 * @apiDescription Get All treatment drugs
 * @apiGroup TreatmentDrug
 * @api {GET} /api/treatment_drugs/all Get all treatment drug
 * @apiName GetAllTreatmentDrug
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_drugs/all
 * @apiVersion 0.1.0
  */
 router.get("/all", findAll);

/**
 * @apiDescription Get single treatment drug
 * @api {GET} /api/treatment_drugs/:id Get treatment drug by Id
 * @apiName GetTreatmentDrugById
 * @apiGroup TreatmentDrug
 *
 *
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentDrugById);
 
 /**
  * @apiGroup TreatmentDrug
  * @api {PUT} /api/treatment_drugs/:id Update treatment drug
  * @apiName UpdateTreatmentDrug
  * 
  * @apiBody {String} [comments=last]  Treatment drug comments.
  * @apiBody {Boolean} [isActive=last] Treatmemt drug state.
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
  *
  * @apiSampleRequest http://localhost:4000/api/treatment_drugs/:id
  * @apiVersion 0.1.0
  */
 router.put("/:id", updateTreatmentDrug);
 
 
 /**
  * @apiDescription Delete treatment drug
  * @apiGroup TreatmentDrug
  * @api {DELETE} /api/treatment_drugs/:id Delete treatment drug
  * @apiName DeleteTreatmentDrug
  * 
  * @apiSampleRequest http://localhost:4000/api/treatment_drugs/:id
  * 
 * @apiVersion 0.1.0
  */
 router.delete("/:id", deleteTreatmentDrug);

 module.exports = router;