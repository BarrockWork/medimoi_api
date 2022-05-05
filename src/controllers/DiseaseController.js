const Models = require('./../models');
const {checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb, transformIntValue} = require('./../utils/requestHandler')

const createDisease = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['name', 'description', 'incubationPeriod', 'transmitting', 'disease_type_id']);
        const disease = await Models.disease.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
                incubationPeriod: req.body.incubationPeriod,
                transmitting: req.body.transmitting,
                disease_type_id: req.body.disease_type_id,
            }
        });

        await Models.$disconnect();
        res.status(200).json(disease);
    } catch (error) {
        return res.status(400).json(req);
    }
}

const createManyDisease = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyDisease = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(diseases => {
            // Check the required fields
            checkRequiredFields(
                diseases,
                res,
                ['name', 'description', 'incubationPeriod', 'transmitting', 'disease_type_id']
            );
            manyDisease.push({
                name: diseases.name,
                nameSlug: createSlug(diseases.name),
                description: diseases.description,
                incubationPeriod: diseases.incubationPeriod,
                transmitting: diseases.transmitting,
                disease_type_id: diseases.disease_type_id,
            })
        })

        const disease = await Models.disease.createMany({
            data: manyDisease,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(disease);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['sort', 'range', 'filter']);
        const diseases = await Models.disease.findMany(configClient);
        const totalCount = await Models.disease.count();

        await Models.$disconnect();
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.header('Content-Range', totalCount);
        res.status(200).json(diseases)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findMany = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['filterMany']);
        const diseases = await Models.disease.findMany(configClient);
        await Models.$disconnect();

        res.status(200).json(diseases)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findBySlug = async (req, res) => {
    try {
        const disease = await Models.disease.findUnique({
            where: {
                nameSlug: req.params.nameSlug,
            }, include: {
                DiseaseType: true
            }
        })

        await Models.$disconnect();
        res.status(200).json(disease)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findById = async (req, res) => {
    try {
        const disease = await Models.disease.findUnique({
            where: {
                id: transformIntValue(req.params.id),
            }, include: {
                DiseaseType: true
            }
        })

        await Models.$disconnect();
        res.status(200).json(disease)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateBySlug = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description', 'incubationPeriod', 'transmitting', 'isActive', 'disease_type_id'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "Disease",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const disease = await Models.disease.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(disease);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description', 'incubationPeriod', 'transmitting', 'isActive', 'disease_type_id'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "Disease",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered);
        // Update the current entry
        const disease = await Models.disease.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(disease);
    } catch (error) {
        return res.status(400).json(error);
    }
}


const deleteBySlug = async (req, res) => {
    try {
        const deleteDisease = await Models.disease.delete({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })
        await Models.$disconnect();
        res.status(200).json(deleteDisease)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteById = async (req, res) => {
    try {
        const deleteDisease = await Models.disease.delete({
            where: {
                id: transformIntValue(req.params.id),
            },
        })
        await Models.$disconnect();
        res.status(200).json(deleteDisease)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    createDisease, createManyDisease, 
    findAll, findBySlug, updateBySlug, 
    deleteBySlug, findById, updateById,
    deleteById, findMany
}