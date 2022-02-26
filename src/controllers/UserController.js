const Models = require('./../models');


// Create a single user
const createOne = async (req, res) => {
  try {
    const newUser = await Models.user.create({
      data: req.body,
    });
    res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Models.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Get a user by Id
const getUserById = async (req, res) => {
  try {
    const userById = await Models.user.findUnique({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(userById);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Update a user
const updateUserByid = async (req, res) => {
  try {
    const updateUser = await Models.user.update({
      where: {
        id: req.body.id,
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
    const deleteUser = await Models.user.delete({
      where: {
        id: req.body,
      },
    });
    res.status(200).json(deleteUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  getAllUsers,
  getUserById,
  updateUserByid,
  deleteUser
};
