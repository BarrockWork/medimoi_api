const { isEmpty } = require('ramda');
const Models = require('./../models');
const {transformBooleanValue} = require("../utils/requestHandler");

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

const getNbUserPlans = async (req, res) => {
    try {
      const totalCount = await Models.userPlan.count({
        where: {
          isActive: transformBooleanValue(req.params.isActive)
        }
      });
  
      // The prisma client can run only 10 instances simultaneously,
      // so it is better to stop the current instance before sending the response
      await Models.$disconnect();
  
      // Add to ResponseHeaders the totalcount
      res.status(200).json(totalCount);
    } catch (error) {
      return res.status(400).json(error);
    }
};

const getCa = async (req, res) => {
    try {
        const userPlans = await Models.userPlan.findMany({
            where: {
                isActive: true
            },
            select:{
                Plan:{
                    select:{
                        price:true
                    }
                }
            }
        })
        let ca = 0;
        userPlans.forEach((plan) => {
            ca += plan.Plan.price
        });
        res.status(200).json(ca.toFixed(2))
    } catch (error) {
        return res.status(400).json(error);
    }
}

const getLast = async (req, res) => {
    // console.log("hh")
    const nb = 10;
    try {
        const userPlans = await Models.userPlan.findMany({
            select:{
                User:{
                    select:{
                        lastName:true,
                        firstName:true,
                        email:true
                    }
                },
                Plan:{
                    select:{
                        name:true,
                        price:true,
                    }
                },
                billing_date:true,
                id:true
            },
            orderBy:{
                billing_date: "desc"
            },
        })
        res.status(200).json(userPlans.slice(0, nb))

    } catch (error) {
        return res.status(400).json(error);
    }
}

const getLastDays = async (req, res) => {
    const nb = parseInt(req.params.nbDay);
    let lastDay = Date.now() - (24 * 60 * 60 * 1000);
    lastDay = new Date(lastDay).toISOString();
    // console.log(lastDay, "1")
    // retirer 30 jours de la date courante
    let lastDay30 = new Date(lastDay).setDate(new Date(lastDay).getDate() - nb);
    lastDay30 = new Date(lastDay30).toISOString();
    // console.log(lastDay30, '2')
    try{
        const userPlans = await Models.userPlan.findMany({
            include: {
                Plan:{
                    select:{
                        name:true,
                        price:true
                    }
                },
                User:{
                    select:{
                        firstName:true,
                    }
                }
            },
            where:{
                billing_date:{
                    gte: lastDay30
                }
            }
        })

        // ranger les commande par groupe de date (billing_date)
        const groupedUserPlans = userPlans.reduce((acc, curr) => {
            const date = new Date(curr.billing_date).toISOString().split("T")[0];
            if(!acc[date]){
                acc[date] = [];
            }
            curr.date = date;
            acc[date].push(curr);
            return acc;
        }
        , {})

        // retourner les dates des commandes (billing_date)
        const dates = Object.keys(groupedUserPlans);
        // console.log(groupedUserPlans, "dates")

        // faire un tableau de commande par date avec le nmbre de commande
        const userPlansByDate = dates.map(date => {
            const userPlans = groupedUserPlans[date];
            const nb = userPlans.length;
            return {
                name: date,
                nombre: nb,
            }
        })

        // console.log(userPlansByDate, "userPlansByDate")
        res.status(200).json(userPlansByDate);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    findAll,
    findById,
    createUserPlan,
    getNbUserPlans,
    getCa,
    getLast,
    getLastDays
}