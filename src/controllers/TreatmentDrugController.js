// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');

const createTreatmentDrug = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'comments',
        'drug_id', 
        'treatment_id'
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
        const treatmentDrug = await Models.treatmentDrug.create({
            data: req.body
        });
        console.log(treatmentDrug);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            treatmentDrug
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const getTreatmentDrugById = async (req, res) => {
    
    const {id} = req.params;
    try {
        const treatmentDrug = await Models.treatmentDrug.findUnique({
            where: {
                id: parseInt(id)
            },

            // you can include relation and elements like that.
            include:{
                Treatment:{
                    select:{
                        id: true,
                        name:true
                    }
                },
                Drug:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(treatmentDrug);
        res.status(200).json({
            success: true,
            treatmentDrug
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getAllTreatmentDrugs = async (req, res) => {
    try {
        const treatmemtDrugs = await Models.treatmentDrug.findMany({
            select: {
                id:true,
                comments:true,
                isActive:true
            }
        })
        Models.$disconnect();
        console.log(treatmemtDrugs);
        res.status(200).json({
            success: true,
            treatmemtDrugs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getTreatmentDrugByStatus = async (req, res) => {
    const {isActive} = req.body
    try {
        const treatmentDrugs = await Models.treatmentDrug.findMany({
            where:{
                isActive
            },
            select: {
                id:true,
                comments:true,
                isActive:true
            }
        })

        Models.$disconnect();
        console.log(treatmentDrugs);
        res.status(200).json({
            success: true,
            treatmentDrugs
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
const updateTreatmentDrug = async (req, res) => {
    const {id} = req.params;

    try {
        const treatmentDrug = await Models.treatmentDrug.update({
            where:{
                id: parseInt(id)
            },
            data:req.body
        });
        await Models.$disconnect();
        console.log(treatmentDrug);
        res.status(200).json({
            success: true,
            treatmentDrug
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
const deleteTreatmentDrug = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedTreatmentDrug = await Models.treatmentDrug.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        console.log(deletedTreatmentDrug);
        res.status(200).json({
            success: true,
            message: `Treatment drug with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentDrug,
    getTreatmentDrugById,
    getAllTreatmentDrugs,
    getTreatmentDrugByStatus,
    updateTreatmentDrug,
    deleteTreatmentDrug
}
