var express = require('express');
var router = express.Router();
const {
    createDisease,
    createManyDisease,
    findAll,
    findBySlug,
    updateBySlug,
    deleteBySlug
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
 * @api {GET} /api/diseases Get all Disease
 * @apiName GetAllDisease
 *
 * @apiUse DiseaseNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases
 *
 * @apiVersion 0.1.0
 */
router.get('/', findAll);


/**
 * @apiDescription Get one disease by nameSlug
 * @apiGroup Disease
 * @api {GET} /api/diseases/:nameSlug/ Get Disease by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiUse DiseaseNotFoundError
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/diseases/rhume/
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findBySlug);

/**
 * @apiDescription Update one Disease by nameSlug
 * @apiGroup Disease
 * @api {PUT} /api/diseases/:nameSlug/edit Update Disease
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
router.put('/:nameSlug/edit', updateBySlug);

/**
 * @apiDescription Delete one Disease by nameSlug
 * @apiGroup Disease
 * @api {DELETE} /api/diseases/:nameSlug/delete Delete Disease
 * @apiName DeleteDisease
 *
 * @apiParam {String[2..50]} nameSlug NameSlug
 * @apiUse DiseaseNotFoundError
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases/rhume/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteBySlug);


module.exports = router;