const Models = require('./../models');
const {isEmpty, includes} = require("ramda");

const findAll = async (req, res) => {
    try {
        const disease = await Models.disease.findMany()
        res.status(200).json(disease)
    } catch (error) {
        console.log(error);
        return res.status(400).json(req)
    }
}

const findBySlug = async (req, res) => {
    try {
        const disease = await Models.disease.findUnique({
            where: {
                nameSlug: req.params.nameSlug,
            },
            include:{
                DiseaseType: true
            }
        })

        console.log(disease);
        res.status(200).json(disease)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

const deleteBySlug = async (req, res) => {
    try {
        const deleteDisease = await Models.disease.delete({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })
        console.log(deleteDisease);
        res.status(200).json(deleteDisease)
    }catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}


module.exports = {
    findAll,
    findBySlug,
    deleteBySlug
}