let express = require('express');
let router = express.Router();

const {
    createOne,
    createMany
} = require('./../controllers/NotificationTypeController')

/**
 * Define a global NotificationType not found
 * @apiDefine NotificationTypeNotFoundError
 *
 * @apiError NotificationTypeNotFound The id of the NotificationType was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotificationTypeNotFound"
 *     }
 */

router.post('/notification_type/add', createOne);

router.post('/notification_type/add/multiple', createMany);