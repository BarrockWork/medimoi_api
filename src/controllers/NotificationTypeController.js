const Models = require('./../models');
const slugify = require('slugify')

const createOne = async (req, res) => {
    try {
        const {name: reqName, nameSlug: reqNameSlug} = req.body;

        // Initialize slug name
        const nameSlug = reqNameSlug ? reqNameSlug : slugify(reqName, {lower: true});

        // Insert the notification_type
        const notificationsType = await Models.NotificationType.create({
            data: {
                name: reqName,
                nameSlug: nameSlug
            }
        })
        // Response
        res.status(200).json(notificationsType);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        const notificationsTypes = await Models.NotificationTyoe.create({
            data: [req.body]
        })
        res.status(200).json(notificationsTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findOneByNameSlug = async (req, res) => {
    try {
        const notificationsType = await Models.NotificationTyoe.findUnique({
            where: {
                id: req.params.nameSlug
            }
        })
        res.status(200).json(notificationsType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const notificationsTypes = await Models.NotificationTyoe.findMany({
            orderBy: {
                id: "asc"
            }
        })
        res.status(200).json(notificationsTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}



module.exports = {
    createOne,
    createMany,
    findOneByNameSlug,
    findAll,

}