const Models = require('./../models');
const {
  checkRequiredFields,
  selectUserGlobalInfos,
  selectNotificationType,
  transformIntValue,
} = require('./../utils/requestHandler');

// create a user notification type
const createOne = async (req, res) => {
  try {
    checkRequiredFields(req, res, ['user_notification_type_id']);
    const Notification = await Models.NotificationHistory.create({
      data: {
        user_notification_type_id: req.body.user_notification_type_id,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(Notification);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// get user notification type by id
const getOneById = async (req, res) => {
  try {
    const id = transformIntValue(req.params.id);
    const configClient = {
      where: {
        id: id,
      },
      include: {
        UserNotificationType: {
          include: {
            User: selectUserGlobalInfos(),
            NotificationType: selectNotificationType(),
          },
        },
      },
    };

    const getById = await Models.NotificationHistory.findUnique(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(getById);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// get all user notification type
const getAll = async (req, res) => {
  try {
    const UserNotification = await Models.NotificationHistory.findMany();

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
    const id = transformIntValue(req.params.id);
    checkRequiredFields(req, res, ['user_notification_type_id']);

    // Request Select
    const configClient = {
      where: {
        id: id,
      },
      data: {
        user_notification_type_id: req.body.user_notification_type_id,
      },
    };

    const UpdateNotification = await Models.NotificationHistory.update(
      configClient
    );

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(UpdateNotification);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// delete a user notification type
const deleteOne = async (req, res) => {
  try {
    const id = transformIntValue(req.params.id);

    const configClient = {
      where: {
        id: id,
      },
    };

    const Notification = await Models.NotificationHistory.delete(configClient);

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    await Models.$disconnect();

    // Success Response
    res.status(200).json(Notification);
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
