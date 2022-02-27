const express = require('express');
const router = express.Router();

// import route functions from controller
const {
    createTreatment, getTreatmentById, getAllTreatments, getTreatmentByStatus, updateTreatment, deleteTreatment
} = require('../controllers/TeatmentController');


/**
 * @apiGroup Treatment
 * @api {POST} /api/treatments/new Create new treatment
 * @apiName CreateTreatment
 * 
 * @apiBody {String} name Treatment name.
 * @apiBody {Number} user_id The user id.
 * @apiBody {Number} treatment_periodicity_id  Treatment periodicity id.
 * @apiBody {Boolean} [isActive=true] Optional The treatmemt state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                        "Treatment exemple",
 *     user_id:                      99
 *     treatment_periodicity_id:     99
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatment);

/**
 * @apiGroup Treatment
 * @api {GET} /api/treatments/status get treatment by status
 * @apiName GetTreatmentBySatus
 * 
 * @apiBody {Boolean} isActive The treatmemt status.
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
router.get("/status", getTreatmentByStatus);

/**
 * @apiGroup Treatment
 * @api {GET} /api/treatments/:id Get treatment by Id
 * @apiName GetTreatmentById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/treatments/4711
 * 
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentById);



// /**
//  * @apiGroup Treatment
//  * @api {GET} /api/treatments/status/:slug Get treatment by Slug
//  * @apiName GetTreatmentBySlug
//  * 
//  * @apiExample {curl} Example usage:
//  *     curl -i http://localhost:4000/api/treatments/slug/monthly
//  * 
//  * @apiVersion 0.1.0
//  */



/**
 * @apiGroup Treatment
 * @api {GET} /api/treatments Get all treatment
 * @apiName GetAllTreatment
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatments
 * 
 * @apiVersion 0.1.0
 */
router.get("/", getAllTreatments);


/**
 * @apiGroup Treatment
 * @api {PUT} /api/treatments/:id Update treatment
 * @apiName UpdateTreatmentById
 * 
 * @apiBody {String} [name=last] Treatment name.
 * @apiBody {Number} [user_id=last] The user id.
 * @apiBody {Number} [treatment_periodicity_id=last] Treatment periodicity id.
 * @apiBody {Boolean} [isActive=true] The treatmemt state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                        "Treatment exemple",
 *     user_id:                      9,
 *     treatment_periodicity_id:     9,
 *     isActive:                     true
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatment);


/**
 * @apiGroup Treatment
 * @api {DELETE} /api/treatments/:id Delete treatment
 * @apiName DeleteTreatment
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatments/4711
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatment);

module.exports = router;