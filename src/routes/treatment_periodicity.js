const express = require('express');
const router = express.Router();

// import route functions from controller
const { createTreatmentPeriodicity, getTreatmentPeriodicityById, updateTreatmentPeriodicity, deleteTreatmentPeriodicityBySlug, createMany, getTreatmentPeriodicityBySlug, findAll } = require('../controllers/TreatmentPeriodicityController');
const {findOneById} = require("./../controllers/ContactController");

/** DEFINES ------------------------------------------------- */

/**
 * Define a global TreatmentPeriodicity not found
 * @apiDefine TreatmentPeriodicityNotFoundError
 * @apiError TreatmentPeriodicityNotFound TreatmentPeriodicity was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TreatmentPeriodicityNotFound"
 *     }
*/

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine TreatmentPeriodicityPOSTParam
 * @apiBody {String[2..50]} name Name.
*/

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single TreatmentPeriodicity
 * @api {POST} /api/treatment_periodicities/new Create new Treatment periodicity
 * @apiName CreateTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 * 
 * @apiUse TreatmentPeriodicityPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":  "daily"
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/new
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentPeriodicity);

/**
 * @apiDescription Insert multiple TreatmentPeriodicity
 * @api {POST} /api/treatment_periodicities/news Create news treatment periodicity
 * @apiName CreateMenyTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 * 
 * @apiUse TreatmentPeriodicityPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     "entries": [
 *          {
 *              "name":  "daily"
 *          },
 *          {
 *              "name":  "weekly"
 *          },
 *          {
 *              "name":  "monthly"
 *          }
 *      ]
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/news
 * @apiVersion 0.1.0
 */
router.post("/news", createMany);

/**
 * @apiDescription Get TreatmentPeriodicity by nameSlug
 * @api {POST} /api/treatment_periodicities/slug/:nameSlug Get treatment periodicity by nameSlug
 * @apiName GetByNameSlugTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 * 
 * @apiParam {String[2..50]} nameSlug Name slug
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiUse TreatmentPeriodicityNotFoundError
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/slug/:nameSlug
 * @apiVersion 0.1.0
*/
router.get("/slug/:nameSlug", getTreatmentPeriodicityBySlug);

/**
 * @apiDescription Get all TreatmentPeriodicity
 * @api {GET} /api/treatment_periodicities/all/:isActive? Get all TreatmentPeriodicity
 * @apiName GetAllTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/all/:isActive?
 * @apiVersion 0.1.0
 */
 router.get("/all/:isActive?", findAll);

/**
 * @apiDescription Get a TreatmentPeriodicity by id
 * @api {GET} /api/treatment_periodicities/:id Get Contact by id
 * @apiName GetByIdTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', getTreatmentPeriodicityById);


/**
 * @apiDescription Update a single TreatmentPeriodicity
 * @api {PUT} /api/treatment_periodicities/slug/:nameSLug Update single TreatmentPeriodicity
 * @apiName UpdateSingleTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [name="New name"] Name (50).
 * @apiBody {Boolean} [isActive=true] Is active.
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":       "New Name",
 *     "isActive":   false
 *  }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/slug/:nameSlug
 * @apiVersion 0.1.0
 */
 router.put("/slug/:nameSlug", updateTreatmentPeriodicity);


/**
 * @apiDescription Delete a single TreatmentPeriodicity
 * @api {DELETE} /api/treatment_periodicities/slug/:nameSLug Delete single TreatmentPeriodicity
 * @apiName DeleteSingleTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/slug/:nameSlug
 * @apiVersion 0.1.0
 */
 router.delete("/slug/:nameSlug", deleteTreatmentPeriodicityBySlug);

module.exports = router;