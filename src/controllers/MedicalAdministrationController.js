// Import of the Prisma client
const { toLower } = require('ramda');
const Models = require('../models');
const { checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb, selectDrugInfos, transformIntValue} = require('./../utils/requestHandler')
const {extractQueryParameters} = require("../utils/requestHandler");

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name']);

        const medicalAdministration = await Models.medicalAdministration.create({
            data:{
                name: req.body.name,
                nameSlug: createSlug(req.body.name)
            }
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        //Success response
        res.status(200).json(medicalAdministration);
    } catch (error) {
        res.status(400).json(error);
    }

}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const medicalAdmins = [];

        // Loop on the list of MedicalAdministrations
        req.body.entries.forEach( medicalAdministration => {
            // Check the required fields
            checkRequiredFields(medicalAdministration, res,['name']);
            medicalAdmins.push({
                name:medicalAdministration.name,
                nameSlug:createSlug(medicalAdministration.name)
            })
        })

        const medicalAdministrations = await Models.medicalAdministration.createMany({
            data:medicalAdmins,
            skipDuplicates: true
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(medicalAdministrations);
    } catch (error) {
        res.status(400).json(error);
    }

}

const findOneById = async (req, res) => {
    try {
        // transform the param to number
        const id = transformIntValue(req.params.id);
        const medicalAdministration = await Models.medicalAdministration.findUnique({
            where: {
                id
            },
            include:{
                Drugs:selectDrugInfos()
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(medicalAdministration);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findOne = async (req, res) => {
    try {
        const medicalAdministration = await Models.medicalAdministration.findUnique({
            where: {
                nameSlug: req.params.nameSlug
            },
            include:{
                Drugs:selectDrugInfos()
            }
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        
        // Success response
        res.status(200).json(medicalAdministration);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const medicalAdministrations = await Models.medicalAdministration.findMany(configClient)
        const totalCount = await Models.medicalAdministration.count();
        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response        
        await Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        // Success Response 
        res.status(200).json(medicalAdministrations);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findMany = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['filterMany'])
        const medicalAdministrations = await Models.medicalAdministration.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(medicalAdministrations);
    } catch (error) {
        res.status(400).json(error);
    }
}


const updateOneByNameSlug = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            "medicalAdministration",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered
        );

        // Update the current entry
        const medicalAdministration = await Models.medicalAdministration.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(medicalAdministration);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const updateOneById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            "medicalAdministration",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered
        );

        // Update the current entry
        const medicalAdministration = await Models.medicalAdministration.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(medicalAdministration);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const deleteOneById = async (req, res) => {
    try {
        const configClient = {
            where: {
                id: transformIntValue(req.params.id)
            }
        }

        const medicalAdministration = await Models.medicalAdministration.delete(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response        
        await Models.$disconnect();

        // success response 
        res.status(200).json(medicalAdministration);
    } catch (error) {
        res.status(400).json({success: false})
    }
}

const deleteOneByNameSlug = async (req, res) => {
    try {
        const configClient = {
            where: {
                nameSlug: req.params.nameSlug
            }
        }

        const medicalAdministration = await Models.medicalAdministration.delete(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response        
        await Models.$disconnect();

        // success response 
        res.status(200).json(medicalAdministration);
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createOne,
    createMany,
    findOne,
    findAll,
    findMany,
    updateOneByNameSlug,
    updateOneById,
    deleteOneByNameSlug,
    deleteOneById,
    findOneById
}
