var express = require('express');
var router = express.Router();
const {
    findAll,
    findBySlug,
    deleteBySlug
} = require('../controllers/DiseaseController');


/**
 * @apiGroup Disease
 * @api {POST} /api/disease/new Create new disease
 * @apiName CreateDisease
 *
 * @apiBody {String} name disease name.
 * @apiBody {String} name_slug disease slug.
 * @apiBody {String} description disease.
 * @apiBody {String} incubationPeriod disease.
 * @apiBody {String} transmitting disease.
 * @apiBody {Boolean} [isActive=true] Optional disease slug.
 * @apiBody {Date}  [createdAt=now]
 * @apiBody {Date} updatedAt
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "Covid 19",
 *     name_slug:  "covid-19",
 *     description: "maladie inconnue",
 *     incubationPeriod: "15 jours",
 *     transmitting: "on ne sait pas",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new");

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
 * @api {PUT} /api/diseases/:nameSlug Update Disease
 * @apiName UpdateDiseaseBySlug
 *
 * @apiBody {String}  Optional name Disease name.
 * @apiBody {String}  Optional name_slug Disease slug.
 * @apiBody {String} description disease.
 * @apiBody {String} incubationPeriod disease.
 * @apiBody {String} transmitting disease.
 * @apiBody {Boolean} Optional Disease slug.
 * @apiBody {Date} [createdAt=now]
 * @apiBody {Date} updatedAt
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "new name",
 *     name_slug:  "new slug",
 *     description: "maladie inconnue",
 *     incubationPeriod: "15 jours",
 *     transmitting: 'on ne sait pas",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug/edit', function (req, res, next) {
    res.end('Ceci est un PUT !');
});

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