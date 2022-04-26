const Models = require('./../models');
const { checkRequiredFields } = require('./../utils/requestHandler');
const { toLower } = require('ramda');
const {extractQueryParameters} = require("../utils/requestHandler");

// Create a single user
const createOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, [
      'firstName',
      'lastName',
      'age',
      'email',
      'password',
      'cellphone',
      'homephone',
      'role',
      'user_type_id',
    ]);

    const newUser = await Models.User.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age),
        email: req.body.email,
        password: req.body.password,
        cellphone: req.body.cellphone,
        homephone: req.body.homephone,
        role: req.body.role,
        user_type_id: req.body.user_type_id,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json({ newUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, ['sort', 'range', 'filter'])

    // Select some usertype fields to include
    configClient.include = {
      UserType: {
        select: {
          id: true,
          name: true,
        },
      },
    };

    const allUsers = await Models.User.findMany(configClient);
    const totalCount = await Models.User.count();

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Add to ResponseHeaders the totalcount
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const findMany = async (req, res) => {
  try {
    const configClient = extractQueryParameters(req.query, ['filterMany'])
    const users = await Models.User.findMany(configClient)
    await Models.$disconnect();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Get a user by email
const getUserByEmail = async (req, res) => {
  try {
    const userById = await Models.User.findUnique({
      where: {
        email: req.params.email,
      },
      // you can include relation and elements like that.
      include: {
        UserType: true,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(userById);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Update a user
const updateUserByEmail = async (req, res) => {
  try {
    const updateUser = await Models.User.update({
      where: {
        email: req.params.email,
      },
      data: req.body,
    });

    res.status(200).json(updateUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Delete a user
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await Models.User.delete({
      where: {
        email: req.params.email,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(deleteUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createMany = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['entries']);

    const Users = [];

    // Loop on the list of userTypes
    req.body.entries.forEach((users) => {
      // Check the required fields
      checkRequiredFields(users, res, [
        'firstName',
        'lastName',
        'age',
        'email',
        'password',
        'cellphone',
        'homephone',
        'role',
        'user_type_id',
      ]);
      Users.push({
        firstName: users.firstName,
        lastName: users.lastName,
        age: parseInt(users.age),
        email: users.email,
        password: users.password,
        cellphone: users.cellphone,
        homephone: users.homephone,
        role: users.role,
        user_type_id: users.user_type_id,
      });
    });

    const users = await Models.User.createMany({
      data: Users,
      skipDuplicates: true,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  createMany,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUser,
  findMany
};
