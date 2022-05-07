const Models = require('./../models');
const {checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb} = require('./../utils/requestHandler')

const createDrug = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['name', 'description', 'isPrescription', 'drug_level_id', 'drug_type_id', 'medical_administration_id']);

        const drug = await Models.Drug.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
                isPrescription: req.body.isPrescription,
                drug_level_id: req.body.drug_level_id,
                drug_type_id: req.body.drug_type_id,
                medical_administration_id: req.body.medical_administration_id,
            }
        });

        await Models.$disconnect();
        res.status(200).json(drug);
    } catch (error) {
        return res.status(400).json(req);
    }

}

const createManyDrug = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyDrug = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(drugs => {
            // Check the required fields
            checkRequiredFields(
                drugs,
                res,
                ['name', 'description', 'isPrescription', 'drug_level_id', 'drug_type_id', 'medical_administration_id']
            );
            manyDrug.push({
                name: drugs.name,
                nameSlug: createSlug(drugs.name),
                description: drugs.description,
                isPrescription: drugs.isPrescription,
                drug_level_id: drugs.drug_level_id,
                drug_type_id: drugs.drug_type_id,
                medical_administration_id: drugs.medical_administration_id,
            })
        })

        const drugs = await Models.drug.createMany({
            data: manyDrug,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(drugs);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = extractFieldsToChange(req.query, ['sort', 'range', 'filter']);
        const drugs = await Models.drug.findMany(configClient)
        const totalCount = await Models.drug.count();
        
        await Models.$disconnect();
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount)
        res.status(200).json(drugs);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findMany = async (req, res) => {
    try{
        const configClient = extractFieldsToChange(req.query, ['filterMany']);
        const drugs = await Models.drug.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(drugs);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateBySlug = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description', 'isPrescription', 'isActive', 'drug_level_id', 'drug_type_id', 'medical_administration_id'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(Models,
            "Drug",
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const drug = await Models.drug.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(drug);
    }catch (error) {
        return res.status(400).json(error);
    }
}

const updateById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['name', 'description', 'isPrescription', 'isActive', 'drug_level_id', 'drug_type_id', 'medical_administration_id'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        const configRequestDB = await verifySlugInDb(Models,
            "Drug",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered);

        // Update the current entry
        const drug = await Models.drug.update(configRequestDB);
        await Models.$disconnect();

        res.status(200).json(drug);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const findBySlug = async (req, res) => {
    try {
        const drug = await Models.drug.findUnique({
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
    console.log(req.params.id)
    try {
        const drug = await Models.drug.findUnique({
            where: {
                id: parseInt(req.params.id),
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

const deleteBySlug = async (req, res) => {
    try {
        const deleteDrug = await Models.drug.delete({
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
        const deleteDrug = await Models.drug.delete({
            where: {
                id: parseInt(req.params.id),
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

module.exports = {
    createDrug,
    createManyDrug,
    deleteBySlug,
    findAll,
    findMany,
    findBySlug,
    updateBySlug,
    findById,
    deleteById,
    updateById,
}