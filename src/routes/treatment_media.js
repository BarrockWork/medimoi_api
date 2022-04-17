const express = require('express');
const router = express.Router();

// import route functions from controller
const { createTreatmentMedia, getTreatmentMediaById, findAll, findManyByTreatmentId, updateTreatmentMedia, deleteTreatmentMedia } = require('../controllers/TreatmentMediaController');

/** DEFINES ------------------------------------------------- */

/**
 * Define a global Treatment media not found
 * @apiDefine TreatmentMediaNotFoundError
 * @apiError TreatmentMediaNotFound Treatment media was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "TreatmentMediaNotFound"
 *     }
*/

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine TreatmentMediaPOSTParam
 * @apiBody {String[2..255]} name Treatment media name.
 * @apiBody {String[2..50]} mimeType Treatment media mime type.
 * @apiBody {Number} treatment_id  Treatment id.
 * @apiBody {Boolean} [isActive=true] Treatmemt media state.
*/

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single treatment media
 * @api {POST} /api/treatment_medias/new Create new treatment media.
 * @apiName CreateTreatmentMedia
 * @apiGroup TreatmentMedia
 * 
 * @apiUse TreatmentMediaPOSTParam
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":         "some media name",
 *     "mimeType":     "some mime type",
 *     "treatment_id": 1
 *  }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_medias/new
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentMedia);


/**
 * @apiDescription get many treatment media by id
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatment_medias/all Get Many treatment media
 * @apiName GetManyTreatmentMedia
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_medias/all/false
 */
router.get("/all/:isActive?", findAll);

/**
 * @apiDescription get single treatment media by id
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatment_medias/:id Get treatment media by Id
 * @apiName GetTreatmentMediaById
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_media/2
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentMediaById);

/**
 * @apiDescription get many treatment media by treatment_id
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatment_medias/:id Get many treatment media by treatment_id
 * @apiName GetManyTreatmentMediaByTreatmentId
 * 
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_media/treatment/1
 * @apiVersion 0.1.0
 */
router.get("/treatment/:treatment_id", findManyByTreatmentId);


/**
 * @apiDescription Update treatment media
 * @apiGroup TreatmentMedia
 * @api {PUT} /api/treatment_medias/:id Update treatment media
 * @apiName UpdateTreatmentMedia
 * 
 * @apiBody {String[2..255]} [name=last] Treatment media name.
 * @apiBody {String[2..50]} [mimeType=last] Treatment media mime type.
 * @apiBody {Boolean} [isActive=last] Treatmemt media state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:          "some media name",
 *     mimeType:      "some mime type",
 *     isActive:      false
 *  }
 * 
 * @apiUse TreatmentMediaNotFoundError
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_medias/1
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentMedia);


/**
 * @apiDescription Delete treatment media
 * @apiGroup TreatmentMedia
 * @api {DELETE} /api/treatment_medias/:id Delete treatment media
 * @apiName DeleteTreatmentMedia
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiUse TreatmentMediaNotFoundError
 * 
 * @apiSampleRequest http://localhost:4000/api/treatment_medias/1
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentMedia);

module.exports = router;