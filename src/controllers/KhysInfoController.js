const Models = require('./../models');
const {
  checkRequiredFields,
  transformIntValue,
  extractFieldsToChange,
  createSlug,
  extractQueryParameters,
} = require('./../utils/requestHandler');

// Create data for KhysInfo
const createOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, [
      'name',
      'phoneNumber',
      'email',
      'numberRoad',
      'streetName',
      'zipcode',
      'city',
      'region',
      'country',
      'siret',
      'tva',
      'address_road_type_id',
    ]);

    const newInfo = await Models.KhysInfo.create({
      data: {
        name: req.body.name,
        nameSlug: createSlug(req.body.name),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        numberRoad: req.body.numberRoad,
        streetName: req.body.streetName,
        additionnalAddress: req.body.additionnalAddress,
        zipcode: req.body.zipcode,
        city: req.body.city,
        region: req.body.region,
        country: req.body.country,
        siret: req.body.siret,
        tva: req.body.tva,
        address_road_type_id: req.body.address_road_type_id,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(newInfo);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Get 1 Id for KhysInfo
const getOneById = async (req, res) => {
  try {
    const configClient = {
      where: {
        id: transformIntValue(req.params.id),
      },
    };

    const getById = await Models.KhysInfo.findUnique(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(getById);
  } catch (error) {
    return res.status(400).json(error);
  }
};
//  Get All datas for KhysInfo
const getAll = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, [
      'sort',
      'range',
      'filter',
    ]);

    const KhysInfo = await Models.KhysInfo.findMany(configClient);
    const totalCount = await Models.KhysInfo.count(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    res.status(200).json(KhysInfo);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//Update 1 data for KhysInfo
const updateOne = async (req, res) => {
  try {
    const onlyThoseFields = [
      'name',
      'phoneNumber',
      'email',
      'numberRoad',
      'streetName',
      'zipcode',
      'city',
      'region',
      'country',
      'siret',
      'tva',
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

    const KhysInfo = await Models.KhysInfo.update(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(KhysInfo);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Delete 1 data for KhysInfo
const deleteOne = async (req, res) => {
  try {
    //check juste entier
    const id = transformIntValue(req.params.id);

    const configClient = {
      where: {
        id: id,
      },
    };

    const KhysInfo = await Models.KhysInfo.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(KhysInfo);
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
