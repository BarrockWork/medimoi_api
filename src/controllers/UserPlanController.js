const { isEmpty } = require('ramda');
const Models = require('./../models');

const createUserPlan = async (req, res) => {

    const {
        user, plan, sub
    } = req.body;

    const acceptedFields = ['user', 'plan', "sub"];
    const missingValues = acceptedFields.filter(fileld => !req.body[fileld])


    if(!isEmpty(missingValues)){
        return res.status(400).json({
            message: "Somes values are missings",
            value: missingValues
        })
    }

    try {
        const userPlan = await Models.userPlan.create({
            data:{
                user_id: user.id,
                plan_id: parseInt(plan),
                stripe_payment_intent: sub
            }
        })

        await Models.$disconnect()
        res.status(200).json(userPlan)
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error);
    }
}

const findAll = async (req, res) => {
    try{
        const userPlans = await Models.userPlan.findMany({})

        res.status(200).json(userPlans);
    } catch (error) {
        return res.status(400).json(error)
    }
}

const findById = async (req, res) => {
    try {
        const userPlan = await Models.userPlan.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        })

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        await Models.$disconnect();

        res.status(201).json(userPlan)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    findAll,
    findById,
    createUserPlan
}