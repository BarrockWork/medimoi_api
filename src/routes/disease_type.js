var express = require('express');
var router = express.Router();

const {
    createDiseaseType,
    createManyDiseaseType,
    findAll,
    findBySlug,
    updateBySlug,
    deleteBySlug,
    findById,
    updateById,
    deleteById,
    findMany
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
 * @api {POST} /api/disease_types/new Create single Disease_Type
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
 * @api {POST} /api/disease_types/news Create many disease type
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
 * @api {GET} /api/disease_types/all?filter={}&range=[0, 10]&sort=["id","ASC"] Get all DiseaseType filtered by ids
 * @apiName GetAllDiseaseType
 *
 * @apiParam {Object} [filter] Filter on a criteria
 * @apiParam {Object} [range] To retrieve only some entries
 * @apiParam {Object} [sort] To sort the entries
 *
 * @apiUse DiseaseTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease_types/all?filter={}&range=[0, 10]&sort=["id","ASC"]
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_types/many?filterMany={"id":[1]} Get all DiseaseType filtered by ressources Ids
 * @apiName GetManyDiseaseType
 * @apiDescription Get many disease type
 * @apiParam {Object} filterMany Required. Filter on a set of resources Ids.
 * 
 * @apiUse DiseaseTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/disease_types/many?filterMany={"id":[1]}
 * 
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_types/slug/:nameSlug/ Get DiseaseType by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiUse DiseaseTypeNotFoundError
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/disease_types/slug/dermatologie
 *
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findBySlug);


/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_types/:id Get DiseaseType by Id
 * @apiName GetDiseaseById
 * @apiDescription Get disease type by id
 * @apiParam {Number} id
 * @apiUse DiseaseTypeNotFoundError
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/disease_types/1
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', findById);


/**
 * @apiGroup Disease_type
 * @api {PUT} /api/disease_types/slug/:nameSlug Update Disease_Type
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
 * @api {PUT} /api/disease_types/:id Update Disease_Type
 * @apiName UpdateDiseaseType
 * @apiDescription Update disease type by id
 * @apiParam {Number} id
 * @apiUse DiseaseTypeNotFoundError
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/disease_types/1
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateById);


/**
 * @apiGroup Disease_type
 * @api {DELETE} /api/disease_types/slug/:nameSlug Delete Disease_Type
 * @apiName DeleteDiseaseType
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 * @apiUse DiseaseTypeNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease/slug/dermatologie
 *
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteBySlug);


/**
 * @apiGroup Disease_type
 * @api {DELETE} /api/disease_types/:id Delete Disease_Type
 * @apiName DeleteDiseaseType
 * @apiDescription Delete disease type by id
 * @apiParam {Number} id
 * @apiUse DiseaseTypeNotFoundError
 * @apiExample {curl} Example usage:
 *    curl -i http://localhost:4000/api/disease_types/1
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteById);


module.exports = router;