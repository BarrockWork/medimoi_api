var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
  findMany,
} = require('../controllers/UserNotificationTypeController');
/**
 * Define a global user notification type not found
 * @apiDefine UserNotificationTypeNotFoundError
 * @apiError UserNotificationTypeNotFoundError user notification type was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotificationTypeNotFoundError"
 *     }
 */

/**
 * @apiDescription  Get all user notification type
 * @apiGroup User Notification Type
 * @api {GET} /api/user_notification_type/all Get all user_notification_type
 * @apiName getAll
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

/**
 * @apiDescription  Get all user notification type
 * @apiGroup User Notification Type
 * @api {GET} /api/user_notification_type/many Get all user_notification_type
 * @apiName getAll
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);


/**
 * @apiDescription  Get a single user notification type by identifier
 * @apiGroup User Notification Type
 * @api {GET} /api/user_notification_type/:id Get single user_notification_type by nameSlug
 * @apiName getOneById
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:           "1"
 *  }
 *
 * @apiParam {String} id user notification type id
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_notification_type/:id
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getOneById);

/**
 * @apiDescription  Insert single user notification type
 * @apiGroup User Notification Type
 * @api {POST} /api/user_notification_type/new Create new user_notification_type
 * @apiName createOne
 *
 * @apiBody {Int} user_id  User Id for configurate his notification.
 * @apiBody {Int} notification_type_id configurate wich type of notification
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "user_id":5,
 *      "notification_type_id":1,
 *  }
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/user_notification_type/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription  Update a user notification type by ID
 * @apiGroup User Notification Type
 * @api {PUT} /api/user_notification_type/:id Update single user_notification_type
 * @apiName updateOne
 *
 * @apiParam {id} id user notification type identifier
 *
 * @apiBody {Int} user_id user_id User Id for configurate his notification.
 * @apiBody {Int} notification_type_id notification_type_id configurate wich type of notification
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "user_id":5,
 *      "notification_type_id":1,
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/user_notification_type/:id
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOne);

/**
 * @apiDescription  Delete a user notification type by identifier
 * @apiGroup User Notification Type
 * @api {DELETE} /api/user_notification_type/:id Delete a user_notification_type
 * @apiName deleteOne
 *
 * @apiParam {Int} id user notification type identifier
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     email:       "jdoe@medimoi.com",
 *  }
 * @apiSampleRequest http://localhost:4000/api/user_notification_type/:id
 *
 * @apiUse UserNotificationTypeNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOne);

module.exports = router;
