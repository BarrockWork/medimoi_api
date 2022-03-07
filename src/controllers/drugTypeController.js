const Models = require('./../models');
const {checkRequiredFields, transformIntValue} = require('./../utils/requestHandler')
const {createSlug, extractFieldsToChange} = require("../utils/requestHandler");

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
        res.status(200).json({
            success: true, DrugType
        });
    } catch (error) {
        console.log(error);
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
        console.log(error)
        res.status(400).json(error);
    }
}


const getAllDrugType = async (req, res) => {
    try {
        const DrugType = await Models.DrugType.findMany()
        await Models.$disconnect();
        res.status(200).json(DrugType)
    } catch (error) {
        return res.status(400).json(req)
    }
}

const updateBySlug = async (req, res) => {
    try {
        const updateDrug = await Models.DrugType.update({
            where: {
                nameSlug: req.params.nameSlug
            }, data: req.body
        });
        await Models.$disconnect();

        res.status(200).json({
            success: true, updateDrug
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error
        });
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


module.exports = {
    createDrugType,
    createManyDrugType,
    getAllDrugType,
    updateBySlug,
    findBySlug,
    deleteBySlug,
}