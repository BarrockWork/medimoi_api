var express = require('express');
var router = express.Router();

// en attendant le controller 
const action = ()=>{}

/**
 * @apiGroup Periodicity
 * @api {POST} /api/periodicity/new Create new periodicity
 * @apiName CreatePeriodicity
 * 
 * @apiBody {String} name Periodicity name.
 * @apiBody {String} name_slug Periodicity slug.
 * @apiBody {Boolean} [isActive=true] Optional Periodicity slug.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "Periodicity exemple",
 *     name_slug:  "periodicity-exemple"
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", action);


/**
 * @apiGroup Periodicity
 * @api {GET} /api/periodicity/:id Get periodicity by Id
 * @apiName GetPeriodicityById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/periodicity/4711
 * 
 * @apiVersion 0.1.0
 */
router.get("/:id", action);



/**
 * @apiGroup Periodicity
 * @api {GET} /api/periodicity/slug/:slug Get periodicity by Slug
 * @apiName GetPeriodicityBySlug
 * 
 * @apiVersion 0.1.0
 */
router.get("/slug/:slug", action);


/**
 * @apiGroup Periodicity
 * @api {GET} /api/periodicity Get all periodicity
 * @apiName GetAllPeriodicity
 * 
 * @apiVersion 0.1.0
 */
router.get("/", action);


/**
 * @apiGroup Periodicity
 * @api {PUT} /api/periodicity/:id Update periodicity
 * @apiName UpdatePeriodicityById
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", action);


/**
 * @apiGroup Periodicity
 * @api {DELETE} /api/periodicity/:id Delete periodicity
 * @apiName DeletePeriodicity
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", action);

module.exports = router;