let express = require('express');
let router = express.Router();

const {
    createOne,
    createMany,
    findOneByNameSlug,
    findAll,
    updateOne,
    deleteOne
} = require('./../controllers/ContactTypeController')

/* DEFINES -------------------------------------------*/

/**
 * Define a global ContactType not found
 * @apiDefine ContactTypeNotFoundError
 * @apiError ContactTypeNotFound ContactType was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ContactTypeNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine ContactTypePOSTParam
 * @apiBody {String[2..50]} name Name.
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert single Contact_type
 * @api {POST} /api/contact_type/new Create single Contact_type
 * @apiName CreateContactType
 * @apiGroup ContactType
 *
 * @apiUse ContactTypePOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     "name": "Type 5"
 *  }
 * @apiSampleRequest http://localhost:4000/api/contact_type/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many Contact_type
 * @api {POST} /api/contact_type/news Create many Contact_type
 * @apiName CreateManyContact_type
 * @apiGroup ContactType
 *
 * @apiUse ContactTypePOSTParam
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiParamExample {json} Request-Example
 *  {
 *      "entries": [
 *          {
 *              "name": "Type 1"
 *          },
 *          {
 *              "name": "Type 2"
 *          },
 *          {
 *              "name": "Type 3",
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/contact_type/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get a Contact_type by the nameSlug
 * @api {GET} /api/contact_type/slug/:nameSlug Get Contact_type by nameSlug
 * @apiName GetByNameSlugContact_type
 * @apiGroup ContactType
 *
 * @apiParam {String[2..50]} nameSlug Name slug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findOneByNameSlug);

/**
 * @apiDescription Get all Contact_types
 * @api {GET} /api/contact_type/all/:isActive? Get all Contact_type
 * @apiName GetAllContact_type
 * @apiGroup ContactType
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/all/:isActive?
 * @apiVersion 0.1.0
 */
router.get('/all/:isActive?', findAll);

/**
 * @apiDescription Update a single Contact_type
 * @api {PUT} /api/contact_type/slug/:nameSLug Update single Contact_type
 * @apiName UpdateSingleContact_type
 * @apiGroup ContactType
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [name="New name"] Name (50).
 * @apiBody {Boolean} [isActive=true] Is active.
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":       "New Name",
 *     "isActive":   false
 *  }
 *
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateOne);

/**
 * @apiDescription Delete a single Contact_type
 * @api {DELETE} /api/contact_type/slug/:nameSLug Delete single Contact_type
 * @apiName DeleteSingleContact_type
 * @apiGroup ContactType
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.delete('/slug/:nameSlug', deleteOne);


module.exports = router;