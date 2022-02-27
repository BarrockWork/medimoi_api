const Models = require('./../models');
const { checkRequiredFields, createNameSlug } = require('./../utils/requestHandler')
const {toLower} = require("ramda");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name']);

        // Insert the notification_type
        const notificationsType = await Models.NotificationType.create({
            data: {
                name: req.body.name,
                nameSlug: createNameSlug(req)
            }
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(notificationsType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        const notifTypes = [];

        // Loop on the list of NotificationTypes
        req.body.entries.forEach( notificationType => {
            // Check the required fields
            checkRequiredFields(req, res,['name']);
            notifTypes.push({
                name: notificationType.name,
                nameSlug: createNameSlug(req)
            })
        })

        const notificationsTypes = await Models.NotificationType.createMany({
            data: notifTypes,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(notificationsTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findOneByNameSlug = async (req, res) => {
    try {
        const notificationType = await Models.NotificationType.findUnique({
            where: {
                nameSlug: req.params.nameSlug
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(notificationType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = {
            orderBy: {
                nameSlug: "asc"
            }
        };

        // If param status is defined
        if(req.params.isActive) {
            if (toLower(req.params.isActive) === "true") {
                configClient.where = {
                    isActive: true
                }
            }
            if (toLower(req.params.isActive) === "false") {
                configClient.where = {
                    isActive: false
                }
            }
        }

        const notificationsTypes = await Models.NotificationType.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(notificationsTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    createOne,
    createMany,
    findOneByNameSlug,
    findAll
}