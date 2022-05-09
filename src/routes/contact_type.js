let express = require('express');
let router = express.Router();

const {
  createOne,
  createMany,
  findOneByNameSlug,
  getAll,
  getMany,
  getOneById,
  updateOne,
  deleteOne,
  deleteOneById,
  updateOneById,
} = require('./../controllers/ContactTypeController');

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
 * @apiDescription Get all Contact_types
 * @api {GET} /api/contact_type/all Get all Contact_type
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
 * @apiSampleRequest http://localhost:4000/api/contact_type/all
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

/**
 * @apiDescription Get all Contact_types
 * @api {GET} /api/contact_type/many Get many Contact_type
 * @apiName GetManyContact_type
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
 * @apiSampleRequest http://localhost:4000/api/contact_type/many
 * @apiVersion 0.1.0
 */
router.get('/many', getMany);

/**
 * @apiDescription Get a Contact_type by the ID
 * @api {GET} /api/contact_type/:id Get Contact_type by ID
 * @apiName GetByNameSlugContact_typeById
 * @apiGroup ContactType
 *
 * @apiParam {Number} id Contact type ID
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/:id
 * @apiVersion 0.1.0
 */
router.get('/:id', getOneById);

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
 *              "name": "Type 3"
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/contact_type/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Update a single Contact_type by Id
 * @api {PUT} /api/contact_type/:id Update single Contact_type by ID
 * @apiName UpdateSingleContact_typeById
 * @apiGroup ContactType
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiBody {String[2..50]} [name="New name"] Name (50).
 * @apiBody {Boolean} [isActive=true] Is active.
 * @apiParam {Int} id ContactType ID
 * @apiParamExample {json} Request-Example
 *  {
 *     "name":       "New Name",
 *     "isActive":   false
 *  }
 *
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/:id
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOneById);

/**
 * @apiDescription Get a Contact_type by the nameSlug
 * @api {GET} /api/contact_type/:nameSlug Get Contact_type by nameSlug
 * @apiName GetByNameSlugContact_typeByNameSlug
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
 * @apiDescription Delete a single Contact_type
 * @api {DELETE} /api/contact_type/:id Delete single Contact_type by ID
 * @apiName DeleteSingleContact_typeById
 * @apiGroup ContactType
 * @apiParam {Id} id Contact type ID
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse ContactTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/contact_type/:id
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOneById);

/**
 * @apiDescription Update a single Contact_type by NameSlug
 * @api {PUT} /api/contact_type/:nameSLug Update single Contact_type by nameSlug
 * @apiName UpdateSingleContact_typeByNameSlug
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
 * @apiSampleRequest http://localhost:4000/api/contact_type/:nameSlug
 * @apiVersion 0.1.0
 */
router.put('/slug/:nameSlug', updateOne);

/**
 * @apiDescription Delete a single Contact_type
 * @api {DELETE} /api/contact_type/:nameSLug Delete single Contact_type by nameSlug
 * @apiName DeleteSingleContact_typeByNameSlug
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
