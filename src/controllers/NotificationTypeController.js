const Models = require('./../models');

const createOne = async (req, res) => {
    try {
        const newNotificationType = await Models.notification_type.create({
            data: req.body
        })
        res.status(200).json(newNotificationType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        const newNotificationTypes = await Models.notification_type.create({
            data: [req.body]
        })
        res.status(200).json(newNotificationTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}



module.exports = {
    createOne,
    createMany
}