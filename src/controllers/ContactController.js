const Models = require('./../models');
const {
  checkRequiredFields,
  extractFieldsToChange,
  transformIntValue,
  selectContactType,
  selectUserGlobalInfos,
  extractQueryParameters,
} = require('./../utils/requestHandler');
const { toLower } = require('ramda');

const createOne = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, [
      'firstName',
      'lastName',
      'phoneNumber',
      'contact_type_id',
      'user_id',
    ]);

    // Insert the contact
    const contact = await Models.Contact.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        contact_type_id: req.body.contact_type_id,
        user_id: req.body.user_id,
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

const createMany = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['entries']);

    const conts = [];

    // Loop on the list of Companies
    req.body.entries.forEach((contact) => {
      // Check the required fields
      checkRequiredFields(contact, res, [
        'firstName',
        'lastName',
        'phoneNumber',
        'contact_type_id',
        'user_id',
      ]);
      conts.push({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        contact_type_id: contact.contact_type_id,
        user_id: contact.user_id,
      });
    });

    const contacts = await Models.Contact.createMany({
      data: conts,
      skipDuplicates: true,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOneById = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);
    const contact = await Models.Contact.findUnique({
      where: {
        id: id,
      },
      include: {
        ContactType: selectContactType(),
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
    const contact = await Models.Contact.findMany({
      where: {
        user_id: id,
      },
      include: {
        ContactType: selectContactType(),
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

const getAll = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, [
      'sort',
      'range',
      'filter',
    ]);

    const contacts = await Models.Contact.findMany(configClient);
    const totalCount = await Models.Contact.count(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Add to ResponseHeaders the totalcount
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    // Success Response
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getMany = async (req, res) => {
  try {
    const configClient = extractQueryParameters(req.query, ['filterMany']);
    const contacts = await Models.Contact.findMany(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateOne = async (req, res) => {
  try {
    // Check and transform the param is a number
    const id = transformIntValue(req.params.id);

    // Selection of fields
    const onlyThoseFields = [
      'firstName',
      'lastName',
      'phoneNumber',
      'contact_type_id',
      'isActive',
    ];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

    // Check if the new slug exists
    const configRequestDB = {
      where: {
        id: id,
      },
      data: fieldsFiltered,
      include: {
        ContactType: selectContactType(),
        User: selectUserGlobalInfos(),
      },
    };

    // Update the current entry
    const contact = await Models.Contact.update(configRequestDB);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contact);
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

    const contact = await Models.Contact.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contact);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  createMany,
  getOneById,
  getAll,
  getMany,
  findByUserId,
  updateOne,
  deleteOne,
};
