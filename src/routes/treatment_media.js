const express = require('express');
const router = express.Router();

// import route functions from controller
const { createTreatmentMedia, getTreatmentMediaById, getAllTreatmentMedias, getTreatmentMediaByStatus, updateTreatmentMedia, deleteTreatmentMedia } = require('../controllers/TreatmentMediaController');
const action = () => {
}

/**
 * @apiGroup TreatmentMedia
 * @api {POST} /api/treatmentMedias/new Create new treatment media.
 * @apiName CreateTreatmentMedia
 * 
 * @apiBody {String} name Treatment media name.
 * @apiBody {String} mimeType Treatment media mime type.
 * @apiBody {Number} treatment_id  Treatment id.
 * @apiBody {Boolean} [isActive=true] Treatmemt media state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                        "some media name",
 *     mimeType:                   "some mime type",
 *     treatment_id:                1
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentMedia);

/**
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatmentMedias/status get treatment media by status
 * @apiName GetTreatmentMediaByStatus
 * 
 * @apiBody {Boolean} isActive The treatmemt media status.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     isActive: true
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.get("/status", getTreatmentMediaByStatus);

/**
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatmentMedias/:id Get treatment media by Id
 * @apiName GetTreatmentMediaById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/treatmentMedias/4711
 * 
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentMediaById);

/**
 * @apiGroup TreatmentMedia
 * @api {GET} /api/treatmentMedias Get all treatment media
 * @apiName GetAllTreatmentMedia
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentMedias
 * 
 * @apiVersion 0.1.0
 */
router.get("/", getAllTreatmentMedias);


/**
 * @apiGroup TreatmentMedia
 * @api {PUT} /api/treatmentMedias/:id Update treatment media
 * @apiName UpdateTreatmentMedia
 * 
 * @apiBody {String} [name=last] Treatment media name.
 * @apiBody {String} [mimeType=last] Treatment media mime type.
 * @apiBody {Number} [treatment_id=last]  Treatment id.
 * @apiBody {Boolean} [isActive=last] Treatmemt media state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     name:                        "some media name",
 *     mimeType:                   "some mime type",
 *     treatment_id:                1,
 *     isActive:                    false
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentMedia);


/**
 * @apiGroup TreatmentMedia
 * @api {DELETE} /api/treatmentMedias/:id Delete treatment media
 * @apiName DeleteTreatmentMedia
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentMedias/4711
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentMedia);

module.exports = router;