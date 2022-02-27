const Models = require('./../models');

// Create an address
const createAddress = async (req, res) => {
  try {
    const newAddress = await Models.address.create({
      data: req.body,
    });
    res.status(200).json(newAddress);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Get an address
const getUserAddress = async (req, res) => {
  try {
    const getAddress = await Models.address.findMany({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(getAddress);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Update an address
const updateUserAddress = async (req, res) => {
  try {
    const updateAddress = await Models.address.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });
    res.status(200).json(updateUserAddress);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete an address
const deleteUserAddress = async (req, res) => {
  try {
    const deleteAddress = await Models.address.delete({
      where: {
        id: req.body,
      },
    });
    res.status(200).json(deleteAddress);
  } catch (error) {
    return res.status(400).json(error);
  }
};
