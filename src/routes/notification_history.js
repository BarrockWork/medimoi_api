var express = require('express');
var router = express.Router();

const {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
  findMany,
} = require('../controllers/NotificationHistoryController');

/**
 * Define a global Notification history not found
 * @apiDefine NotificationHistoryNotFoundError
 * @apiError NotificationHistoryNotFoundError Notification history was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotificationHistoryNotFoundError"
 *     }
 */

/**
 * @apiDescription This is how we get all Notification history
 * @apiGroup Notification History
 * @api {GET} /api/notification_history/all Get all Notification history
 * @apiName getAll
 *
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/all', getAll);

/**
 * @apiDescription This is how we get all Notification history
 * @apiGroup Notification History
 * @api {GET} /api/notification_history/many Get Many Notification history
 * @apiName getMany
 *
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.get('/many', findMany);

/**
 * @apiDescription This is how we create notification history
 * @apiGroup Notification History
 * @api {POST} /api/notification_history/new Create new notification_history
 * @apiName createOne
 *
 * @apiBody {int} notification_history_id configurate wich type of notification
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "notification_type_id":1,
 *  }
 *
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_history/new
 *
 * @apiVersion 0.1.0
 */
router.post('/new', createOne);

/**
 * @apiDescription This is how we get a notification history by identifier
 * @apiGroup Notification History
 * @api {GET} /api/notification_history/:id Get notification_history by id
 * @apiName getOneById
 *
 * @apiParam {int} id notification history id
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
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiSampleRequest http://localhost:4000/api/notification_history/:id
 *
 * @apiVersion 0.1.0
 */
router.get('/:id', getOneById);

/**
 * @apiDescription This is how we update a notification history by identifier
 * @apiGroup Notification History
 * @api {PUT} /api/notification_history/:id Update single notification_history
 * @apiName updateOne
 *
 * @apiParam {int} id notification history identifier
 *
 * @apiBody {int} notification_type_id configurate wich type of notification
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *      "notification_history_id": 3
 *  }
 *
 * @apiSampleRequest http://localhost:4000/api/notification_history/:id
 *
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.put('/:id', updateOne);

/**
 * @apiDescription This is how we delete a notification history by identifier
 * @apiGroup Notification History
 * @api {DELETE} /api/notification_history/:id Delete a notification_history
 * @apiName deleteOne
 *
 * @apiParam {int} id notification history identifier
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     'Content-Type': 'application/json'
 *   }
 *
 * @apiParamExample {json} Request-Example
 *  {
 *     id:       "1",
 *  }
 * @apiSampleRequest http://localhost:4000/api/notification_history/:id
 *
 * @apiUse NotificationHistoryNotFoundError
 *
 * @apiVersion 0.1.0
 */
router.delete('/:id', deleteOne);
module.exports = router;
