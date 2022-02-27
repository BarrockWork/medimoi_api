// Import of the Prisma client
const { isEmpty } = require('ramda');
const Models = require('../models');

const createTreatment = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name', 
        'treatment_periodicity_id',
        'user_id'
    ];

    // Get missing required fields.
    const missingValues = requiredFields.filter(fileld => !req.body[fileld])

    if(!isEmpty(missingValues)){
        return res.status(400).json({
            message: "Somes values are missings",
            value: missingValues
        })
    }

    try {
        const treatmemt = await Models.treatment.create({
            data: req.body
        });
        console.log(treatmemt);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            treatmemt
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const getTreatmentById = async (req, res) => {
    
    const {id} = req.params;
    
    try {
        const treatmemt = await Models.treatment.findUnique({
            where: {
                id: parseInt(id)
            },

            // To select specific elements.
            // select:{
            //     name:true,
            //     user_id:true,
            //     treatment_periodicity_id:true
            // },

            // you can include relation and elements like that.
            include:{
                User: true,
                TreatmentDrugs:true,
                TreatmentMedias:true,

                // You can specify what you want in the relation.
                TreatmentPeriodicity:{
                    select:{
                        id:true,
                        name:true,
                        nameSlug:true,
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(treatmemt);
        res.status(200).json({
            success: true,
            treatmemt
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getAllTreatments = async (req, res) => {
    try {
        const treatmemts = await Models.treatment.findMany({
            select: {
                id:true,
                name:true,
                isActive:true
            }
        })
        Models.$disconnect();
        console.log(treatmemts);
        res.status(200).json({
            success: true,
            treatmemts
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getTreatmentByStatus = async (req, res) => {
    const {isActive} = req.body
    try {
        const treatmemts = await Models.treatment.findMany({
            where:{
                isActive
            },
            select: {
                id:true,
                name:true,
                isActive:true
            }
        })

        Models.$disconnect();
        console.log(treatmemts);
        res.status(200).json({
            success: true,
            treatmemts
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

// Update function
const updateTreatment = async (req, res) => {
    const {id} = req.params;

    try {
        const treatment = await Models.treatment.update({
            where:{
                id: parseInt(id)
            },
            data:req.body
        });
        await Models.$disconnect();
        console.log(treatment);
        res.status(200).json({
            success: true,
            treatment
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

// Delete function
const deleteTreatment = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedTreatment = await Models.treatment.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        console.log(deletedTreatment);
        res.status(200).json({
            success: true,
            message: `Treatment with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatment,
    getTreatmentById,
    getAllTreatments,
    getTreatmentByStatus,
    updateTreatment,
    deleteTreatment
}
