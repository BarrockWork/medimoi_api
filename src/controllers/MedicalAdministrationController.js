// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');

const createMedicalAdministration = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        'nameSlug'
    ];

    // Get missing required fields.
    const missingValues = requiredFields.filter(fileld => !req.body[fileld])

    if(!isEmpty(missingValues)){
        return res.status(400).json({
            message: "Somes values are missings",
            value: missingValues
        })
    }

    try {
        const medicalAdministration = await Models.medicalAdministration.create({
            data: req.body
        });
        console.log(medicalAdministration);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            medicalAdministration
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const getMedicalAdministrationById = async (req, res) => {
    
    const {id} = req.params;
    try {
        const medicalAdministration = await Models.medicalAdministration.findUnique({
            where: {
                id: parseInt(id)
            },

            // you can include relation and elements like that.
            include:{
                Drugs:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(medicalAdministration);
        res.status(200).json({
            success: true,
            medicalAdministration
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

// get 
const getMedicalAdministrationBySlug = async (req, res) => {
    
    const {slug} = req.params;
    try {
        const medicalAdministration = await Models.medicalAdministration.findUnique({
            where: {
                nameSlug: slug
            },

            // you can include relation and elements like that.
            include:{
                Drugs:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(medicalAdministration);
        res.status(200).json({
            success: true,
            medicalAdministration
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getAllMedicalAdministrations = async (req, res) => {
    try {
        const medicalAdministrations = await Models.medicalAdministration.findMany({
            include:{
                Drugs:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })
        Models.$disconnect();
        console.log(medicalAdministrations);
        res.status(200).json({
            success: true,
            medicalAdministrations
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getMedicalAdministrationByStatus = async (req, res) => {
    const {isActive} = req.body
    try {
        const medicalAdministrations = await Models.medicalAdministration.findMany({
            where:{
                isActive
            },
            include:{
                Drugs:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        Models.$disconnect();
        console.log(medicalAdministrations);
        res.status(200).json({
            success: true,
            medicalAdministrations
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}


// Update function
const updateMedicalAdministration = async (req, res) => {
    const {id} = req.params;

    try {
        const medicalAdministration = await Models.medicalAdministration.update({
            where:{
                id: parseInt(id)
            },
            data:req.body
        });
        await Models.$disconnect();
        console.log(medicalAdministration);
        res.status(200).json({
            success: true,
            medicalAdministration
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

// Delete function
const deleteMedicalAdministration = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedMedicalAdministration = await Models.medicalAdministration.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        console.log(deletedMedicalAdministration);
        res.status(200).json({
            success: true,
            message: `Medical administration with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createMedicalAdministration,
    getMedicalAdministrationById,
    getMedicalAdministrationBySlug,
    getAllMedicalAdministrations,
    getMedicalAdministrationByStatus,
    updateMedicalAdministration,
    deleteMedicalAdministration
}
