const Models = require('./../models');
const {
  checkRequiredFields,
  createSlug,
  extractFieldsToChange,
  extractQueryParameters,
  verifySlugInDb,
  transformIntValue,
} = require('./../utils/requestHandler');

const createOne = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['name']);

    // Insert the contact_type
    const contactType = await Models.ContactType.create({
      data: {
        name: req.body.name,
        nameSlug: createSlug(req.body.name),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createMany = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['entries']);

    const conTypes = [];

    // Loop on the list of Contact_types
    req.body.entries.forEach((contact_type) => {
      // Check the required fields
      checkRequiredFields(contact_type, res, ['name']);
      conTypes.push({
        name: contact_type.name,
        nameSlug: createSlug(contact_type.name),
      });
    });

    const contactTypes = await Models.ContactType.createMany({
      data: conTypes,
      skipDuplicates: true,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactTypes);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOneById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const contactType = await Models.ContactType.findUnique({
      where: {
        id: transformIntValue(id),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactType);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const findOneByNameSlug = async (req, res) => {
  try {
    const contactType = await Models.ContactType.findUnique({
      where: {
        nameSlug: req.params.nameSlug,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactType);
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

    const contactTypes = await Models.ContactType.findMany(configClient);
    const totalCount = await Models.ContactType.count(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Add to ResponseHeaders the totalcount
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    // Success Response
    res.status(200).json(contactTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getMany = async (req, res) => {
  try {
    const configClient = extractQueryParameters(req.query, ['filterMany']);
    const contactTypes = await Models.ContactType.findMany(configClient);
    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    res.status(200).json(contactTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOneById = async (req, res) => {
  try {
    // Selection of fields
    const onlyThoseFields = ['name', 'isActive'];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

    // Check if the Id I exists
    const configRequestDB = await verifySlugInDb(
      Models,
      'ContactType',
      req.params.id,
      req.body.name,
      fieldsFiltered
    );

    // Update the current entry
    const company = await Models.ContactType.update(configRequestDB);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(company);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOne = async (req, res) => {
  try {
    // Selection of fields
    const onlyThoseFields = ['name', 'isActive'];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

    // Check if the new slug exists
    const configRequestDB = await verifySlugInDb(
      Models,
      'ContactType',
      req.params.nameSlug,
      req.body.name,
      fieldsFiltered
    );

    // res.status(200).json(configRequestDB);
    // Update the current entry
    const Contact_type = await Models.ContactType.update(configRequestDB);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(Contact_type);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const configClient = {
      where: {
        id: transformIntValue(id),
      },
    };

    const contactType = await Models.ContactType.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const configClient = {
      where: {
        nameSlug: req.params.nameSlug,
      },
    };

    const contactType = await Models.ContactType.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(contactType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  createMany,
  findOneByNameSlug,
  updateOneById,
  getAll,
  getMany,
  getOneById,
  updateOne,
  deleteOne,
  deleteOneById,
};
