const Models = require('./../models');

const findAll = async (req, res) => {
    try{
        const plans = await Models.plan.findMany({})

        res.status(200).json(plans);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findById = async (req, res) => {
    try {
        const plan = await Models.plan.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(200).json(plan)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    findAll,
    findById,
}