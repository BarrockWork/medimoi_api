let express = require('express');
let router = express.Router();

const {
    createOne,
    createMany
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
 * @apiBody {String} name Name (50).
 * @apiBody {String} [nameSlug=auto] Slug (50, Unique).
 * @apiBody {String} [createdAt=now()] Created date (YYYY-MM-DD hh:mm:ss).
 * @apiBody {String} [updatedAt=updatedAt()] Updated date (YYYY-MM-DD hh:mm:ss).
 * @apiBody {Boolean} [isActive=true] Is active.
 */

/**
 * Define parameters for the GET request
 *
 * @apiDefine NotificationTypeGETParam
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
 *     name: "Type 5"
 *  }
 *  @apiSampleRequest http://localhost:4000/api/notification_type/new
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription Insert many Notification_type
 * @api {POST} /api/notification_type/news Create new Notification_type
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
 *     name: "Type 5"
 *  }
 *  @apiSampleRequest http://localhost:4000/api/notification_type/new
 * @apiVersion 0.1.0
 */
router.post('/news', createMany);

module.exports = router;