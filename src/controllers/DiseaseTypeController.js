const Models = require('./../models');
const {isEmpty} = require("ramda");


const createDiseaseType = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        'nameSlug',
        'description',
        'isActive',
    ];

    // Get missing required fields.
    const missingValues = requiredFields.filter(fileld => !req.body[fileld])

    if (!isEmpty(missingValues)) {
        return res.status(400).json({
            message: "Somes values are missings",
            value: missingValues
        })
    }

    try {
        const diseaseType = await Models.diseaseType.create({
            data: req.body,
        });
        console.log(diseaseType);

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
    createDiseaseType,
    getAllDiseaseType,
    findBySlug,
    deleteBySlug
}