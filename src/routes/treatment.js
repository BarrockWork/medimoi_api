const express = require('express');
const router = express.Router();
const Uploader = require('./../../config/uploader');

// import route functions from controller
const {
    createOne,
    createMany,
    getTreatmentById,
    getAllTreatments,
    updateTreatment,
    deleteTreatment,
    findMany
} = require('../controllers/TeatmentController');

/** DEFINES ------------------------------------------------- */

/**
 * Define a global Treatment not found
 * @apiDefine TreatmentNotFoundError
 * @apiError TreatmentNotFound Treatment was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TreatmentNotFound"
 *     }
*/

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine TreatmentPOSTParam
 * @apiBody {String[2..50]} name Name.
 * @apiBody {Number} user_id The user id.
 * @apiBody {Number} treatment_periodicity_id  Treatment periodicity id.
 * @apiBody {String[24..25]} startedAt  Treatment start date example: 2022-03-02 07:51:42.871.
*/

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single Treatment
 * @api {POST} /api/treatments/new Create new treatment
 * @apiName CreateTreatment
 * @apiGroup Treatment
 * 
 * @apiUse TreatmentPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":                        "Treatment exemple",
 *     "user_id":                      1,
 *     "treatment_periodicity_id":     1,
 *     "startedAt":                     "2022-03-02 07:51:42.871"
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatments/new
 * @apiVersion 0.1.0
 */
router.post("/new", Uploader.array('files'), createOne);

/**
 * @apiDescription Insert Many Treatments
 * @api {POST} /api/treatments/news Create many treatment
 * @apiName CreateManyTreatment
 * @apiGroup Treatment
 * 
 * @apiUse TreatmentPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *           {
 *               "name":                        "Treatment exemple 1",
 *               "user_id":                      1,
 *               "treatment_periodicity_id":     1,
 *               "startedAt":                     "2022-03-02 07:51:42.871"
 *           },
 *           {
 *               "name":                        "Treatment exemple 2",
 *               "user_id":                      1,
 *               "treatment_periodicity_id":     1,
 *               "startedAt":                     "2022-03-02 07:51:42.871"
 *           }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/treatments/news
 * @apiVersion 0.1.0
 */
router.post("/news", createMany);

/**
 * @apiDescription Get many Treatment
 * @api {GET} /api/treatments/many Get many Treatment
 * @apiName GetManyTreatment
 * @apiGroup Treatment
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatments/many
 * @apiVersion 0.1.0
 */
router.get("/many", findMany);

/**
 * @apiDescription Get all Treatments
 * @api {POST} /api/treatments/all Get All treatments
 * @apiName GetAllTreatment
 * @apiGroup Treatment
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * 
 * @apiSampleRequest http://localhost:4000/api/treatments/all
 * @apiVersion 0.1.0
 */
router.get("/all", getAllTreatments);

/**
 * @apiDescription Get single Treatment
 * @api {POST} /api/treatments/:id Get treatment by id
 * @apiName GetTreatment
 * @apiGroup Treatment
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * 
 * @apiSampleRequest http://localhost:4000/api/treatments/:id
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentById);


/**
 * @apiDescription Update treatment
 * @api {PUT} /api/treatments/:id Update treatment
 * @apiName UpdateTreatment
 * @apiGroup Treatment
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:     "new treatment name",
 *     isActive:  false
 *  }
 * 
 * @apiUse TreatmentNotFoundError
 * 
 * @apiSampleRequest http://localhost:4000/api/treatments/:id
 * @apiVersion 0.1.0
 */
router.put("/:id",  Uploader.array('files'), updateTreatment);


/**
 * @apiDescription Delete a single Treatment
 * @api {DELETE} /api/treatments/:id Delete single treatment
 * @apiName DeleteSingleTreatment
 * @apiGroup Treatment
 * @apiParam {Numeric} Treatment id
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatments/:id
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatment);

module.exports = router;