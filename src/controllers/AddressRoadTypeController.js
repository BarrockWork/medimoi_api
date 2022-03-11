const Models = require('./../models');
const {
  checkRequiredFields,
  createSlug,
  extractFieldsToChange,
  verifySlugInDb,
} = require('./../utils/requestHandler');

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

// get all user type
const getAll = async (req, res) => {
  try {
    const AddressType = await Models.AddressRoadType.findMany();

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

// delete a user type
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

module.exports = {
  createOne,
  getAll,
  getOneBySlug,
  updateOne,
  deleteOne,
};