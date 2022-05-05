const express = require('express');
const router = express.Router();

// import route functions from controller
const {
 createTreatmentPeriodicity,
 getTreatmentPeriodicityById,
 updateTreatmentPeriodicityBySlug,
 deleteTreatmentPeriodicityBySlug,
 createMany,
 updateTreatmentPeriodicityById,
 getTreatmentPeriodicityBySlug,
 deleteTreatmentPeriodicityById,
 findAll,
 findMany
} = require('../controllers/TreatmentPeriodicityController');

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
 * @api {POST} /api/treatment_periodicities/new Create single TreatmentPeriodicity
 * @apiName CreateSingleTreatmentPeriodicity
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
 * @api {POST} /api/treatment_periodicities/news Create many TreatmentPeriodicities
 * @apiName CreateManyTreatmentPeriodicity
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
 * @api {POST} /api/treatment_periodicities/slug/:nameSlug Get TreatmentPeriodicity by nameSlug
 * @apiName GetByNameSlugTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiParam {String[2..50]} nameSlug Required: Name slug
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
 * @apiDescription Get TreatmentPeriodicity filtered by ressources Ids
 * @api {GET} /api/treatment_periodicities/many?filterMany={"id":[1]} Get TreatmentPeriodicity filtered by ressources Ids
 * @apiName GetManyTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/many?filterMany={"id":[1]}
 * @apiVersion 0.1.0
 */
router.get("/many", findMany);

/**
 * @apiDescription Get a list of TreatmentPeriodicity
 * @api {GET} /api/treatment_periodicities/all?filter={}&range=[0,10]&sort=["id","ASC"] Get a list of TreatmentPeriodicity
 * @apiName GetListTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
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
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/all?filter={}&range=[0,10]&sort=["id","ASC"]
 * @apiVersion 0.1.0
 */
router.get("/all", findAll);

/**
 * @apiDescription Get a TreatmentPeriodicity by id
 * @api {GET} /api/treatment_periodicities/:id Get TreatmentPeriodicity by id
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
 * @apiDescription Update TreatmentPeriodicity by nameSlug
 * @api {PUT} /api/treatment_periodicities/slug/:nameSLug Update a TreatmentPeriodicity by nameSlug
 * @apiName UpdateByNameSlugTreatmentPeriodicity
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
router.put("/slug/:nameSlug", updateTreatmentPeriodicityBySlug);

/**
 * @apiDescription Update TreatmentPeriodicity by id
 * @api {PUT} /api/treatment_periodicities/:id Update a TreatmentPeriodicity by id
 * @apiName UpdateByIdTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [name="New name"] Name (50).
 * @apiBody {Boolean} [isActive=true] Is active.
 * @apiParam {Number} id Id
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":       "New Name",
 *     "isActive":   false
 *  }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/:id
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentPeriodicityById);


/**
 * @apiDescription Delete a TreatmentPeriodicity by NameSlug
 * @api {DELETE} /api/treatment_periodicities/slug/:nameSLug Delete a TreatmentPeriodicity by NameSlug
 * @apiName DeleteByNameSlugTreatmentPeriodicity
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

/**
 * @apiDescription Delete a TreatmentPeriodicity by id
 * @api {DELETE} /api/treatment_periodicities/:id Delete a TreatmentPeriodicity by id
 * @apiName DeleteByIdTreatmentPeriodicity
 * @apiGroup TreatmentPeriodicity
 * @apiParam {Number} id Id
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse TreatmentPeriodicityNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/treatment_periodicities/:id
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentPeriodicityById);

module.exports = router;