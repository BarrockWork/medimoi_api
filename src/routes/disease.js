var express = require('express');
var router = express.Router();

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
router.post("/new", function(req, res, next){
    res.end('Ceci est un POST !');
});

/**
 * @apiGroup Disease
 * @api {GET} /api/Disease Get all Disease
 * @apiName GetAllDisease
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/diseases
 *
 * @apiVersion 0.1.0
 */
router.get('/diseases', function(req, res, next){
    res.end('Ceci est un GET !');
});


/**
 * @apiGroup Disease
 * @api {GET} /api/disease/:slug/ Get Disease by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/disease/slug/
 *
 * @apiVersion 0.1.0
 */
router.get('/disease/:slug', function(req, res, next){
    res.end('Ceci est un GET avec un ID !');
});

/**
 * @apiGroup Disease
 * @api {PUT} /api/disease/:slug Update Disease
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
router.put('/:slug/edit', function(req, res, next){
    res.end('Ceci est un PUT !');
});

/**
 * @apiGroup Disease
 * @api {DELETE} /api/Disease/:id Delete Disease
 * @apiName DeleteDisease
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease/25
 *
 * @apiVersion 0.1.0
 */
router.delete('/:slug/delete', function(req, res, next){
    res.end('Ceci est un DELETE !');
});


module.exports = router;