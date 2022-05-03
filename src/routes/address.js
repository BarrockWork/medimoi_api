var express = require('express');
var router = express.Router();

const {
    createOne,
    getAll,
    getOneById,
    updateOne,
    deleteOne,
    findMany,
} = require('./../controllers/AddressController');

/**
 * Define a global Address not found
 * @apiDefine AddressNotFoundError
 * @apiError AddressNotFoundError Address was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "AddressNotFoundError"
 *     }
 */

/**
 * Define parameters for the request
 *
 * @apiDefine AddressParams
 * @apiBody {int} numberRoad number of the address
 * @apiBody {String[2..50]} streetName address street name.
 * @apiBody {String[2..255]} [additionnalAddress=" "] Address additionnal details .
 * @apiBody {String[2..10]} zipcode adress zipcode.
 * @apiBody {String[2..50]} city city's address
 * @apiBody {String[2..50]} region state's address.
 * @apiBody {String[2..50]} country country's  address.
 * @apiBody {String[2..50]} title address's  title for this address.
 * @apiBody {Int} user_id Id of the user
 * @apiBody {Int} addressRoad_type_id address road type
 */

/**
 * @apiDescription This is how we create an address for a address
 * @apiGroup Address
 * @api {POST} /api/address/new Create single address
 * @apiName createOne
 *
 * @apiUse AddressParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 * {
 *   "numberRoad":1,
 *   "streetName":"madame",
 *   "additionnalAddress": ""
 *   "user_id":4,
 *   "address_road_type_id": 2,
 *   "zipcode":"12345",
 *   "city": "bouillante",
 *   "region":"test",
 *   "country":"France",
 *   "title":"PC"
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/address/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription This is how we get all the Addresses
 * @apiGroup Address
 * @api {GET} /api/address/all Get all Address
 * @apiName getAll
 *
 * @apiSampleRequest http://localhost:4000/api/address/all
 *
 * @apiUse AddressNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);


/**
 * @apiDescription This is how we get many the Addresses
 * @apiGroup Address
 * @api {GET} /api/address/many Get all Address
 * @apiName getAll
 *
 * @apiSampleRequest http://localhost:4000/api/address/many
 *
 * @apiUse AddressNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiDescription This is how we get a address by ID
 * @apiGroup Address
 * @api {GET} /api/address/:id Get Address by Id
 * @apiName getOneById
 *
 * @apiParam {Int} id Address Identifier.
 *
 * @apiSampleRequest http://localhost:4000/api/address/:id
 *
 * @apiUse AddressNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getOneById);

/**
 * @apiDescription This is how we update a address by ID
 * @apiGroup Address
 * @api {PUT} /api/address/:id Update single address
 * @apiName updateOne
 *
 *
 * @apiUse AddressParams
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 * {
 *   "numberRoad":1,
 *   "streetName":"madame",
 *   "additionnalAddress":"test",
 *   "zipcode":"12345",
 *   "city": "bouillante",
 *   "region":"test",
 *   "country":"France",
 *   "title":"PC",
 *   "user_id":4,
 *   "address_road_type_id": 2
 * }
 *
 * @apiSampleRequest http://localhost:4000/api/address/:id
 *
 * @apiUse AddressNotFoundError
 *
 * @apiParam {String[50]} id address id
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOne);

/**
 * @apiDescription This is how we delete an Address by ID
 * @apiGroup Address
 * @api {DELETE} /api/address/:id Delete an Address
 * @apiName deleteOne
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:       1,
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/address/:id
 *
 * @apiParam {Int} id Address ID
 *
 * @apiUse AddressNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOne);

module.exports = router;
