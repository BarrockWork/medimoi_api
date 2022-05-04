const Models = require('./../models');

const getClientByEmail = async (req, res) => {
    try {
        const client = await Models.user.findMany()
        res.status(200).json(client)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    getClientByEmail
}