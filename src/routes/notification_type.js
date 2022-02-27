let express = require('express');
let router = express.Router();

const {
    createOne,
    createMany,
    findOneByNameSlug,
    findAll
} = require('./../controllers/NotificationTypeController')

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
 * Define parameters for the POST request
 *
 * @apiDefine NotificationTypePOSTParam
 * @apiBody {String[2..50]} name Name (50).
 * @apiBody {String[2..50]} [nameSlug=auto] Slug (50, Unique).
 * @apiBody {Boolean} [isActive=true] Is active.
 */

/**
 * Define parameters for the GET request
 *
 * @apiDefine NotificationTypeGETParam
 * @apiBody {String} [name] Name (50).
 * @apiBody {String} [nameSlug=auto] Slug (50, Unique).
 */

/* ROUTES --------------------------------------------*/

/**
 * @apiDescription Insert a new Notification_type
 * @api {POST} /api/notification_type/new Create new Notification_type
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
 *              "nameSlug": "type-3"
 *          }
 *      ]
 *  }
 * @apiSampleRequest http://localhost:4000/api/notification_type/news
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

/**
 * @apiDescription Get a Notification_type by the nameSlug
 * @api {GET} /api/notification_type/slug/:nameSlug Get Notification_type by nameSlug
 * @apiName GetByNameSlugNotificationType
 * @apiGroup Notification_Type
 *
 * @apiParam {String[2..50]} nameSlug
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 * @apiUse NotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_type/slug/:nameSlug
 * @apiVersion 0.1.0
 */
router.get('/slug/:nameSlug', findOneByNameSlug);

/**
 * @apiDescription Get all Notification_types
 * @api {GET} /api/notification_type/list/:isActive? Get all Notification_type
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
 * @apiSampleRequest http://localhost:4000/api/notification_type/list/:isActive?
 * @apiVersion 0.1.0
 */
router.get('/list/:isActive?', findAll);


module.exports = router;