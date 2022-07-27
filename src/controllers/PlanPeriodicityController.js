const Models = require('../models');

const findAll = async (req, res) => {
    try{
        const planPeriodicities = await Models.planPeriodicity.findMany({})

        res.status(200).json(planPeriodicities);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findById = async (req, res) => {
    try {
        const planPeriodicity = await Models.planPeriodicity.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(200).json(planPeriodicity)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    findAll,
    findById,
}