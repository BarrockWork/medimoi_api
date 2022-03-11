const Models = require('./../models');
const {
    checkRequiredFields,
    extractFieldsToChange,
    transformIntValue,
    selectUserGlobalInfos,
    selectCompany
} = require('./../utils/requestHandler')
const {toLower} = require("ramda");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(
            req,
            res,
            ['company_id', 'user_id']
        );

        // Insert the userCompany
        const userCompany = await Models.UserCompany.create({
            data: {
                company_id: req.body.company_id,
                user_id: req.body.user_id,
            },
            include: {
                Company: selectCompany(),
                User: selectUserGlobalInfos()
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompany);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['entries']);

        const usersComps = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach( contact => {
            // Check the required fields
            checkRequiredFields(
                contact,
                res,
                ['company_id', 'user_id']
            );
            usersComps.push({
                company_id: contact.company_id,
                user_id: contact.user_id,
            })
        })

        const userCompanies = await Models.UserCompany.createMany({
            data: usersComps,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompanies);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findOneById = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);
        const contact = await Models.UserCompany.findUnique({
            where: {
                id: id
            },
            include: {
                Company: selectCompany(),
                User: selectUserGlobalInfos()
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

const findByUserId = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);
        const userCompany = await Models.UserCompany.findUnique({
            where: {
                user_id: id
            },
            include: {
                Company: selectCompany(),
                User: selectUserGlobalInfos()
            },
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompany);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = {
            orderBy: {
                company_id: "asc"
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

        const userCompanies = await Models.UserCompany.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompanies);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateOne = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);

        // Selection of fields
        const onlyThoseFields = ['company_id', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
        // Check if the new slug exists
        const configRequestDB = {
            where: {
                id: id
            },
            data: fieldsFiltered
        };

        // Update the current entry
        const userCompanies = await Models.UserCompany.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompanies);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);

        const configClient = {
            where: {
                id: id
            },
        }

        const userCompany = await Models.UserCompany.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(userCompany);
    }catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    createOne,
    createMany,
    findOneById,
    findAll,
    findByUserId,
    updateOne,
    deleteOne
}