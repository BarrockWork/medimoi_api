var express = require('express');
var router = express.Router();
const {
    createDisease,
    findAll,
    findBySlug,
    updateBySlug,
    deleteBySlug
} = require('../controllers/DiseaseController');


/**
 * @apiGroup Disease
 * @api {POST} /api/diseases/new Create new disease
 * @apiName CreateDisease
 *
 * @apiBody {String} name disease name.
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
 *     disease_type_id:     1
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", createDisease);

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
 * @apiBody {String}  Optional nameSlug Disease slug.
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
 *     nameSlug:  "new slug",
 *     description: "maladie inconnue",
 *     incubationPeriod: "15 jours",
 *     transmitting: 'on ne sait pas",
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