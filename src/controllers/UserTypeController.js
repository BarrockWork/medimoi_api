const Models = require('./../models');
const slugify = require('slugify');

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

const getAll = async (req, res) => {
  try {
    const userTypes = await Models.UserType.findMany();
    res.status(200).json(userTypes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { createOne, getAll };
