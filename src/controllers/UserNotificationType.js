const Models = require('./../models');
const { checkRequiredFields } = require('./../utils/requestHandler');

// create a user notification type
const createOne = async (req, res) => {
  try {
    const UserNotifications = await Models.UserNotificationType.create({
      data: req.body,
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UserNotifications);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// get user notification type by id
const getOneById = async (req, res) => {
  try {
    checkRequiredFields(req, res, ['id'], 'GET');

    const configClient = {
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        User: true,
        NotificationType: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    };

    const UserNotificationById = await Models.UserNotificationType.findUnique(
      configClient
    );

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UserNotificationById);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// get all user notification type
const getAll = async (req, res) => {
  try {
    const UserNotification = await Models.UserNotificationType.findMany();

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UserNotification);
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

    const UserNotification = await Models.UserNotificationType.update(
      configClient
    );

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UserNotification);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// delete a user notification type
const deleteOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, ['id'], 'GET');

    const configClient = {
      where: {
        id: parseInt(req.params.id),
      },
    };

    const UserNotification = await Models.UserNotificationType.delete(
      configClient
    );

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UserNotification);
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
