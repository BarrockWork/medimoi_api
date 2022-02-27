const express = require('express');
const router = express.Router();

// import route functions from controller
const { createTreatmentPeriodicity, getTreatmentPeriodicityByStatus, getTreatmentPeriodicityById, getAllTreatmentPeriodicities, updateTreatmentPeriodicity, deleteTreatmentPeriodicity } = require('../controllers/TreatmentPeriodicityController');
const action = () => {
}

/**
 * @apiGroup TreatmentPeriodicity
 * @api {POST} /api/treatmentPeriodicities/new Create new treatment periodicity.
 * @apiName CreateTreatmentPeriodicity
 * 
 * @apiBody {String} name Treatment periodicity name.
 * @apiBody {String} nameSlug Treatment periodicity name slug.
 * @apiBody {Boolean} [isActive=true] treatment periodicity state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                        "some periodicity name",
 *     nameSlug:                    "some nameSlug"
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentPeriodicity);

/**
 * @apiGroup TreatmentPeriodicity
 * @api {GET} /api/treatmentPeriodicities/status get treatment periodicity by status
 * @apiName GetTreatmentPeriodicityByStatus
 * 
 * @apiBody {Boolean} isActive The treatmemt periodicity status.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     isActive: true
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.get("/status", getTreatmentPeriodicityByStatus);

/**
 * @apiGroup TreatmentPeriodicity
 * @api {GET} /api/treatmentPeriodicities/:id Get treatment periodicity by Id
 * @apiName GetTreatmentPeriodicityById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/treatmentPeriodicities/4711
 * 
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentPeriodicityById);

/**
 * @apiGroup TreatmentPeriodicity
 * @api {GET} /api/treatmentPeriodicities Get all treatment periodicity
 * @apiName GetAllTreatmentPeriodicity
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentPeriodicities
 * 
 * @apiVersion 0.1.0
 */
router.get("/", getAllTreatmentPeriodicities);


/**
 * @apiGroup TreatmentPeriodicity
 * @api {PUT} /api/treatmentPeriodicities/:id Update treatment periodicity
 * @apiName UpdateTreatmentPeriodicity
 * 
 * @apiBody {String} [name=last] Treatment periodicity name.
 * @apiBody {String} [nameSlug=last] Treatment periodicity name slug.
 * @apiBody {Boolean} [isActive=last] treatment periodicity state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                       "new name",
 *     nameSlug:                   "new name slug",
 *     isActive:                    false
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentPeriodicity);


/**
 * @apiGroup TreatmentPeriodicity
 * @api {DELETE} /api/treatmentPeriodicities/:id Delete treatment periodicity
 * @apiName DeleteTreatmentPeriodicity
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentPeriodicities/4711
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentPeriodicity);

module.exports = router;