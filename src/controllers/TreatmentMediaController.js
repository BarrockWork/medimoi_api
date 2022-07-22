
// Import of the Prisma client
const Models = require('../models');
const {checkRequiredFields, extractFieldsToChange, transformIntValue} = require('../utils/requestHandler');
const Uploader = require('./../../config/uploader');
const path = require("path");
const uploadDir = process.env.UPLOAD_DIRECTORY;

const createTreatmentMedia = async (req, res) => {
   try {
        // Check the required fields
        checkRequiredFields(req, res, ['treatmentId']);
        const mediaFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            mediaFiles.push(
                {
                    treatment_id: transformIntValue(req.body.treatmentId),
                    originalName: req.files[i].originalname,
                    fileName: req.files[i].filename,
                    fileSize: req.files[i].size,
                    filePath:'/' +uploadDir + req.files[i].filename,
                    mimeType: req.files[i].mimetype

                }
            )
        }
        const treatmentMedias = await Models.treatmentMedia.createMany({
            data: mediaFiles
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success response
        res.status(200).json(treatmentMedias);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getTreatmentMediaById = async (req, res) => {
    try {
        const treatmentMedia = await Models.treatmentMedia.findUnique({
            where: {
                id: transformIntValue(req.params.id)
            },

            // you can include relation and elements like that.
            include:{
                Treatment:{
                    select:{
                        id: true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        await Models.$disconnect();
        res.status(200).json(treatmentMedia);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
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

        const treatmemtMedias = await Models.treatmentMedia.findMany(configClient)
        await Models.$disconnect();
        res.status(200).json(treatmemtMedias);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findManyByTreatmentId = async (req, res) => {
    try {
        const treatmentMedia = await Models.treatmentMedia.findMany({
            where:{
                treatment_id: transformIntValue(req.params.treatment_id)
            },
            // you can include relation and elements like that.
            include:{
                Treatment:{
                    select:{
                        id: true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        await Models.$disconnect();
        res.status(200).json(treatmentMedia);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Update function
const updateTreatmentMedia = async (req, res) => {
    try {
        const onlyThoseFields = ['name', 'isActive', 'mimeType'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
        const treatmentMedia = await Models.treatmentMedia.update({
            where:{
                id: transformIntValue(req.params.id)
            },
            data:fieldsFiltered
        });

        await Models.$disconnect();
        res.status(200).json(treatmentMedia);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Delete function
const deleteTreatmentMedia = async (req, res) => {
    const {id} = req.params;
    try {
        await Models.treatmentMedia.delete({
            where:{
                id: transformIntValue(req.params.id)
            }
        })
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            message: `Treatment media with id ${id} was deleted`
        });
    } catch (error) {
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentMedia,
    getTreatmentMediaById,
    updateTreatmentMedia,
    findAll,
    findManyByTreatmentId,
    deleteTreatmentMedia
}
