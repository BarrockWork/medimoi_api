// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');
const { default: slugify } = require('slugify');

const createMedicalAdministration = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        // 'nameSlug' Optional
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
        let {nameSlug, name} = req.body;
        if(nameSlug === undefined){
            nameSlug = name;
        }
        
        // {remove: /[*+~.()'"!:@]/g} to remove special chart
        const slug = slugify(nameSlug, {remove: /[*+~.()'"!:@]/g})

        const medicalAdministration = await Models.medicalAdministration.create({
            data:{
                name,
                nameSlug: slug
            }
        });
        console.log(medicalAdministration);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            response: medicalAdministration
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const createMedicalAdministrations = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        // 'nameSlug' //Optional
    ];

    // Get missing required fields.
    const missingValues = [];
    const data = req.body;
    data.forEach((element, key) => {
        const fields = requiredFields.filter(fileld => !element[fileld])
        if(!isEmpty(fields)){
            missingValues.push({
                line: key+1,
                fields 
            })
        }
    });

    console.log(missingValues)

    if(!isEmpty(missingValues)){
        return res.status(400).json({
            message: "Somes values are missings",
            value: missingValues
        })
    }

    try {
        const data = req.body;
        // {remove: /[*+~.()'"!:@]/g} to remove special chart
        const dataToStore = data.filter((item) => item.nameSlug !== undefined ? item.nameSlug = slugify(item.nameSlug, {remove: /[*+~.()'"!:@]/g}) : item.nameSlug = slugify(item.name, {remove: /[*+~.()'"!:@]/g}))

        const medicalAdministrations = await Models.medicalAdministration.createMany({
            data:dataToStore
        });
        console.log(medicalAdministrations);

        // // The prisma client can run only 10 instances simultaneously, 
        // // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            response: medicalAdministrations
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
            response: medicalAdministration
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
            response: medicalAdministration
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
            response: medicalAdministrations
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
            response: medicalAdministrations
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
            response: medicalAdministration
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
            response: `Medical administration with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

// Delete function by slug
const deleteMedicalAdministrationBySlug = async (req, res) => {
    const {slug} = req.params;

    try {
        const deletedMedicalAdministration = await Models.medicalAdministration.delete({
            where:{
                nameSlug: slug
            }
        })
        await Models.$disconnect();
        console.log(deletedMedicalAdministration);
        res.status(200).json({
            success: true,
            response: `Medical administration with slug ${slug} was deleted.`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createMedicalAdministration,
    createMedicalAdministrations,
    getMedicalAdministrationById,
    getMedicalAdministrationBySlug,
    getAllMedicalAdministrations,
    getMedicalAdministrationByStatus,
    updateMedicalAdministration,
    deleteMedicalAdministration,
    deleteMedicalAdministrationBySlug,
}
