var express = require('express');
var router = express.Router();


/**
 * @apiGroup Drug
 * @api {POST} /api/drug/new Create new Drug
 * @apiName CreateDrug
 *
 * @apiBody {String} name drug name.
 * @apiBody {String} name_slug drug slug.
 * @apiBody {String} description drug.
 * @apiBody {Boolean} [isActive=true] Optional drug slug.
 * @apiBody {Boolean} [isPrescription=false] Optional drug slug.
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

router.get('/', function(req, res, next){
    res.end('Ceci est un GET !');
});

router.get('/:id', function(req, res, next){
    res.end('Ceci est un GET avec un ID !');
});
router.put('/:id/edit', function(req, res, next){
    res.end('Ceci est un PUT !');
});

router.delete('/:id/delete', function(req, res, next){
    res.end('Ceci est un DELETE !');
});


module.exports = router;