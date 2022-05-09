const Models = require('./../models');
const {
  checkRequiredFields,
  extractFieldsToChange,
  transformIntValue,
  selectUserGlobalInfos,
  selectCompany,
  extractQueryParameters,
} = require('./../utils/requestHandler');
const { toLower } = require('ramda');

const createOne = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['company_id', 'user_id']);

    // Insert the userCompany
    const userCompany = await Models.UserCompany.create({
      data: {
        company_id: req.body.company_id,
        user_id: req.body.user_id,
      },
      include: {
        Company: selectCompany(),
        User: selectUserGlobalInfos(),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(userCompany);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const createMany = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['entries']);

    const usersComps = [];

    // Loop on the list of UserCompanies
    req.body.entries.forEach((contact) => {
      // Check the required fields
      checkRequiredFields(contact, res, ['company_id', 'user_id']);
      usersComps.push({
        company_id: contact.company_id,
        user_id: contact.user_id,
      });
    });

    const userCompanies = await Models.UserCompany.createMany({
      data: usersComps,
      skipDuplicates: true,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(userCompanies);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findOneById = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);
    const contact = await Models.UserCompany.findUnique({
      where: {
        id: id,
      },
      include: {
        Company: selectCompany(),
        User: selectUserGlobalInfos(),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contact);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const findByUserId = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);
    const userCompany = await Models.UserCompany.findUnique({
      where: {
        user_id: id,
      },
      include: {
        Company: selectCompany(),
        User: selectUserGlobalInfos(),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(userCompany);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const findAll = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, [
      'sort',
      'range',
      'filter',
    ]);

    const userCompanies = await Models.UserCompany.findMany(configClient);
    const totalCount = await Models.UserCompany.count(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Add to ResponseHeaders the totalcount
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    // Success Response
    res.status(200).json(userCompanies);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const findMany = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, ['filterMany']);
    const notificationsTypes = await Models.UserCompany.findMany(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(notificationsTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOne = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);

    // Selection of fields
    const onlyThoseFields = ['company_id', 'isActive'];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);
    // Check if the new slug exists
    const configRequestDB = {
      where: {
        id: id,
      },
      data: fieldsFiltered,
    };

    // Update the current entry
    const userCompanies = await Models.UserCompany.update(configRequestDB);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(userCompanies);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);

    const configClient = {
      where: {
        id: id,
      },
    };

    const userCompany = await Models.UserCompany.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(userCompany);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  createMany,
  findOneById,
  findAll,
  findMany,
  findByUserId,
  updateOne,
  deleteOne,
};
