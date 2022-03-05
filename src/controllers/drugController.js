const Models = require('./../models');
const {isEmpty} = require("ramda");

const getAllDrug = async (req, res) => {
    try {
        const drug = await Models.drug.findMany()
        res.status(200).json(drug)
    } catch (error) {
        return res.status(400).json(req)
    }
}

const findBySlug = async (req, res) => {
    try {
        const drug = await Models.drug.findUnique({
            where: {
                nameSlug: req.params.nameSlug,
            },
        })
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
        res.status(200).json(deleteDrug)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    deleteBySlug,
    getAllDrug,
    findBySlug
}