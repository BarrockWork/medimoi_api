var express = require('express');
var router = express.Router();

/**
 * @apiGroup Disease_type
 * @api {POST} /api/disease_type/new Create New Disease_Type
 * @apiName CreateDiseaseType
 *
 * @apiBody {String} name disease_type name.
 * @apiBody {String} name_slug disease slug.
 * @apiBody {String} description disease.
 * @apiBody {Boolean} [isActive=true] Optional disease slug.
 * @apiBody {Date} [createdAt=now]
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
 *     name:       "dermatologiques",
 *     name_slug:  "dermatologiques",
 *     description: "maladie de la peau",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", function(req, res, next){
    res.end('Ceci est un POST !');
});

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_type Get all DiseaseType
 * @apiName GetAllDiseaseType
 *
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/disease_type
 *
 * @apiVersion 0.1.0
 */
router.get('/disease-type', function(req, res, next){
    res.end('Ceci est un GET !');
});

/**
 * @apiGroup Disease_type
 * @api {GET} /api/disease_type/:slug/ Get DiseaseType by Slug
 * @apiName GetDiseaseBySlug
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4000/api/disease_type/slug/
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', function(req, res, next){
    res.end('Ceci est un GET avec un ID !');
});

/**
 * @apiGroup Disease_type
 * @api {PUT} /api/disease_type/:slug Update Disease_Type
 * @apiName UpdateDiseaseType
 *
 * @apiBody {String} name disease_type name.
 * @apiBody {String} name_slug disease slug.
 * @apiBody {String} description disease.
 * @apiBody {Boolean} [isActive=true] Optional disease slug.
 * @apiBody {Date} [createdAt=now]
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
 *     name:       "cardiovasculaires",
 *     name_slug:  "cardiovasculaires",
 *     description: "maladie du coeur",
 *  }
 *
 * @apiVersion 0.1.0
 */
router.put('/:slug/edit', function(req, res, next){
    res.end('Ceci est un PUT !');
});


/**
 * @apiGroup Disease_type
 * @api {DELETE} /api/disease_type/:slug Delete Disease_Type
 * @apiName DeleteDiseaseType
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