const Models = require('./../models');
const {isEmpty} = require("ramda");
const {checkRequiredFields, createSlug} = require('./../utils/requestHandler')
const {extractFieldsToChange, verifySlugInDb} = require("../utils/requestHandler");


const createDiseaseType = async (req, res) => {
    try {
        checkRequiredFields(req, res, ['name', 'description']);
        const diseaseType = await Models.diseaseType.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
            }
        });

        await Models.$disconnect();
        res.status(200).json({
            success: true,
            diseaseType
        });
    } catch (error) {
        return res.status(400).json(req);
    }
}

const createManyDiseaseType = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyDiseaseType = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(diseasesType => {
            // Check the required fields
            checkRequiredFields(
                diseasesType,
                res,
                ['name', 'description']
            );
            manyDiseaseType.push({
                name: diseasesType.name,
                nameSlug: createSlug(diseasesType.name),
                description: diseasesType.description
            })
        })

        const diseaseType = await Models.diseaseType.createMany({
            data: manyDiseaseType,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(diseaseType);
    } catch (error) {
        res.status(400).json(error);
    }
}


const getAllDiseaseType = async (req, res) => {
    try {
        const diseaseType = await Models.diseaseType.findMany()
        await Models.$disconnect();

        res.status(200).json(diseaseType)
    } catch (error) {
        return res.status(400).json(req)
    }
}

const findBySlug = async (req, res) => {
    try {
        const diseaseType = await Models.diseaseType.findUnique({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })
        await Models.$disconnect();
        res.status(200).json(diseaseType)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateBySlug = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description','isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "DiseaseType",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const diseaseType = await Models.diseaseType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(diseaseType);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const deleteBySlug = async (req, res) => {
    try {
        const deleteDiseaseType = await Models.diseaseType.delete({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })

        await Models.$disconnect();
        res.status(200).json(deleteDiseaseType)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    createDiseaseType,
    createManyDiseaseType,
    getAllDiseaseType,
    findBySlug,
    updateBySlug,
    deleteBySlug
}