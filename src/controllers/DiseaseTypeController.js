const Models = require('./../models');
const {isEmpty} = require("ramda");
const {checkRequiredFields, createSlug} = require('./../utils/requestHandler')


const createDiseaseType = async (req, res) => {
    try {
        checkRequiredFields(req, res, ['name', 'description']);
        const diseaseType = await Models.diseaseType.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
                isActive: req.body.isActive,
            }
        });

        await Models.$disconnect();
        res.status(200).json({
            success: true,
            diseaseType
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(req);
    }
}

const getAllDiseaseType = async (req, res) => {
    try {
        const diseaseType = await Models.diseaseType.findMany()
        await Models.$disconnect();

        res.status(200).json(diseaseType)
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return res.status(400).json(error)
    }
}

const updateBySlug = async (req, res) => {
    try {
        const updateDiseaseType = await Models.diseaseType.update({
            where: {
                nameSlug: req.params.nameSlug
            }, data: req.body
        });
        await Models.$disconnect();

        res.status(200).json({
            success: true, updateDiseaseType
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
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
        console.log(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    createDiseaseType,
    getAllDiseaseType,
    findBySlug,
    updateBySlug,
    deleteBySlug
}