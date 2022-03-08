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
 * @apiGroup Disease
 * @api {POST} /api/diseases/new Create single disease
 * @apiName CreateDisease
 *
 * @apiBody {String} name disease name.
 * @apiBody {String} description disease description.
 * @apiBody {String} incubationPeriod disease incubationPeriod.
 * @apiBody {String} transmitting disease transmitting.
 * @apiBody {Number} disease_type_id  Disease type  id.
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
 * @apiGroup Disease
 * @api {POST} /api/diseases/news Create many disease
 * @apiName CreateManyDisease
 *
 * @apiBody {String} name disease name.
 * @apiBody {String} description disease description.
 * @apiBody {String} incubationPeriod disease incubationPeriod.
 * @apiBody {String} transmitting disease transmitting.
 * @apiBody {Number} disease_type_id  Disease type  id.
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
 * @apiVersion 0.1.0
 */
router.post("/news", createManyDisease);

/**
 * @apiGroup Disease
 * @api {GET} /api/diseases Get all Disease
 * @apiName GetAllDisease
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases
 *
 * @apiVersion 0.1.0
 */
router.get('/', findAll);


/**
 * @apiGroup Disease
 * @api {GET} /api/diseases/:nameSlug/ Get Disease by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/diseases/rhume/
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findBySlug);

/**
 * @apiGroup Disease
 * @api {PUT} /api/diseases/:nameSlug/edit Update Disease
 * @apiName UpdateDiseaseBySlug
 *
 * @apiBody {String}  Optional name Disease name.
 * @apiBody {String} description disease.
 * @apiBody {String} incubationPeriod disease.
 * @apiBody {String} transmitting disease.
 * @apiBody {Number} disease_type_id  Disease type  id.
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
 *     disease_type_id: 1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug/edit', updateBySlug);

/**
 * @apiGroup Disease
 * @api {DELETE} /api/diseases/:nameSlug/delete Delete Disease
 * @apiName DeleteDisease
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases/rhume/delete
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteBySlug);


module.exports = router;