const Models = require('./../models');

// Create a single user
const createOne = async (req, res) => {
  try {
    const newUser = await Models.User.create({
      data: req.body,
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
    const allUsers = await Models.User.findMany({
      include: {
        UserType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

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

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

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

module.exports = {
  createOne,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUser,
};
