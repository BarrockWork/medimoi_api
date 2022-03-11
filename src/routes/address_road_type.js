var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneBySlug,
  updateOne,
  deleteOne,
} = require('./../controllers/AddressRoadTypeController');

/**
 * Define a global Notification history not found
 * @apiDefine AddressRoadTypeNotFoundError
 * @apiError AddressRoadTypeNotFoundError Notification history was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "AddressRoadTypeNotFoundError"
 *     }
 */

/**
 * @apiDescription This is how we get all address road type
 * @apiGroup Address Road Type
 * @api {GET} /api/address_road_type/ Get all address_road_type
 *
 * @apiUse AddressRoadTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/', getAll);

/**
 * @apiDescription This is how we get a address road type by slug
 * @apiGroup Address Road Type
 * @api {GET} /api/address_road_type/:nameSlug Get address_road_type by nameSlug
 * @apiName getOneBySlug
 *
 * @apiParam {String[2..50]} nameSlug address road type slug.
 *
 * @apiUse AddressRoadTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', getOneBySlug);

/**
 * @apiDescription This is how we create address road type
 * @apiGroup Address Road Type
 * @api {POST} /api/address_road_type/new Create single address_road_type
 * @apiName createOne
 *
 * @apiBody {String[2..50]} name name AddressRoadType name.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":"name"
 *  }
 *
 * @apiUse AddressRoadTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/address_road_type/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription This is how we update an address road type by slug
 * @apiGroup Address Road Type
 * @api {PUT} /api/address_road_type/:nameSlug/edit Update single address_road_type
 * @apiName updateOne
 * 
 * @apiParam {String[2..50]} nameSlug address road type slug.

 * @apiBody {String[2..50]} name address road typename.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name:       "update-new-type",
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/address_road_type/:nameSlug/edit
 *
 * @apiUse AddressRoadTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug/edit', updateOne);

/**
 * @apiDescription This is how we delete an address road type by name slug
 * @apiGroup Address Road Type
 * @api {DELETE} /api/address_road_type/:nameSlug/delete Delete single address_road_type
 * @apiName deleteOne
 *
 * @apiParam {String[2..50]} nameSlug address road type slug.
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     name_slug:       "test-slug",
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/address_road_type/:nameSlug/delete
 *
 *
 * @apiUse AddressRoadTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug/delete', deleteOne);
module.exports = router;
