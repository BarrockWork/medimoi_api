const Models = require('./../models');
const {isEmpty} = require("ramda");
const {checkRequiredFields, createSlug, extractFieldsToChange, verifySlugInDb} = require('./../utils/requestHandler')

const createDrug = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res,['name', 'description', 'isPrescription', 'drug_level_id', 'drug_type_id', 'medical_administration_id']);

        const drug = await Models.Drug.create({
            data:{
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
                isPrescription: req.body.isPrescription,
                isActive: req.body.isActive,
                drug_level_id: req.body.drug_level_id,
                drug_type_id: req.body.drug_type_id,
                medical_administration_id: req.body.medical_administration_id,
            }
        });

        await Models.$disconnect();
        res.status(200).json({
            success: true, drug
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(req);
    }

}

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
    createDrug,
    deleteBySlug,
    getAllDrug,
    findBySlug
}