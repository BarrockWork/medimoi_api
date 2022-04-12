// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');
const { checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb } = require('../utils/requestHandler');
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
    // console.log("getTreatmentPeriodicityById");
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
    // console.log("getTreatmentPeriodicityBySlug");
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
    // console.log("findAll");
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

        const treatmemtPeriodicities = await Models.treatmentPeriodicity.findMany(configClient)

        await Models.$disconnect();
        res.status(200).json(treatmemtPeriodicities);
    } catch (error) {
        // console.log(error)
        console.error(error, "findAll");
        res.status(400).json(error);
    }
}

// const getTreatmentPeriodicityByStatus = async (req, res) => {
//     const {isActive} = req.body
//     try {
//         const treatmemtPeriodicities = await Models.treatmentPeriodicity.findMany({
//             where:{
//                 isActive
//             },
//             include:{
//                 Treatments:{
//                     select:{
//                         id:true,
//                         name:true,
//                         isActive:true
//                     }
//                 }
//             }
//         })

//         Models.$disconnect();
        // console.log(treatmemtPeriodicities);
//         res.status(200).json({
//             success: true,
//             treatmemtPeriodicities
//         });
//     } catch (error) {
        // console.log(error);
//         res.status(400).json({
//             success: false,
//             error
//         });
//     }
// }

// Update function
const updateTreatmentPeriodicity = async (req, res) => {
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
const deleteTreatmentPeriodicity = async (req, res) => {
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
    updateTreatmentPeriodicity,
    deleteTreatmentPeriodicity,
    deleteTreatmentPeriodicityBySlug
}
