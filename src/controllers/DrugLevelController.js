const Models = require('./../models');
const {checkRequiredFields, transformIntValue, extractFieldsToChange} = require('./../utils/requestHandler')

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
        res.status(200).json({
            success: true, drugLevel
        });
    } catch (error) {
        return res.status(400).json(req);
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


const getAllDrugLevel = async (req, res) => {
    try {
        const drugLevel = await Models.DrugLevel.findMany()
        await Models.$disconnect();
        res.status(200).json(drugLevel)
    } catch (error) {
        return res.status(400).json(req)
    }
}

const getById = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);
        const drugLevel = await Models.DrugLevel.findMany({
            where: {
                id: id
            },
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(drugLevel);
    } catch (error) {
        return res.status(400).json(req)
    }
}

const updateById = async (req, res) => {
    try {
        // Check and transform the param is a number
        const id = transformIntValue(req.params.id);

        // Selection of fields
        const onlyThoseFields = ['level', 'description', 'isActive'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
        // Check if the new slug exists
        const configRequestDB = {
            where: {
                id: id
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
    }catch (error) {
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
        return res.status(400).json(error)
    }
}


module.exports = {
    createDrugLevel,
    createManyDrugLevel,
    getAllDrugLevel,
    getById,
    updateById,
    deleteById,
}