const Models = require('./../models');
const {
    checkRequiredFields,
    createSlug,
    extractFieldsToChange,
    verifySlugInDb,
} = require('./../utils/requestHandler');
const {extractQueryParameters} = require("../utils/requestHandler");

// create a user type
const createOne = async (req, res) => {
    try {
        const reqName = req.body.name;

        const newType = await Models.UserType.create({
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
        const configClient = {
            where: {
                nameSlug: req.params.nameSlug,
            },
        };

        const getBySlug = await Models.UserType.findUnique(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(getBySlug);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// get user type by Id
const getOneById = async (req, res) => {
    try {
        const configClient = {
            where: {
                id: req.params.id,
            },
        };

        const getById = await Models.UserType.findUnique(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(getById);
    } catch (error) {
        return res.status(400).json(error);
    }
};


const findMany = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['filterMany'])
        const User_type = await Models.UserType.findMany(configClient)
        await Models.$disconnect();

        res.status(200).json(User_type);
    } catch (error) {
        res.status(400).json(error);
    }
}

// get all user type
const findAll = async (req, res) => {
    try {
        const configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])
        const User_type = await Models.UserType.findMany(configClient)
        const totalCount = await Models.UserType.count();
        await Models.$disconnect();

        // Add to ResponseHeaders the totalcount
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        res.set('Content-Range', totalCount);
        res.status(200).json(User_type);
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
            'UserType',
            req.params.nameSlug,
            createSlug(req.body.name),
            fieldsFiltered
        );

        const User_type = await Models.UserType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(User_type);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const updateOneById = async (req, res) => {
    try {
        // Selection of fields
        const onlyThoseField = ['name'];
        const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseField);

        // Check if the new slug exists
        const configRequestDB = await verifySlugInDb(
            Models,
            "UserType",
            req.params.id,
            createSlug(req.body.name),
            fieldsFiltered
        );

        const User_type = await Models.UserType.update(configRequestDB);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(User_type);
    } catch (error) {
        return res.status(400).json(error);
    }
};


// delete a user type
const deleteOne = async (req, res) => {
    try {
        const configClient = {
            where: {
                nameSlug: req.params.nameSlug,
            },
        };

        const UsertType = await Models.UserType.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(UsertType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const createMany = async (req, res) => {
    try {
        // Check the required fields
        checkRequiredFields(req, res, ['entries']);

        const UserType = [];

        // Loop on the list of userTypes
        req.body.entries.forEach((userType) => {
            // Check the required fields
            checkRequiredFields(userType, res, ['name']);
            UserType.push({
                name: userType.name,
                nameSlug: createSlug(userType.name),
            });
        });

        const manyTypes = await Models.UserType.createMany({
            data: UserType,
            skipDuplicates: true,
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(manyTypes);
    } catch (error) {
        res.status(400).json(error);
    }
};

// delete a user type by ID
const deleteOneById = async (req, res) => {
    try {
        const configClient = {
            where: {
                id: req.params.id,
            },
        };

        const UserType = await Models.UserType.delete(configClient);

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        // Success Response
        res.status(200).json(UserType);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    createOne,
    createMany,
    findAll,
    getOneBySlug,
    getOneById,
    updateOne,
    updateOneById,
    deleteOne,
    deleteOneById,
    findMany,
};
