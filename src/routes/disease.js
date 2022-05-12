var express = require('express');
var router = express.Router();
const {
    createDisease,
    createManyDisease,
    findAll,
    findBySlug,
    updateBySlug,
    deleteBySlug,
    deleteById,
    updateById,
    findMany,
    findById,
} = require('../controllers/DiseaseController');

/**
 * Define a global Disease not found
 * @apiDefine DiseaseNotFoundError
 * @apiError DiseaseNotFoundError Disease was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "DiseaseNotFoundError"
 *     }
 */



/**
 * Define parameters for the request
 *
 * @apiDefine DiseaseParams
 * @apiBody {String[2..50]} name disease name.
 * @apiBody {String[2..50]} description disease description.
 * @apiBody {String[2..50]} incubationPeriod disease incubationPeriod.
 * @apiBody {String[2..50]} transmitting disease transmitting.
 * @apiBody {Number} disease_type_id  Disease type  id.
 */

/**
 * @apiDescription Insert one Disease
 * @apiGroup Disease
 * @api {POST} /api/diseases/new Create single disease
 * @apiName CreateDisease
 *
 * @apiUse DiseaseParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "Covid 19",
 *     description: "maladie inconnue"
 *     incubationPeriod: "15 jours",
 *     transmitting: "orale",
 *     disease_type_id:     1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDisease);

/**
 * @apiDescription Insert many Disease
 * @apiGroup Disease
 * @api {POST} /api/diseases/news Create many disease
 * @apiName CreateManyDisease
 *
 * @apiUse DiseaseParams
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
 *            name: "Asthme",
 *            description: "Les symptômes classiques de l’asthme sont une gêne respiratoire aiguë.",
 *            incubationPeriod: "15 jours",
 *            transmitting: "orale",
 *            disease_type_id: 1,
 *          },
 *          {
 *            name: "Convulsions",
 *            description: " Les convulsions sont des manifestations fréquentes et durent habituellement de 2 à 3 minutes ",
 *            incubationPeriod: "15 jours",
 *            transmitting: "on ne sait pas",
 *            disease_type_id: 1,
 *          },
 *          {
 *            name: "Brûlures",
 *            description: "Si la brûlure est phlycténulaire (présence de cloque) ou carbonisée (noire ou blanche et dure)",
 *            incubationPeriod: "3 mois",
 *            transmitting: "peau",
 *            disease_type_id: 1
 *          }
 *      ]
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/diseases/news
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDisease);

/**
 * @apiDescription Get all Disease
 * @apiGroup Disease
 * @api {GET} /api/diseases/all?filter={}&range=[0,10]&sort=["id","ASC"] Get a list of diseases
 * @apiName GetAllDisease
 * 
 * @apiParam {Object} [filter] Filter on a criteria
 * @apiParam {Object} [range] To retrieve only some entries
 * @apiParam {Object} [sort] To sort the entries
 *
 * @apiUse DiseaseNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases/all?filter={}&range=[0,10]&sort=["id","ASC"]
 *
 * @apiVersion 0.1.0
 */
router.get('/all', findAll);

/**
 * @apiDescription Get many Disease
 * @apiGroup Disease
 * @api {GET} /api/diseases/many?filterMany={"id":[1]} Get many Disease filtered by resource ids
 * @apiName GetManyDisease
 * 
 * @apiParam {Object} filterMany Required: Filter on a list of ids
 * 
 * @apiUse DiseaseNotFoundError
 * 
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/diseases/many?filterMany={"id":[1]}
 * 
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);


/**
 * @apiDescription Get one disease by nameSlug
 * @apiGroup Disease
 * @api {GET} /api/diseases/slug/:nameSlug Get Disease by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiUse DiseaseNotFoundError
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/diseases/slug/rhume
 *
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findBySlug);

/**
 * @apiDescription get one disease by id
 * @apiGroup Disease
 * @api {GET} /api/diseases/id/:id Get Disease by id
 * @apiName GetDiseaseById
 * 
 * @apiUse DiseaseNotFoundError
 * 
 * @apiParam {Number} id id
 * 
 * @apiExample {curl} Example usage:
 *    curl -i http://localhost:4000/api/diseases/id/1
 * 
 * @apiVersion 0.1.0
 */
router.get('/:id', findById);

/**
 * @apiDescription Update one Disease by nameSlug
 * @apiGroup Disease
 * @api {PUT} /api/diseases/slug/:nameSlug/ Update Disease
 * @apiName UpdateDiseaseBySlug
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiBody {String[2..50]}  [name] Disease name.
 * @apiBody {String[2..50]} [description] disease.
 * @apiBody {String[2..50]} [incubationPeriod] disease.
 * @apiBody {String[2..50]} [transmitting] disease.
 * @apiBody {Boolean} [isActive=false]
 * @apiBody {Number} [disease_type_id]  Disease type  id.
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "new name",
 *     nameSlug:  "new slug",
 *     description: "maladie inconnue",
 *     incubationPeriod: "15 jours",
 *     transmitting: "on ne sait pas",
 *     isActive: false
 *     disease_type_id: 1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateBySlug);

/**
 * @apiDescription Update one Disease by id
 * @apiGroup Disease
 * @api {PUT} /api/diseases/:id Update Disease
 * @apiName UpdateDiseaseById
 * @apiParam {Number} id Disease id
 * @apiBody {String[2..50]}  [name] Disease name.
 * @apiBody {String[2..50]} [description] disease.
 * @apiBody {String[2..50]} [incubationPeriod] disease.
 * @apiBody {String[2..50]} [transmitting] disease.
 * @apiBody {Boolean} [isActive=false]
 * @apiBody {Number} [disease_type_id]  Disease type  id.
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    'Content-Type': 'application/json'
 *  }
 * @apiParamExample {json} Request-Example
 * {
 *    name:       "new name",
 *    description: "maladie inconnue",
 *    incubationPeriod: "15 jours",
 *    transmitting: "on ne sait pas",
 *    isActive: false
 *    disease_type_id: 1
 * }
 * 
 * @apiVersion 0.1.0
 */
router.put('/:id', updateById);

/**
 * @apiDescription Delete one Disease by nameSlug
 * @apiGroup Disease
 * @api {DELETE} /api/diseases/slug/:nameSlug Delete Disease
 * @apiName DeleteDisease
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 * @apiUse DiseaseNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases/slug/rhume
 *
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteBySlug);

/**
 * @apiDescription Delete one Disease by id
 * @apiGroup Disease
 * @api {DELETE} /api/diseases/:id Delete Disease
 * @apiName DeleteDisease
 * 
 * @apiParam {Number} id Disease id
 * @apiUse DiseaseNotFoundError
 * 
 * @apiExample {curl} Exemple uasage:
 *     curl -i http://localhost:4000/api/diseases/1
 * 
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteById);


module.exports = router;