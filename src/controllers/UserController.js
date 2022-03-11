const Models = require('./../models');
const { checkRequiredFields } = require('./../utils/requestHandler');
const { toLower } = require('ramda');

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
    console.log(error);
    return res.status(400).json({ error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    configClient = {
      include: {
        UserType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };

    // If param isActive is defined
    if (req.params.isActive) {
      if (toLower(req.params.isActive) === 'true') {
        configClient.where = {
          isActive: true,
        };
      }
      if (toLower(req.params.isActive) === 'false') {
        configClient.where = {
          isActive: false,
        };
      }
    }

    const allUsers = await Models.User.findMany(configClient);
    console.log(allUsers);
    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
};

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
    user_type_id;

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
    console.log(error);
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
};
