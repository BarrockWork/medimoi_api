const Models = require('./../models');
const {checkRequiredFields, transformIntValue, extractFieldsToChange, extractQueryParameters} = require('./../utils/requestHandler')

const createDrugLevel = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['level', 'description']);

        const drugLevel = await Models.DrugLevel.create({
            data: {
                level: req.body.level,
                description: req.body.description,
            }
        });

        await Models.$disconnect();
        res.status(200).json(drugLevel);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const createManyDrugLevel = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const manyLevel = [];

        // Loop on the list of UserCompanies
        req.body.entries.forEach(level => {
            // Check the required fields
            checkRequiredFields(
                level,
                res,
                ['level', 'description']
            );
            manyLevel.push({
                level: level.level,
                description: level.description,
            })
        })

        const levels = await Models.DrugLevel.createMany({
            data: manyLevel,
            skipDuplicates: true
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(levels);
    } catch (error) {
        res.status(400).json(error);
    }
}


const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter']);
        const drugLevel = await Models.DrugLevel.findMany(configClient);
        const totalCount = await Models.DrugLevel.count();

        await Models.$disconnect();
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.header('Content-Range', totalCount);
        res.status(200).json(drugLevel)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findMany = async (req, res) => {
    try{
        const configClient = extractQueryParameters(req.query, ['filterMany']);
        const drugLevel = await Models.DrugLevel.findMany(configClient);
        await Models.$disconnect();

        res.status(200).json(drugLevel)
    } catch(error){
        return res.status(400).json(error)
    }
}

const getById = async (req, res) => {
    try {
        const drugLevel = await Models.DrugLevel.findUnique({
            where: {
                id: transformIntValue(req.params.id),
            },
        });

        await Models.$disconnect();

        res.status(200).json(drugLevel);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseFields = ['level', 'description', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
        // Check if the new slug exists
        const configRequestDB = {
            where: {
                id: transformIntValue(req.params.id),
            },
            data: fieldsFiltered
        };

        // Update the current entry
        const drugLevels = await Models.drugLevel.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(drugLevels);
    } catch (error) {
        return res.status(400).json(error);
    }
}


const deleteById = async (req, res) => {
    try {
        const id = transformIntValue(req.params.id);
        const deleteDrugLevel = await Models.DrugLevel.delete({
            where: {
                id: id,
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(200).json(deleteDrugLevel)
    } catch (error) {
        // console.log(error.code)
        // if(error.code === 'P2003'){
        //     return res.status(400).json({
        //         message: 'cet enregistrement est lié à un autre enregistrement, vous ne pouvez pas le supprimer',
        //         error: error
        //     })
        // }
        return res.status(400).json(error)
    }
}


module.exports = {
    createDrugLevel,
    createManyDrugLevel,
    findAll,
    findMany,
    getById,
    updateById,
    deleteById,
}