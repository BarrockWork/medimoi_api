const Models = require('./../models');
const {
    checkRequiredFields,
    createSlug,
    extractFieldsToChange,
    verifySlugInDb,
} = require('./../utils/requestHandler');
const {extractQueryParameters, transformIntValue} = require("../utils/requestHandler");

// create a user type
const createOne = async (req, res) => {
    try {
        const reqName = req.body.name;

        const newType = await Models.AddressRoadType.create({
            data: {
                name: reqName,
                nameSlug: createSlug(reqName),
            },
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(newType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// get user type by nameSlug field
const getOneBySlug = async (req, res) => {
    try {
        checkRequiredFields(req, res, ['nameSlug'], 'GET');

        const configClient = {
            where: {
                nameSlug: req.params.nameSlug,
            },
        };

        const getBySlug = await Models.AddressRoadType.findUnique(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(getBySlug);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// get user type by id field
const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const addressType = await Models.AddressRoadType.findUnique({
            where: {
                id: parseInt(id)
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();
        res.status(200).json(addressType)
    } catch (error) {
        return res.status(400).json(error)
    }
};

// get all address types
const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const address_types = await Models.AddressRoadType.findMany(configClient)
        const totalCount = await Models.AddressRoadType.count();
        await Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        res.status(200).json(address_types);
    } catch (error) {
        res.status(400).json(error);
    }
}

const findMany = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['filterMany'])
        const address_types = await Models.AddressRoadType.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(address_types);
    } catch (error) {
        res.status(400).json(error);
    }
}


const updateOne = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseField = ['name'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseField);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            'AddressRoadType',
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered
        );

        const AddressType = await Models.AddressRoadType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(AddressType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

/* Update by id*/
const updateOneById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseField = ['name'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseField);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            'AddressRoadType',
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered
        );

        const AddressType = await Models.AddressRoadType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(AddressType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// delete a address type by nameSlug field
const deleteOne = async (req, res) => {
    try {
        const configClient = {
            where: {
                nameSlug: req.params.nameSlug,
            },
        };

        const AddressType = await Models.AddressRoadType.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(AddressType);
    } catch (error) {
        return res.status(400).json(error);
    }
};


// delete a address type by id
const deleteOneById = async (req, res) => {
    try {
        const id = transformIntValue(req.params.id);
        const configClient = {
            where: {
                id: id
            },
        };

        const AddressType = await Models.AddressRoadType.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(AddressType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    createOne,
    findAll,
    getOneBySlug,
    updateOne,
    updateOneById,
    deleteOne,
    deleteOneById,
    findMany,
    getOneById,
};
