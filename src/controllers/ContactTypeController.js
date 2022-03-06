const Models = require('./../models');
const { checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb } = require('./../utils/requestHandler')
const {toLower} = require("ramda");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name']);

        // Insert the contact_type
        const contactType = await Models.ContactType.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name)
            }
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contactType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['entries']);

        const conTypes = [];

        // Loop on the list of Contact_types
        req.body.entries.forEach( contact_type => {
            // Check the required fields
            checkRequiredFields(contact_type, res,['name']);
            conTypes.push({
                name: contact_type.name,
                nameSlug: createSlug(contact_type.name)
            })
        })

        const contactTypes = await Models.ContactType.createMany({
            data: conTypes,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contactTypes);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findOneByNameSlug = async (req, res) => {
    try {
        const contactType = await Models.ContactType.findUnique({
            where: {
                nameSlug: req.params.nameSlug
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contactType);
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

        const contactTypes = await Models.ContactType.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contactTypes);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateOne = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "ContactType",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // res.status(200).json(configRequestDB);
        // Update the current entry
        const Contact_type = await Models.ContactType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(Contact_type);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        checkRequiredFields(req, res,['nameSlug'], 'GET');

        const configClient = {
            where: {
                nameSlug: req.params.nameSlug
            },
        }

        const contactType = await Models.ContactType.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(contactType);
    }catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    createOne,
    createMany,
    findOneByNameSlug,
    findAll,
    updateOne,
    deleteOne
}