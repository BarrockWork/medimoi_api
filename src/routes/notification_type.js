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
  deleteOneById,
  deleteOne,
} = require('./../controllers/NotificationTypeController');

/* DEFINES -------------------------------------------*/

/**
 * Define a global NotificationType not found
 * @apiDefine NotificationTypeNotFoundError
 * @apiError NotificationTypeNotFound NotificationType was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotificationTypeNotFound"
 *     }
 */

/**
 * Define parameters for the POST and PUT requests
 *
 * @apiDefine NotificationTypePOSTParam
 * @apiBody {String[2..50]} name Name.
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Get all Notification_types
 * @api {GET} /api/notification_type/all Get all Notification_type
 * @apiName GetAllNotificationType
 * @apiGroup Notification_Type
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/all
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

router.delete('/:id', deleteOneById);

router.get('/:id', getOneById);

/**
 * @apiDescription Insert single Notification_type
 * @api {POST} /api/notification_type/new Create single Notification_type
 * @apiName CreateNotificationType
 * @apiGroup Notification_Type
 *
 * @apiUse NotificationTypePOSTParam
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
 * @apiSampleRequest http://localhost:4000/api/notification_type/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many Notification_type
 * @api {POST} /api/notification_type/news Create many Notification_type
 * @apiName CreateManyNotificationType
 * @apiGroup Notification_Type
 *
 * @apiUse NotificationTypePOSTParam
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
 * @apiSampleRequest http://localhost:4000/api/notification_type/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get a Notification_type by the nameSlug
 * @api {GET} /api/notification_type/:nameSlug Get Notification_type by nameSlug
 * @apiName GetByNameSlugNotificationType
 * @apiGroup Notification_Type
 *
 * @apiParam {String[2..50]} nameSlug Name slug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/:nameSlug
 * @apiVersion 0.1.0
 */
router.get('/:nameSlug', findOneByNameSlug);

/**
 * @apiDescription Get many Notification_types
 * @api {GET} /api/notification_type/many Get many Notification_type
 * @apiName GetAllNotificationType
 * @apiGroup Notification_Type
 *
 * @apiParam {Boolean} [isActive=none]
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/many
 * @apiVersion 0.1.0
 */
router.get('/many', getMany);

/**
 * @apiDescription Update a single Notification_type
 * @api {PUT} /api/notification_type/:nameSLug Update single Notification_type
 * @apiName UpdateSingleNotificationType
 * @apiGroup Notification_Type
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
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/:nameSlug
 * @apiVersion 0.1.0
 */
router.put('/:nameSlug', updateOne);

/**
 * @apiDescription Delete a single Notification_type
 * @api {DELETE} /api/notification_type/:nameSLug Delete single Notification_type
 * @apiName DeleteSingleNotificationType
 * @apiGroup Notification_Type
 * @apiParam {String[2..50]} nameSlug Name slug
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/:nameSlug
 * @apiVersion 0.1.0
 */
router.delete('/:nameSlug', deleteOne);

module.exports = router;
