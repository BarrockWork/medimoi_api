var express = require('express');
var router = express.Router();

// en attendant le controller
const { 
    createOne,
    createMany,
    updateOne,
    deleteOne,
    findAll,
    findOne
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
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine MedicalAdministrationPOSTParam
 * @apiBody {String[2..50]} name Name.
*/

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single MedicalAdministration
 * @api {POST} /api/medical_administrations/new Create new medical administration
 * @apiName CreateMedicalAdministration
 * @apiGroup MedicalAdministration
 * 
 * @apiUse MedicalAdministrationPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":  "mouth",
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/new
 * @apiVersion 0.1.0
 */
router.post("/new", createOne);

/**
 * @apiDescription Insert multiple MedicalAdministration
 * @api {POST} /api/medical_administrations/news Create new medical administration
 * @apiName CreateMenyMedicalAdministration
 * @apiGroup MedicalAdministration
 * 
 * @apiUse MedicalAdministrationPOSTParam
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
 *              "name":  "aass"
 *          },
 *          {
 *              "name":  "csd"
 *          },
 *          {
 *              "name":  "cbd"
 *          }
 *      ]
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/news
 * @apiVersion 0.1.0
 */
router.post("/news", createMany);

/**
 * @apiDescription Get MedicalAdministration by nameSlug
 * @api {POST} /api/medical_administrations/slug/:nameSlug Get medical administration by nameSlug
 * @apiName GetByNameSlugMedicalAdministration
 * @apiGroup MedicalAdministration
 * 
 * @apiParam {String[2..50]} nameSlug Name slug
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiUse MedicalAdministrationNotFoundError
 * 
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/slug/:nameSlug
 * @apiVersion 0.1.0
*/
router.get("/slug/:nameSlug", findOne);


/**
 * @apiDescription Get all MedicalAdministration
 * @api {GET} /api/medical_administrations/all/:isActive? Get all MedicalAdministration
 * @apiName GetAllMedicalAadministration
 * @apiGroup MedicalAdministration
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/all/:isActive?
 * @apiVersion 0.1.0
 */
router.get("/all/:isActive?", findAll);


/**
 * @apiDescription Update a single MedicalAdministration
 * @api {PUT} /api/medical_administrations/slug/:nameSLug Update single MedicalAdministration
 * @apiName UpdateSingleMedicalAdministration
 * @apiGroup MedicalAdministration
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
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.put("/slug/:nameSlug", updateOne);

/**
 * @apiDescription Delete a single MedicalAdministrations
 * @api {DELETE} /api/medical_administrations/slug/:nameSLug Delete single medicalAdministration
 * @apiName DeleteSingleMedicalAdministrations
 * @apiGroup MedicalAdministration
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/slug/:nameSlug
 * @apiVersion 0.1.0
 */
 router.delete("/slug/:nameSlug", deleteOne);

module.exports = router;