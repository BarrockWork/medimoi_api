const Models = require('./../models');
const slugify = require('slugify');

// create a user type
const createOne = async (req, res) => {
  try {
    const { name: reqName, nameSlug: reqNameSlug } = req.body;

    // Initialize slug name
    const nameSlug = reqNameSlug
      ? reqNameSlug
      : slugify(reqName, { lower: true });

    const newType = await Models.UserType.create({
      data: {
        name: reqName,
        nameSlug: nameSlug,
      },
    });
    res.status(200).json(newType);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// find user type by the field nameSlug
const getOneBySlug = async (req, res) => {
  try {
    const getBySlug = await Models.UserType.findUnique({
      where: {
        nameSlug: req.params.nameSlug,
      },
    });
    res.status(200).json(getBySlug);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// get all user type
const getAllUserType = async (req, res) => {
  try {
    const userTypes = await Models.UserType.findMany();
    res.status(200).json(userTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//  const updateUserType = async (req, res) => {
//    try{
//      const updateUserType = await Models.UserType.update({
//        where: {
//          nameSlug: req.params.nameSlug,
//        },
//        data: req.body,
//      })
//    }
//  }

// const deleteUserType = async (req, res) => {
//   console.log(req.params);
//   try {
//     const deleteUser = await Models.UserType.delete({
//       where: {
//         nameSlug: req.params.nameSlug,
//       },
//     });
//     res.status(200).json(deleteUser);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

module.exports = {
  createOne,
  getAllUserType,
  getOneBySlug,
};
