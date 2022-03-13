// Import of the Prisma client
const { toLower } = require('ramda');
const Models = require('../models');
const { checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb, selectDrugInfos, transformIntValue} = require('./../utils/requestHandler')

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
        console.log(error)
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
            medicalAdmins.push(medicalAdministration)
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

        const medicalAdministrations = await Models.medicalAdministration.findMany(configClient)

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response        
        await Models.$disconnect();

        // Success Response 
        res.status(200).json(medicalAdministrations);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateOne = async (req, res) => {
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
        console.log(error);
        res.status(400).json({success: false})
    }
}

const deleteOne = async (req, res) => {
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
    updateOne,
    deleteOne,
    deleteOneById,
}
