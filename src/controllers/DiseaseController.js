const Models = require('./../models');
const {isEmpty, includes} = require("ramda");

const createDisease = async (req, res) => {

    // Array of required fields.
    const requiredFields = ['name', 'nameSlug', 'description', 'incubationPeriod', 'transmitting', 'isActive', 'disease_type_id'];

    // Get missing required fields.
    const missingValues = requiredFields.filter(fileld => !req.body[fileld])

    if (!isEmpty(missingValues)) {
        return res.status(400).json({
            message: "Somes values are missings", value: missingValues
        })
    }
    try {
        const disease = await Models.disease.create({
            data: req.body,
        });
        console.log(disease);

        await Models.$disconnect();
        res.status(200).json({
            success: true, disease
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(req);
    }
}

const findAll = async (req, res) => {
    try {
        const disease = await Models.disease.findMany()
        await Models.$disconnect();
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
        const updateDisease = await Models.disease.update({
            where: {
                nameSlug: req.params.nameSlug
            }, data: req.body
        });
        await Models.$disconnect();

        res.status(200).json({
            success: true, updateDisease
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error
        });
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
        console.log(error);
        return res.status(400).json(error)
    }
}

module.exports = {
    createDisease, findAll, findBySlug, updateBySlug, deleteBySlug
}