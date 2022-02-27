const express = require('express');
const router = express.Router();

// import route functions from controller
const { createTreatmentDrug, getTreatmentDrugByStatus, getTreatmentDrugById, getAllTreatmentDrugs, updateTreatmentDrug, deleteTreatmentDrug } = require('../controllers/TreatmentDrugController');
const action = () => {
}

/**
 * @apiGroup TreatmentDrug
 * @api {POST} /api/treatmentDrugs/new Create new treatment drug.
 * @apiName CreateTreatmentDrug
 * 
 * @apiBody {Number} treatment_id  Treatment id.
 * @apiBody {Number} drug_id  Drug id.
 * @apiBody {String} comments Treatment drug comments.
 * @apiBody {Boolean} [isActive=true] Treatmemt drug state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     treatment_id:     1,
 *     drug_id:          1,
 *     comments:         "Some comment"
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.post("/new", createTreatmentDrug);

/**
 * @apiGroup TreatmentDrug
 * @api {GET} /api/treatmentDrugs/status get treatment drug by status
 * @apiName GetTreatmentDrugByStatus
 * 
 * @apiBody {Boolean} isActive The treatmemt drug status.
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
router.get("/status", getTreatmentDrugByStatus);

/**
 * @apiGroup TreatmentDrug
 * @api {GET} /api/treatmentDrugs/:id Get treatment drug by Id
 * @apiName GetTreatmentDrugById
 * 
 * @apiExample {curl} Example usage:
 *      curl -i http://localhost:4000/api/treatmentDrugs/4711
 * 
 * @apiVersion 0.1.0
 */
router.get("/:id", getTreatmentDrugById);

/**
 * @apiGroup TreatmentDrug
 * @api {GET} /api/treatmentDrugs Get all treatment drug
 * @apiName GetAllTreatmentDrug
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentDrugs
 * 
 * @apiVersion 0.1.0
 */
router.get("/", getAllTreatmentDrugs);


/**
 * @apiGroup TreatmentDrug
 * @api {PUT} /api/treatmentDrugs/:id Update treatment drug
 * @apiName UpdateTreatmentDrug
 * 
 * @apiBody {Number} [treatment_id=last] Treatment id.
 * @apiBody {Number} [drug_id=last] Drug id.
 * @apiBody {String} [comments=last]  Treatment drug comments.
 * @apiBody {Boolean} [isActive=last] Treatmemt drug state.
 * 
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * 
 * @apiParamExample {json} Request-Example
 *  {
 *     treatment_id:     1,
 *     drug_id:          1,
 *     comments:         "Some comment",
 *     isActive:         false
 *  }
 * 
 * @apiVersion 0.1.0
 */
router.put("/:id", updateTreatmentDrug);


/**
 * @apiGroup TreatmentDrug
 * @api {DELETE} /api/treatmentDrugs/:id Delete treatment drug
 * @apiName DeleteTreatmentDrug
 * 
 * @apiExample {curl} Exemple uasage:
 *      curl -i http://localhost:4000/api/treatmentDrugs/4711
 * 
 * @apiVersion 0.1.0
 */
router.delete("/:id", deleteTreatmentDrug);

module.exports = router;