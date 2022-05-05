var express = require('express');
var router = express.Router();

// import route functions from controller
const { 
    createOne,
    createMany,
    updateOneByNameSlug,
    updateOneById,
    deleteOneByNameSlug,
    deleteOneById,
    findAll,
    findOne,
    findMany,
    findOneById
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
 * @api {POST} /api/medical_administrations/new Create single MedicalAdministration
 * @apiName CreateSingleMedicalAdministration
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
 * @api {POST} /api/medical_administrations/news Create many MedicalAdministrations
 * @apiName CreateManyMedicalAdministration
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
 * @api {POST} /api/medical_administrations/slug/:nameSlug Get MedicalAdministration by nameSlug
 * @apiName GetByNameSlugMedicalAdministration
 * @apiGroup MedicalAdministration
 * 
 * @apiParam {String[2..50]} nameSlug Required: Name slug
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
 * @apiDescription Get MedicalAdministration filtered by ressources Ids
 * @api {GET} /api/medical_administrations/many?filterMany={"id":[1]} Get MedicalAdministration filtered by ressources Ids
 * @apiName GetManyMedicalAdministration
 * @apiGroup MedicalAdministration
 *
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/many?filterMany={"id":[1]}
 * @apiVersion 0.1.0
 */
router.get("/many", findMany);

/**
 * @apiDescription Get a list of MedicalAdministration
 * @api {GET} /api/medical_administrations/all?filter={}&range=[0,10]&sort=["id","ASC"] Get a list of MedicalAdministration
 * @apiName GetListMedicalAdministration
 * @apiGroup MedicalAdministration
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
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/all?filter={}&range=[0,10]&sort=["id","ASC"]
 * @apiVersion 0.1.0
 */
router.get("/all", findAll);

/**
 * @apiDescription Get a MedicalAdministration by id
 * @api {GET} /api/medical_administrations/:id Get MedicalAdministration by id
 * @apiName GetByIdMedicalAdministration
 * @apiGroup MedicalAdministration
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', findOneById);

/**
 * @apiDescription Update a MedicalAdministration by nameSlug
 * @api {PUT} /api/medical_administrations/slug/:nameSLug Update a MedicalAdministration by nameSlug
 * @apiName UpdateByNameSlugMedicalAdministration
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
router.put("/slug/:nameSlug", updateOneByNameSlug);

/**
 * @apiDescription Update a MedicalAdministration by id
 * @api {PUT} /api/medical_administrations/:id Update a MedicalAdministration by id
 * @apiName UpdateByIdMedicalAdministration
 * @apiGroup MedicalAdministration
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
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/:id
 * @apiVersion 0.1.0
 */
router.put("/:id", updateOneById);

/**
 * @apiDescription Delete a MedicalAdministrations by NameSlug
 * @api {DELETE} /api/medical_administrations/slug/:nameSLug Delete a medicalAdministration by NameSlug
 * @apiName DeleteByNameSlugMedicalAdministrations
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
 router.delete("/slug/:nameSlug", deleteOneByNameSlug);

/**
 * @apiDescription Delete a MedicalAdministration by id
 * @api {DELETE} /api/medical_administrations/:id Delete a MedicalAdministration by id
 * @apiName DeleteByIdMedicalAdministration
 * @apiGroup MedicalAdministration
 * @apiParam {Number} id Id
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse MedicalAdministrationNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/medical_administrations/:id
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteOneById);

module.exports = router;