const Models = require('./../models');

const getAllDisease = async(req, res) => {
    try {
        const disease = await Models.disease.findMany()
        console.log(disease);
        res.status(200).json(disease)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}


module.exports = {
    getAllDisease
}