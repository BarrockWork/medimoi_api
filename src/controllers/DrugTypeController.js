const Models = require('./../models');
const {checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb} = require("../utils/requestHandler");

const createDrugType = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['name', 'description']);

        const DrugType = await Models.DrugType.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
            }
        });

        await Models.$disconnect();
        res.status(200).json(DrugType);
    } catch (error) {
        return res.status(400).json(req);
    }
}

const createManyDrugType = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyType = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(type => {
            // Check the required fields
            checkRequiredFields(
                type,
                res,
                ['name', 'description']
            );
            manyType.push({
                name: type.name,
                nameSlug: createSlug(type.name),
                description: type.description,
            })
        })

        const levels = await Models.DrugType.createMany({
            data: manyType,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(levels);
    } catch (error) {
        res.status(400).json(error);
    }
}

//find all drugs types
const findAll = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['sort', 'range', 'filter']);
        const DrugTypes = await Models.DrugType.findMany(configClient);
        const totalCount = await Models.DrugType.count();

        await Models.$disconnect();
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        res.status(200).json(DrugTypes)
    } catch (error) {
        return res.status(400).json(error)
    }
}

// find many drugs types
const findMany = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['filterMany']);
        const DrugTypes = await Models.DrugType.findMany(configClient);
        await Models.$disconnect();

        res.status(200).json(DrugTypes)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateBySlug = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "DrugType",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const drugType = await Models.DrugType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(drugType);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const updateById = async (req, res) => {
    try {
        const onlyThoseFields = ['name', 'description', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        const configClient = await verifySlugInDb(Models,
            "DrugType",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered);
        
        const drugType = await Models.DrugType.update(configClient);
        await Models.$disconnect();
        res.status(200).json(drugType);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findBySlug = async (req, res) => {
    try {
        const drug = await Models.DrugType.findUnique({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(200).json(drug)
    } catch (error) {
        return res.status(400).json(error)
    }
}

// find by id 
const findById = async (req, res) => {
    try {
        const drug = await Models.DrugType.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        })
        await Models.$disconnect();

        res.status(200).json(drug)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteBySlug = async (req, res) => {
    try {
        const deleteDrug = await Models.DrugType.delete({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(200).json(deleteDrug)
    } catch (error) {
        return res.status(400).json(error)
    }
}

// delete by id
const deleteById = async (req, res) => {
    try {
        const deleteDrug = await Models.DrugType.delete({
            where: {
                id: parseInt(req.params.id)
            },
        });
        
        await Models.$disconnect();
        res.status(200).json(deleteDrug)
    } catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = {
    createDrugType,
    createManyDrugType,
    findAll,
    findMany,
    updateBySlug,
    findBySlug,
    deleteBySlug,
    updateById,
    findById,
    deleteById
}