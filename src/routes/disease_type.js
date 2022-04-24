var express = require('express');
var router = express.Router();

const {
    createDiseaseType,
    createManyDiseaseType,
    getAllDiseaseType,
    findBySlug,
    updateBySlug,
    deleteBySlug
} = require('../controllers/DiseaseTypeController');


/**
 * Define a global DiseaseType not found
 * @apiDefine DiseaseTypeNotFoundError
 * @apiError DiseaseTypeNotFoundError Disease Type was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DiseaseTypeNotFoundError"
 *     }
 */



/**
 * Define parameters for the request
 *
 * @apiDefine DiseaseTypeParams
 * @apiBody {String[2..50]} name diseaseType name.
 * @apiBody {String[2..50]} description diseaseType description.
 */

/**
 * @apiGroup Disease_type
 * @api {POST} /api/disease_type/new Create single Disease_Type
 * @apiName CreateDiseaseType
 *
 * @apiUse DiseaseTypeParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "dermatologiques",
 *     description: "maladie de la peau",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDiseaseType);

/**
 * @apiGroup Disease_type
 * @api {POST} /api/disease_type/news Create many disease type
 * @apiName CreateManyDiseaseType
 *
 * @apiUse DiseaseTypeParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *            name: "diabète",
 *            description: "Cette maladie métabolique chronique est grave par ses complications au niveau des vaisseaux sanguins.",
 *          },
 *          {
 *            name: "maladies génétiques",
 *            description: "maladie héréditaire",
 *          },
 *          {
 *            name: "maladies respiratoires",
 *            description: "maladie des poumons",
 *          }
 *      ]
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDiseaseType);

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_type Get all DiseaseType
 * @apiName GetAllDiseaseType
 *
 * @apiUse DiseaseTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease_type
 *
 * @apiVersion 0.1.0
 */
router.get('/all', getAllDiseaseType);

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_type/slug/:nameSlug Get DiseaseType by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiUse DiseaseTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/disease_type/slug/dermatologie
 *
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findBySlug);

/**
 * @apiGroup Disease_type
 * @api {PUT} /api/disease_type/slug/:nameSlug Update Disease_Type
 * @apiName UpdateDiseaseType
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiBody {String[2..50]}  [name] Disease name.
 * @apiBody {String[2..50]} [description] disease.
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "cardiovasculaires",
 *     description: "maladie du coeur",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateBySlug);


/**
 * @apiGroup Disease_type
 * @api {DELETE} /api/disease_type/slug/:nameSlug Delete Disease_Type
 * @apiName DeleteDiseaseType
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 * @apiUse DiseaseTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease_type/slug/dermatologie
 *
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteBySlug);


module.exports = router;