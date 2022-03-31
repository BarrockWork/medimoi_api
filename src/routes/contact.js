let express = require('express');
let router = express.Router();

const {
    createOne,
    createMany,
    findOneById,
    findAll,
    findByUserId,
    updateOne,
    deleteOne
} = require('./../controllers/ContactController')

/* DEFINES -------------------------------------------*/

/**
 * Define a global Contact not found
 * @apiDefine ContactNotFoundError
 * @apiError ContactNotFound Contact was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ContactNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine ContactPOSTParam
 * @apiBody {String[2..50]} firstName FirstName.
 * @apiBody {String[2..50]} lastName LastName.
 * @apiBody {String[10..50]} phoneNumber PhoneNumber.
 * @apiBody {Number} contact_type_id ContactType id.
 * @apiBody {Number} user_id User id.
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single Contact
 * @api {POST} /api/contact/new Create single Contact
 * @apiName CreateContact
 * @apiGroup Contact
 *
 * @apiUse ContactPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "firstName": "John",
 *     "lastName": "Doe",
 *     "phoneNumber": "0666666666",
 *     "contact_type_id": 1,
 *     "user_id": 1
 *  }
 * @apiSampleRequest http://localhost:4000/api/contact/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many Contact
 * @api {POST} /api/contact/news Create many Contact
 * @apiName CreateManyContact
 * @apiGroup Contact
 *
 * @apiUse ContactPOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *              "firstName": "John",
 *              "lastName": "Doe",
 *              "phoneNumber": "0666666666",
 *              "contact_type_id": 1,
 *              "user_id": 1
 *          },
 *          {
 *              "firstName": "Robert",
 *              "lastName": "Dupont",
 *              "phoneNumber": "0666666666",
 *              "contact_type_id": 2,
 *              "user_id": 2
 *          },
 *          {
 *              "firstName": "Jean",
 *              "lastName": "Baltus",
 *              "phoneNumber": "0666666666",
 *              "contact_type_id": 3,
 *              "user_id": 3
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/contact/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get Contacts by User id
 * @api {GET} /api/contact/user/:id Get Contacts by User id
 * @apiName GetByUserIdContact
 * @apiGroup Contact
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact/user/:id
 * @apiVersion 0.1.0
 */
router.get('/user/:id', findByUserId);

/**
 * @apiDescription Get all Companies
 * @api {GET} /api/contact/all/:isActive? Get all Contact
 * @apiName GetAllContact
 * @apiGroup Contact
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact/all/:isActive?
 * @apiVersion 0.1.0
 */
router.get('/all/:isActive?', findAll);

/**
 * @apiDescription Get a Contact by id
 * @api {GET} /api/contact/:id Get Contact by id
 * @apiName GetByIdContact
 * @apiGroup Contact
 *
 * @apiParam {Number} id Id
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', findOneById);

/**
 * @apiDescription Update a single Contact
 * @api {PUT} /api/contact/:id Update single Contact
 * @apiName UpdateSingleContact
 * @apiGroup Contact
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [firstName="New firstname"] Firstname.
 * @apiBody {String[2..50]} [lastName="New lastname"] Lastname.
 * @apiBody {String[2..50]} [phoneNumber="New phone number"] Phone number.
 * @apiBody {Number} [contact_type_id=1] ContactType id.
 * @apiBody {Boolean} [isActive=true] Is active.
 *
 * @apiParam {Number} id Id
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "firstName": "Jean",
 *     "lastName": "Baltus",
 *     "phoneNumber": "0666666666",
 *     "contact_type_id": 3,
 *     "isActive":   false
 *  }
 *
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact/:id
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOne);

/**
 * @apiDescription Delete a single Contact
 * @api {DELETE} /api/contact/:id Delete single Contact
 * @apiName DeleteSingleContact
 * @apiGroup Contact
 * @apiParam {Number} id Id
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse ContactNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact/:id
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOne);


module.exports = router;