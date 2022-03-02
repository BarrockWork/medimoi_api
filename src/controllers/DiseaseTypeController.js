const Models = require('./../models');
const {isEmpty} = require("ramda");

const getAllDiseaseType = async (req, res) => {
    try {
        const diseaseType = await Models.diseaseType.findMany()
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
        console.log(diseaseType);
        res.status(200).json(diseaseType)
    } catch (error) {
        console.log(req.params.nameSlug);
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
        console.log(deleteDiseaseType);
        res.status(200).json(deleteDiseaseType)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllDiseaseType,
    findBySlug,
    deleteBySlug
}