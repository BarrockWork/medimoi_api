// Import of the Prisma client
const { isEmpty } = require('ramda');
const Models = require('../models');
const { transformIntValue, checkRequiredFields, selectDrugInfos, selectTreatmentDrugsInfos, selectTreatmentMediasInfos, selecttreatmentPeriodicityInfos, selectTreatmentGlobalInfos } = require('../utils/requestHandler');

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name', "user_id", "treatment_periodicity_id", "startedAt"]);

        const treatmemt = await Models.treatment.create({
            data:{
                name: req.body.name,
                user_id: transformIntValue(req.body.user_id),
                treatment_periodicity_id: transformIntValue(req.body.treatment_periodicity_id),
                startedAt: new Date(req.body.startedAt)
            }
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        //Success response
        res.status(200).json(treatmemt);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,["entries"]);

        const treatmentList = [];

        // Loop on the list of MedicalAdministrations
        req.body.entries.forEach(treatmemt => {
            // Check the required fields
            checkRequiredFields(treatmemt, res,['name', "user_id", "treatment_periodicity_id", "startedAt"]);
            treatmentList.push(
                {
                    name: treatmemt.name,
                    user_id: transformIntValue(treatmemt.user_id),
                    treatment_periodicity_id: transformIntValue(treatmemt.treatment_periodicity_id),
                    startedAt: new Date(treatmemt.startedAt)
                }
            )
        })
        const result = await Models.treatment.createMany({
            data: treatmentList,
            skipDuplicates: true
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        //Success response
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

const getTreatmentById = async (req, res) => {
    try {
        const treatmemt = await Models.treatment.findUnique({
            where: {
                id: transformIntValue(id)
            },

            select:selectTreatmentGlobalInfos()
        })

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        //success response
        res.status(200).json(treatmemt);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getAllTreatments = async (req, res) => {
    try {
        const configClient = {
            orderBy: {
                name: "asc"
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

        const treatmemts = await Models.treatment.findMany(configClient)

        Models.$disconnect();
        res.status(200).json(treatmemts);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateTreatment = async (req, res) => {
    try {
        const treatment = await Models.treatment.update({
            where:{
                id: transformIntValue(req.params.id)
            },
            data:req.body
        });
        await Models.$disconnect();
        res.status(200).json(treatment);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Delete function
const deleteTreatment = async (req, res) => {
    try {
        const deletedTreatment = await Models.treatment.delete({
            where:{
                id: transformIntValue(req.params.id)
            }
        })
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            message: `Treatment with id ${id} was deleted`
        });
    } catch (error) {
        res.status(400).json({success: false})
    }
}

module.exports = {
    createOne,
    createMany,
    getTreatmentById,
    getAllTreatments,    
    updateTreatment,
    deleteTreatment
}
