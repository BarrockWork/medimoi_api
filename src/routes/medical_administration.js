var express = require('express');
var router = express.Router();

// en attendant le controller
const { createMedicalAdministration, getMedicalAdministrationById, getMedicalAdministrationBySlug, getAllMedicalAdministrations, updateMedicalAdministration, deleteMedicalAdministration, getMedicalAdministrationByStatus } = require("../controllers/MedicalAdministrationController");
const action = ()=>{}

/**
 * @apiGroup MedicalAdministration
 * @api {POST} /api/medicalAdministrations/new Create new medical administration
 * @apiName CreateMedicalAdministration
 * 
 * @apiBody {String} name Medical administration name.
 * @apiBody {String} nameSlug Medical administration slug.
 * @apiBody {Boolean} [isActive=true] Optional Medical administration state.
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
 * @apiBody {String}  Optional name Medical administration name.
 * @apiBody {String}  Optional nameSlug Medical administration slug.
 * @apiBody {Boolean} Optional Medical administration state.
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

module.exports = router;