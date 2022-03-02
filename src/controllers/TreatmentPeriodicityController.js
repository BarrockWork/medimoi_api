// Import of the Prisma client
const Models = require('../models');
const { isEmpty } = require('ramda');

const createTreatmentPeriodicity = async (req, res) => {

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
        const slug = slugify(nameSlug)

        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data: {
                name,
                nameSlug: slug
            }
        });
        console.log(treatmentPeriodicity);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            treatmentPeriodicity
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const createTreatmentPeriodicities = async (req, res) => {

    // Array of required fields.
    const requiredFields = [
        'name',
        // 'nameSlug' Optional
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

        const treatmentPeriodicities = await Models.treatmentPeriodicity.createMany({
            data:dataToStore
        });
        console.log(treatmentPeriodicities);

        // The prisma client can run only 10 instances simultaneously, 
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json({
            success: true,
            treatmentPeriodicities
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        });
    }

}

const getTreatmentPeriodicityById = async (req, res) => {
    
    const {id} = req.params;
    try {
        const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
            where: {
                id: parseInt(id)
            },

            // you can include relation and elements like that.
            include:{
                Treatments:{
                    select:{
                        id: true,
                        name:true,
                        isActive: true
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(treatmentPeriodicity);
        res.status(200).json({
            success: true,
            treatmentPeriodicity
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getTreatmentPeriodicityBySlug = async (req, res) => {
    
    const {slug} = req.params;
    try {
        const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
            where: {
                nameSlug: slug
            },

            // you can include relation and elements like that.
            include:{
                Treatments:{
                    select:{
                        id: true,
                        name:true,
                        isActive: true
                    }
                }
            }
        })

        await Models.$disconnect();
        console.log(treatmentPeriodicity);
        res.status(200).json({
            success: true,
            treatmentPeriodicity
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getAllTreatmentPeriodicities = async (req, res) => {
    try {
        const treatmemtPeriodicities = await Models.treatmentPeriodicity.findMany({
            include:{
                Treatments:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })
        Models.$disconnect();
        console.log(treatmemtPeriodicities);
        res.status(200).json({
            success: true,
            treatmemtPeriodicities
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        });
    }
}

const getTreatmentPeriodicityByStatus = async (req, res) => {
    const {isActive} = req.body
    try {
        const treatmemtPeriodicities = await Models.treatmentPeriodicity.findMany({
            where:{
                isActive
            },
            include:{
                Treatments:{
                    select:{
                        id:true,
                        name:true,
                        isActive:true
                    }
                }
            }
        })

        Models.$disconnect();
        console.log(treatmemtPeriodicities);
        res.status(200).json({
            success: true,
            treatmemtPeriodicities
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
const updateTreatmentPeriodicity = async (req, res) => {
    const {id} = req.params;

    try {
        const treatmentPeriodicity = await Models.treatmentPeriodicity.update({
            where:{
                id: parseInt(id)
            },
            data:req.body
        });
        await Models.$disconnect();
        console.log(treatmentPeriodicity);
        res.status(200).json({
            success: true,
            treatmentPeriodicity
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
const deleteTreatmentPeriodicity = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedTreatmentPeriodicity = await Models.treatmentPeriodicity.delete({
            where:{
                id: parseInt(id)
            }
        })
        await Models.$disconnect();
        console.log(deletedTreatmentPeriodicity);
        res.status(200).json({
            success: true,
            message: `Treatment periodicity with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

// Delete function by slug
const deleteTreatmentPeriodicityBySlug = async (req, res) => {
    const {slug} = req.params;

    try {
        const deletedTreatmentPeriodicity = await Models.treatmentPeriodicity.delete({
            where:{
                nameSlug: slug
            }
        })
        await Models.$disconnect();
        console.log(deletedTreatmentPeriodicity);
        res.status(200).json({
            success: true,
            message: `Treatment periodicity with slugName ${slug} was deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}

module.exports = {
    createTreatmentPeriodicity,
    createTreatmentPeriodicities,
    getTreatmentPeriodicityById,
    getTreatmentPeriodicityBySlug,
    getAllTreatmentPeriodicities,
    getTreatmentPeriodicityByStatus,
    updateTreatmentPeriodicity,
    deleteTreatmentPeriodicity,
    deleteTreatmentPeriodicityBySlug
}
