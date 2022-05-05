const Models = require('./../models');
const {checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb, transformIntValue} = require('./../utils/requestHandler')


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
        res.status(200).json(diseaseType);
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


const findAll = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['sort', 'range', 'filter']);
        const diseaseTypes = await Models.diseaseType.findMany(configClient);
        const totalCount = await Models.diseaseType.count();

        await Models.$disconnect();
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.header('Content-Range', totalCount);
        res.status(200).json(diseaseTypes)
    } catch (error) {
        return res.status(400).json(req)
    }
}

const findMany = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['filterMany']);
        const diseaseTypes = await Models.diseaseType.findMany(configClient);
        await Models.$disconnect();

        res.status(200).json(diseaseTypes)
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

const findById = async (req, res) => {
    try {
        const diseaseType = await Models.diseaseType.findUnique({
            where: {
                id: transformIntValue(req.params.id),
            }
        });

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

const updateById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description','isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "DiseaseType",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const diseaseType = await Models.diseaseType.update(configRequestDB);

        await Models.$disconnect();
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

const deleteById = async (req, res) => {
    try {
        const deleteDiseaseType = await Models.diseaseType.delete({
            where: {
                id: transformIntValue(req.params.id),
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
    findAll,
    findBySlug,
    updateBySlug,
    deleteBySlug,
    findById,
    updateById,
    deleteById,
    findMany
}