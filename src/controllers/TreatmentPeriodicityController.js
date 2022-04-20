// Import of the Prisma client
const Models = require('../models');
const {
    checkRequiredFields,
    createSlug,
    extractFieldsToChange,
    verifySlugInDb,
    extractQueryParameters
} = require('../utils/requestHandler');
const { toLower } = require('ramda');

const createTreatmentPeriodicity = async (req, res) => {
    // console.log("createTreatmentPeriodicity");
    try {

        checkRequiredFields(req, res, ['name']);

        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data: {
                name:req.body.name,
                nameSlug: createSlug(req.body.name)
            }
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicity);
    } catch (error) {
        // console.error(error, "createTreatmentPeriodicity");
        res.status(400).json({
            success: false,
            error
        });
    }

}

const createMany = async (req, res) => {
    // console.log("createMany");
    try {
        // Check the required fields
        checkRequiredFields(req, res,['entries']);

        const list = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach( periodicity => {
            // Check the required fields
            checkRequiredFields(
                periodicity,
                res,
                ['name']
            );
            list.push({
                name: periodicity.name,
                nameSlug: createSlug(periodicity.name),
            })
        })

        const treatmentPeriodicities = await Models.treatmentPeriodicity.createMany({
            data:list,
            skipDuplicates:true
        });
        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicities);
    } catch (error) {
        // console.error(error, "createMany");
        res.status(400).json(error);
    }

}

const getTreatmentPeriodicityById = async (req, res) => {
    const {id} = req.params;
    try {
        const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
            where: {
                id: parseInt(id)
            },

            // you can include relation and elements like that.
            include:{
                Treatments:{
                    select:{
                        id: true,
                        name:true,
                        isActive: true
                    }
                }
            }
        })

        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicity);
    } catch (error) {
        // console.error(error, "getTreatmentPeriodicityById");
        res.status(400).json(error);
    }
}

const getTreatmentPeriodicityBySlug = async (req, res) => {
    const {nameSlug} = req.params;
    try {
        const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
            where: {
                nameSlug
            },

            // you can include relation and elements like that.
            include:{
                Treatments:{
                    select:{
                        id: true,
                        name:true,
                        isActive: true
                    }
                }
            }
        })

        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicity);
    } catch (error) {
        console.error(error, "getTreatmentPeriodicityBySlug");
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const treatmemtPeriodicities = await Models.treatmentPeriodicity.findMany(configClient)
        const totalCount = await Models.treatmentPeriodicity.count();
        await Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.header('content-range', totalCount);
        res.status(200).json(treatmemtPeriodicities);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Update function
const updateTreatmentPeriodicityById = async (req, res) => {
    try {
        const onlyThoseFields = ['name', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            "treatmentPeriodicity",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered
        );

        // Update the current entry
        const treatmentPeriodicity = await Models.treatmentPeriodicity.update(configRequestDB);

        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicity);
    } catch (error) {
        // console.error(error, "updateTreatmentPeriodicity");
        res.status(400).json(error);
    }
}

// Update function by slug
const updateTreatmentPeriodicityBySlug = async (req, res) => {
    // console.log("updateTreatmentPeriodicity");
    try {
        const onlyThoseFields = ['name', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            "treatmentPeriodicity",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered
        );
        // console.log(req.body);
        // Update the current entry
        const treatmentPeriodicity = await Models.treatmentPeriodicity.update(configRequestDB);

        await Models.$disconnect();
        res.status(200).json(treatmentPeriodicity);
    } catch (error) {
        console.error(error, "updateTreatmentPeriodicity");
        res.status(400).json(error);
    }
}

// Delete function
const deleteTreatmentPeriodicityById = async (req, res) => {
    // console.log("deleteTreatmentPeriodicity");
    const {id} = req.params;

    try {
        await Models.treatmentPeriodicity.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            message: `Treatment periodicity with id ${id} was deleted`
        });
    } catch (error) {
        // console.log(error);
        // console.error(error, "deleteTreatmentPeriodicity");
        res.status(400).json({success: false})
    }
}

// Delete function by slug
const deleteTreatmentPeriodicityBySlug = async (req, res) => {
    // console.log("deleteTreatmentPeriodicityBySlug");
    const {nameSlug} = req.params;

    try {
        await Models.treatmentPeriodicity.delete({
            where:{
                nameSlug
            }
        })
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            message: `Treatment periodicity with slugName ${nameSlug} was deleted`
        });
    } catch (error) {
        // console.error(error, "deleteTreatmentPeriodicityBySlug");
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentPeriodicity,
    createMany,
    getTreatmentPeriodicityById,
    getTreatmentPeriodicityBySlug,
    findAll,
    updateTreatmentPeriodicityById,
    updateTreatmentPeriodicityBySlug,
    deleteTreatmentPeriodicityById,
    deleteTreatmentPeriodicityBySlug
}
