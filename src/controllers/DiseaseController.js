const Models = require('./../models');
const {isEmpty, includes} = require("ramda");
const {checkRequiredFields, createSlug,} = require('./../utils/requestHandler')

const createDisease = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['name', 'description', 'incubationPeriod', 'transmitting', 'disease_type_id']);
        const disease = await Models.disease.create({
            data: {
                name: req.body.name,
                nameSlug: createSlug(req.body.name),
                description: req.body.description,
                incubationPeriod: req.body.incubationPeriod,
                transmitting: req.body.transmitting,
                disease_type_id: req.body.disease_type_id,
            }
        });

        await Models.$disconnect();
        res.status(200).json({
            success: true, disease
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(req);
    }
}

const createManyDisease = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyDisease = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(diseases => {
            // Check the required fields
            checkRequiredFields(
                diseases,
                res,
                ['name', 'description', 'incubationPeriod', 'transmitting', 'disease_type_id']
            );
            manyDisease.push({
                name: diseases.name,
                nameSlug: createSlug(diseases.name),
                description: diseases.description,
                incubationPeriod: diseases.incubationPeriod,
                transmitting: diseases.transmitting,
                disease_type_id: diseases.disease_type_id,
            })
        })

        const disease = await Models.disease.createMany({
            data: manyDisease,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(disease);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
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
    createDisease,createManyDisease, findAll, findBySlug, updateBySlug, deleteBySlug
}