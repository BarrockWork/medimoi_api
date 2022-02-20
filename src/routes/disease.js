var express = require('express');
var router = express.Router();


/**
 * @apiGroup Disease
 * @api {POST} /api/disease/new Create new periodicity
 * @apiName CreateDisease
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
 *     name:       "Disease exemple",
 *     name_slug:  "disease-exemple"
 *  }
 *
 * @apiVersion 0.1.0
 */
router.post("/new", action);










module.exports = router;