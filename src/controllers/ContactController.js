const Models = require('./../models');
const { checkRequiredFields, extractFieldsToChange, transformIntValue } = require('./../utils/requestHandler')
const {toLower} = require("ramda");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(
            req,
            res,
            ['firstName', 'lastName', 'phoneNumber', 'contact_type_id', 'user_id']
        );

        // Insert the contact
        const contact = await Models.Contact.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                contact_type_id: req.body.contact_type_id,
                user_id: req.body.user_id,
            }
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contact);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['entries']);

        const conts = [];

        // Loop on the list of Companies
        req.body.entries.forEach( contact => {
            // Check the required fields
            checkRequiredFields(
                contact,
                res,
                ['firstName', 'lastName', 'phoneNumber', 'contact_type_id', 'user_id']
            );
            conts.push({
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNumber: contact.phoneNumber,
                contact_type_id: contact.contact_type_id,
                user_id: contact.user_id,
            })
        })

        const contacts = await Models.Contact.createMany({
            data: conts,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findOneById = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);
        const contact = await Models.Contact.findUnique({
            where: {
                id: id
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contact);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = {
            orderBy: {
                lastName: "asc"
            }
        };

        // If param isActive is defined
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

        const contacts = await Models.Contact.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contacts);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateOne = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);

        // Selection of fields
        const onlyThoseFields = ['firstName', 'lastName', 'phoneNumber', 'contact_type_id', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = {
            where: {
                id: id
            },
            data: fieldsFiltered
        };

        // Update the current entry
        const contact = await Models.Contact.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contact);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        // Check requried field
        checkRequiredFields(req, res,['id'], 'GET');
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);

        const configClient = {
            where: {
                id: id
            },
        }

        const contact = await Models.Contact.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contact);
    }catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    createOne,
    createMany,
    findOneById,
    findAll,
    updateOne,
    deleteOne
}