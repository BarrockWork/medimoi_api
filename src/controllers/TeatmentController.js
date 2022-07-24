// Import of the Prisma client
const { isEmpty } = require('ramda');
const Models = require('../models');
const uploadDir = process.env.UPLOAD_DIRECTORY;
const { transformIntValue, checkRequiredFields, selectDrugInfos, selectTreatmentDrugsInfos, selectTreatmentMediasInfos, selecttreatmentPeriodicityInfos, selectTreatmentGlobalInfos,
    extractQueryParameters,
    extractFieldsToChange
} = require('../utils/requestHandler');

const createOne = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name', "user_id", "treatment_periodicity_id", "startedAt"]);

        // Treatments
        const treatmemt = await Models.treatment.create({
            data:{
                name: req.body.name,
                user_id: transformIntValue(req.body.user_id),
                treatment_periodicity_id: transformIntValue(req.body.treatment_periodicity_id),
                startedAt: new Date(req.body.startedAt)
            }
        });

        //Treaments medias
        const mediaFiles = [];
        if(req.files !== undefined) {
            for (let i = 0; i < req.files.length; i++) {
                mediaFiles.push(
                    {
                        treatment_id: transformIntValue(treatmemt.id),
                        originalName: req.files[i].originalname,
                        fileName: req.files[i].filename,
                        fileSize: req.files[i].size,
                        filePath:'/' +uploadDir + req.files[i].filename,
                        mimeType: req.files[i].mimetype

                    }
                )
            }
        }

        if(mediaFiles.length > 0) {
            const treatmentMedias = await Models.treatmentMedia.createMany({
                data: mediaFiles
            });
        }

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        //Success response
        res.status(200).json(treatmemt);
    } catch (error) {
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
        res.status(400).json(error);
    }
}

const getTreatmentById = async (req, res) => {
    try {
        const { id } = req.params;
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

const findMany = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['filterMany'])
        const treatmemts = await Models.treatment.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(treatmemts);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getAllTreatments = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const treatmemts = await Models.treatment.findMany(configClient)
        const totalCount = await Models.treatment.count();
        Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        res.status(200).json(treatmemts);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateTreatment = async (req, res) => {
    try {
        const onlyThoseFields = ['name', 'startedAt', 'finishedAt', 'user_id', 'treatment_periodicity_id', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
        const mediaFiles = [];
        if(req.files !== undefined) {
            for (let i = 0; i < req.files.length; i++) {
                mediaFiles.push(
                    {
                        treatment_id: transformIntValue(req.params.id),
                        originalName: req.files[i].originalname,
                        fileName: req.files[i].filename,
                        fileSize: req.files[i].size,
                        filePath:'/' +uploadDir + req.files[i].filename,
                        mimeType: req.files[i].mimetype

                    }
                )
            }
        }

        //Treatment
        const treatment = await Models.treatment.update({
            where:{
                id: transformIntValue(req.params.id)
            },
            data:fieldsFiltered
        });

        //Treaments medias
        if(mediaFiles.length > 0) {
            const treatmentMedias = await Models.treatmentMedia.createMany({
                data: mediaFiles
            });
        }
        await Models.$disconnect();
        res.status(200).json(treatment);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Delete function
const deleteTreatment = async (req, res) => {
    const id = transformIntValue(req.params.id);
    
    try {
        const deletedTreatment = await Models.treatment.delete({
            where:{
                id
            }
        })
        await Models.$disconnect();
        res.status(200).json(`Treatment with id ${id} was deleted`);
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createOne,
    createMany,
    getTreatmentById,
    getAllTreatments,    
    updateTreatment,
    deleteTreatment,
    findMany
}
