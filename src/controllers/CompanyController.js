const Models = require('./../models');
const { checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb } = require('./../utils/requestHandler')
const {toLower} = require("ramda");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name', 'siret', 'tva']);

        // Insert the company
        const company = await Models.Company.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                siret: req.body.siret,
                tva: req.body.tva
            }
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(company);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['entries']);

        const comps = [];

        // Loop on the list of Companies
        req.body.entries.forEach( company => {
            // Check the required fields
            checkRequiredFields(company, res,['name', 'siret', 'tva']);
            comps.push({
                name: company.name,
                nameSlug: createSlug(company.name),
                siret: company.siret,
                tva: company.tva
            })
        })

        const companies = await Models.Company.createMany({
            data: comps,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findOneByNameSlug = async (req, res) => {
    try {
        const company = await Models.Company.findUnique({
            where: {
                nameSlug: req.params.nameSlug
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(company);
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

        const companies = await Models.Company.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(companies);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateOne = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'siret', 'tva', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "Company",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const company = await Models.Company.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(company);
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

        const company = await Models.Company.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(company);
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