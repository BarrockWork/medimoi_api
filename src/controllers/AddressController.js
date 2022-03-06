const Models = require('./../models');
const { checkRequiredFields } = require('./../utils/requestHandler');

// create a user type
const createOne = async (req, res) => {
  try {
    const newType = await Models.Address.create({
      data: req.body,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(newType);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// get user type by nameSlug field
const getOneById = async (req, res) => {
  try {
    checkRequiredFields(req, res, ['id'], 'GET');

    const configClient = {
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        User: true,
        AddressRoadType: true,
      },
    };

    const getById = await Models.Address.findUnique(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(getById);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// get all user type
const getAll = async (req, res) => {
  try {
    const AddressType = await Models.Address.findMany({
      include: {
        User: true,
        AddressRoadType: true,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(AddressType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOne = async (req, res) => {
  try {
    // Request Select
    const configClient = {
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    };

    const AddressType = await Models.Address.update(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(AddressType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// delete a user type
const deleteOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, ['id'], 'GET');

    const configClient = {
      where: {
        id: parseInt(req.params.id),
      },
    };

    const AddressType = await Models.Address.delete(configClient);

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
  getAll,
  getOneById,
  updateOne,
  deleteOne,
};
