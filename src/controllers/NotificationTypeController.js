const Models = require('./../models');
const {
  checkRequiredFields,
  createSlug,
  extractFieldsToChange,
  verifySlugInDb,
  extractQueryParameters,
  transformIntValue,
} = require('./../utils/requestHandler');
const { toLower } = require('ramda');

const getOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const notificationType = await Models.NotificationType.findUnique({
      where: {
        id: transformIntValue(id),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createOne = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['name']);

    // Insert the notification_type
    const notificationsType = await Models.NotificationType.create({
      data: {
        name: req.body.name,
        nameSlug: createSlug(req.body.name),
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationsType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createMany = async (req, res) => {
  try {
    // Check the required fields
    checkRequiredFields(req, res, ['entries']);

    const notifTypes = [];

    // Loop on the list of NotificationTypes
    req.body.entries.forEach((notificationType) => {
      // Check the required fields
      checkRequiredFields(notificationType, res, ['name']);
      notifTypes.push({
        name: notificationType.name,
        nameSlug: createSlug(notificationType.name),
      });
    });

    const notificationsTypes = await Models.NotificationType.createMany({
      data: notifTypes,
      skipDuplicates: true,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationsTypes);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findOneByNameSlug = async (req, res) => {
  try {
    const notificationType = await Models.NotificationType.findUnique({
      where: {
        nameSlug: req.params.nameSlug,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationType);
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

    const notificationsTypes = await Models.NotificationType.findMany(
      configClient
    );
    const totalCount = await Models.NotificationType.count(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Add to ResponseHeaders the totalcount
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', totalCount);
    // Success Response
    res.status(200).json(notificationsTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getMany = async (req, res) => {
  try {
    let configClient = extractQueryParameters(req.query, ['filterMany']);
    const notificationsTypes = await Models.NotificationType.findMany(
      configClient
    );

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
    // Selection of fields
    const onlyThoseFields = ['name', 'isActive'];
    const fieldsFiltered = extractFieldsToChange(req, res, onlyThoseFields);

    // Check if the new slug exists
    const configRequestDB = await verifySlugInDb(
      Models,
      'NotificationType',
      req.params.nameSlug,
      createSlug(req.body.name),
      fieldsFiltered
    );

    // Update the current entry
    const notificationType = await Models.NotificationType.update(
      configRequestDB
    );

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationType);
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

    const notificationType = await Models.NotificationType.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationType);
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

    const notificationType = await Models.NotificationType.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(notificationType);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createOne,
  createMany,
  findOneByNameSlug,
  getAll,
  getMany,
  getOneById,
  updateOne,
  deleteOneById,
  deleteOne,
};
