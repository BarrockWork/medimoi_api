const Models = require('./../models');
const {
  checkRequiredFields,
  selectUserGlobalInfos,
  selectAddressRoadType,
  transformIntValue,
  extractFieldsToChange,
} = require('./../utils/requestHandler');

// create a user type
const createOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, [
      'numberRoad',
      'streetName',
      'zipcode',
      'city',
      'region',
      'country',
      'title',
      'user_id',
      'address_road_type_id',
    ]);

    const newType = await Models.Address.create({
      data: {
        numberRoad: req.body.numberRoad,
        streetName: req.body.streetName,
        additionnalAddress: req.body.additionnalAddress,
        zipcode: req.body.zipcode,
        city: req.body.city,
        region: req.body.region,
        country: req.body.country,
        title: req.body.title,
        user_id: parseInt(req.body.user_id),
        address_road_type_id: req.body.address_road_type_id,
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
const getOneById = async (req, res) => {
  try {
    const configClient = {
      where: {
        id: transformIntValue(req.params.id),
      },
      include: {
        User: selectUserGlobalInfos(),
        AddressRoadType: selectAddressRoadType(),
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
    const onlyThoseFields = [
      'numberRoad',
      'name',
      'additionnalAddress',
      'zipcode',
      'city',
      'region',
      'country',
      'title',
      'user_id',
      'address_road_type_id',
    ];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
    const id = transformIntValue(req.params.id);

    const configClient = {
      where: {
        id: id,
      },
      data: fieldsFiltered,
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
    //check juste entier
    const id = transformIntValue(req.params.id);

    const configClient = {
      where: {
        id: id,
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
