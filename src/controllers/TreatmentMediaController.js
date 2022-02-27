// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');

const createTreatmentMedia = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        'mimeType', 
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
        const treatmentMedia = await Models.treatmentMedia.create({
            data: req.body
        });
        console.log(treatmentMedia);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            treatmentMedia
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const getTreatmentMediaById = async (req, res) => {
    
    const {id} = req.params;
    try {
        const treatmentMedia = await Models.treatmentMedia.findUnique({
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
                }
            }
        })

        await Models.$disconnect();
        console.log(treatmentMedia);
        res.status(200).json({
            success: true,
            treatmentMedia
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getAllTreatmentMedias = async (req, res) => {
    try {
        const treatmemtMedias = await Models.treatmentMedia.findMany({
            select: {
                id:true,
                name:true,
                isActive:true
            }
        })
        Models.$disconnect();
        console.log(treatmemtMedias);
        res.status(200).json({
            success: true,
            treatmemtMedias
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getTreatmentMediaByStatus = async (req, res) => {
    const {isActive} = req.body
    try {
        const treatmentMedias = await Models.treatmentMedia.findMany({
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
        console.log(treatmentMedias);
        res.status(200).json({
            success: true,
            treatmentMedias
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
const updateTreatmentMedia = async (req, res) => {
    const {id} = req.params;

    try {
        const treatmentMedia = await Models.treatmentMedia.update({
            where:{
                id: parseInt(id)
            },
            data:req.body
        });
        await Models.$disconnect();
        console.log(treatmentMedia);
        res.status(200).json({
            success: true,
            treatmentMedia
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
const deleteTreatmentMedia = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedTreatmentMedia = await Models.treatmentMedia.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        console.log(deletedTreatmentMedia);
        res.status(200).json({
            success: true,
            message: `Treatment media with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentMedia,
    getTreatmentMediaById,
    getAllTreatmentMedias,
    getTreatmentMediaByStatus,
    updateTreatmentMedia,
    deleteTreatmentMedia
}
