// Import of the Prisma client
const Models = require('../models');
const { checkRequiredFields, transformIntValue, extractFieldsToChange, extractQueryParameters} = require('../utils/requestHandler');

const createTreatmentDrug = async (req, res) => {
    try {
        checkRequiredFields(req,res,["drug_id", "treatment_id"]);
        const treatmentDrug = await Models.treatmentDrug.create({
            data:req.body
        });

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json(treatmentDrug);
    } catch (error) {
        res.status(400).json(error);
    }
}

const createMany = async (req, res) => {
    try {
        checkRequiredFields(req, res, ["entries"]);

        const treatmemtDrugList = [];

        // Loop on the list of MedicalAdministrations
        req.body.entries.forEach( td => {
            // Check the required fields
            checkRequiredFields(td, res,['drug_id', "treatment_id"]);
            treatmemtDrugList.push(td)
        })

        const treatmentDrugs = await Models.treatmentDrug.createMany({
            data: treatmemtDrugList,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(treatmentDrugs);
    } catch (error) {
        res.status(400).json(error)
    }
}

const getTreatmentDrugById = async (req, res) => {
    try {
        const treatmentDrug = await Models.treatmentDrug.findUnique({
            where: {
                id: transformIntValue(req.params.id)
            },

            // you can include relation and elements like that.
            include:{
                Treatment:{
                    select:{
                        id: true,
                        name:true
                    }
                },
                Drug:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })

        await Models.$disconnect();
        res.status(200).json(treatmentDrug);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const treatmentDrugs = await Models.treatmentDrug.findMany(configClient)
        const totalCount = await Models.treatmentDrug.count();
        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response        
        await Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        // Success Response 
        res.status(200).json(treatmentDrugs);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findMany = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['filterMany'])
        const treatmentDrugs = await Models.treatmentDrug.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(treatmentDrugs);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Update function
const updateTreatmentDrug = async (req, res) => {
    try {
        // console.log(req.body)
        const onlyThoseFields = ['comments', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

        const treatmentDrug = await Models.treatmentDrug.update({
            where:{
                id: transformIntValue(req.params.id)
            },
            data:fieldsFiltered
        });
        
        await Models.$disconnect();
        res.status(200).json(treatmentDrug);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Delete function
const deleteTreatmentDrug = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedTreatmentDrug = await Models.treatmentDrug.delete({
            where:{
                id: transformIntValue(req.params.id)
            }
        })
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            message: `Treatment drug with id ${id} was deleted`
        });
    } catch (error) {
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentDrug,
    createMany,
    getTreatmentDrugById,
    findAll,
    findMany,
    updateTreatmentDrug,
    deleteTreatmentDrug
}
