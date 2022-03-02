var express = require('express');
var router = express.Router();

// en attendant le controller
const { 
    createMedicalAdministration, 
    getMedicalAdministrationById, 
    getMedicalAdministrationBySlug, 
    getAllMedicalAdministrations, 
    updateMedicalAdministration, 
    deleteMedicalAdministration, 
    getMedicalAdministrationByStatus, 
    deleteMedicalAdministrationBySlug, 
    createMedicalAdministrations
} = require("../controllers/MedicalAdministrationController");

/** DEFINES ------------------------------------------------- */

/**
 * Define a global MedicalAdministration not found
 * @apiDefine MedicalAdministrationNotFoundError
 * @apiError MedicalAdministrationNotFound MedicalAdministration was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MedicalAdministrationNotFound"
 *     }
*/

/**
 * @apiGroup MedicalAdministration
 * @api {POST} /api/medicalAdministrations/new Create new medical administration
 * @apiName CreateMedicalAdministration
 * 
 * @apiBody {String} name Medical administration name.
 * @apiBody {String} [nameSlug=auto] Medical administration slug.
 * @apiBody {Boolean} [isActive=true] Medical administration state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "Medical administration name exemple",
 *     nameSlug:   "Medical administration slug"
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", createMedicalAdministration);

/**
 * @apiGroup MedicalAdministration
 * @api {POST} /api/medicalAdministrations/new Create new medical administration
 * @apiName CreateMedicalAdministration
 * 
 * @apiBody {String} name Medical administration name.
 * @apiBody {String} [nameSlug=auto] Medical administration slug.
 * @apiBody {Boolean} [isActive=true] Medical administration state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 * [
 *   {
 *     name:       "Medical administration name exemple 1",
 *     nameSlug:   "Medical administration slug 1"
 *   },
 *   {
 *     name:       "Medical administration name exemple 2",
 *     nameSlug:   "Medical administration slug 2"
 *   }
 * ]
 * 
 * @apiVersion 0.1.0
 */
router.post("/news", createMedicalAdministrations);

/**
 * @apiGroup MedicalAdministration
 * @api {GET} /api/MedicalAdministrations/status get medial administration by status
 * @apiName GetMedicalAdministrationByStatus
 * 
 * @apiBody {Boolean} isActive The medical administration status.
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
 router.get("/status", getMedicalAdministrationByStatus);

/**
 * @apiGroup MedicalAdministration
 * @api {GET} /api/medicalAdministrations/:id Get medical administration by Id
 * @apiName GetMedicalAdministrationById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/medicalAdministrations/4711
 * 
 * @apiSampleRequest http://localhost:4000/api/medicalAdministrations/1
 * @apiVersion 0.1.0
 */
router.get("/:id", getMedicalAdministrationById);



/**
 * @apiGroup MedicalAdministration
 * @api {GET} /api/medicalAdministrations/slug/:slug Get medical administration by slug
 * @apiName GetMedicalAdministrationBySlug
 * 
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/medicalAdministrations/slug/mouth
 * 
 * @apiVersion 0.1.0
 */
router.get("/slug/:slug", getMedicalAdministrationBySlug);


/**
 * @apiGroup MedicalAdministration
 * @api {GET} /api/medicalAdministrations Get all medical administration
 * @apiName GetAllMedicalAdministrations
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/medicalAdministrations
 * 
 * @apiVersion 0.1.0
 */
router.get("/", getAllMedicalAdministrations);


/**
 * @apiGroup MedicalAdministration
 * @api {PUT} /api/medicalAdministrations/:id Update medical administration
 * @apiName UpdateMedicalAdministrationById
 * 
 * @apiBody {String}  [name=last] name Medical administration name.
 * @apiBody {String}  [nameSlug=last] nameSlug Medical administration slug.
 * @apiBody {Boolean} [isActive=last] Medical administration state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "new name",
 *     nameSlug:   "new slug",
 *     isActive:   false
 *  }
 * 
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", updateMedicalAdministration);


/**
 * @apiGroup MedicalAdministration
 * @api {DELETE} /api/medicalAdministrations/:id Delete medical administration
 * @apiName DeleteMedicalAdministration
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/medicalAdministrations/4711
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteMedicalAdministration);

/**
 * @apiGroup MedicalAdministration
 * @api {DELETE} /api/medicalAdministrations/slug/:slug Delete medical administration
 * @apiName DeleteMedicalAdministration
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/medicalAdministrations/4711
 * 
 * @apiVersion 0.1.0
 */
 router.delete("/slug/:slug", deleteMedicalAdministrationBySlug);

module.exports = router;