const Models = require('../src/models');

// importation des fixtures
const medical_administrations = require('./fixtures/medical_administration');
const user_types = require('./fixtures/user_type');
const users = require('./fixtures/user');
const diseaseTypes = require('./fixtures/disease_type');
const diseases = require('./fixtures/disease');
const addressRoadTypes = require('./fixtures/address_road_type');
const notificationsTypes = require('./fixtures/notification_type');
const treatmentsPeriodicity = require('./fixtures/treatment_periodicity');
const contactTypes = require('./fixtures/contact_type');
const drugLevels = require('./fixtures/drug_levels');
const drugTypes = require('./fixtures/drug_types');
const drugs = require('./fixtures/drugs');
const planPeriodicities = require('./fixtures/plan_periodicity');
const plan = require('./fixtures/plan');


async function main() {

    // creation medical administrations
    try {
        await Models.medicalAdministration.createMany({
            data: medical_administrations
        })
    } catch (error) {
        console.error(error)
    }

    // notification_type
    try {
        await Models.NotificationType.createMany({
            data: notificationsTypes
        })
    } catch (error) {
        console.error(error)
    }

    // création des différentes périodes d'abonnements et création d'un abonnement
    try {
        await Models.PlanPeriodicity.createMany({
            data: planPeriodicities
        })
        const getMonthlyPlan = await Models.PlanPeriodicity.findUnique({
            where: {
                id: 1,
            }
        });
        try {
            plan.map(async (data) => {
                await Models.plan.create({
                    data: {
                        name: data.name,
                        nameSlug: data.nameSlug,
                        price: data.price,
                        stripe_price: data.stripe_price,
                        plan_periodicity_id: getMonthlyPlan.id,
                    }
                });
                await Models.$disconnect();
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.error(error)
    }

    // treatment_periodicity
    try {
        await Models.treatmentPeriodicity.createMany({
            data: treatmentsPeriodicity
        })
    } catch (error) {
        console.error(error)
    }


    // creation contact types
    try {
        await Models.contactType.createMany({
            data: contactTypes,
        });
    } catch (error) {
        console.error(error)
    }
    // creation des user types
    try {
        const user_type = await Models.userType.createMany({
            data: user_types,
        })

        const user_type_id = await Models.userType.findFirst();

        try {
            users.map(async (data) => {
                await Models.user.create({
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        email: data.email,
                        password: data.password,
                        role: data.role,
                        cellphone: data.cellphone,
                        homephone: data.homephone,
                        workphone: data.workphone,
                        user_type_id: user_type_id.id
                    }
                });

                await Models.$disconnect();
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }

    // creation address road types & address
    try {
        const address_road_type_saved = await Models.addressRoadType.createMany({
            data: addressRoadTypes,
        })
    } catch (error) {
        console.log(error)
    }

    try {
        await Models.diseaseType.createMany({
            data: diseaseTypes,
        });
    } catch (error) {
        console.log(error)
    }

    // creation des diseases
    try {
        const disease_type_saved = await Models.diseaseType.findFirst();
        diseases.map(async (data) => {
            await Models.disease.create({
                data: {
                    name: data.name,
                    nameSlug: data.nameSlug,
                    description: data.description,
                    incubationPeriod: data.incubationPeriod,
                    transmitting: data.transmitting,
                    disease_type_id: disease_type_saved.id,
                }
            });

            await Models.$disconnect();
        })
    } catch (error) {
        console.log(error)
    }

    // creation des drugs & drugs_types & drugs_levels
    try {
        const drug_level = await Models.drugLevel.createMany({
            data: drugLevels,
        });

        const drug_type = await Models.drugType.createMany({
            data: drugTypes,
        });

        const getMedicalAdministration = await Models.MedicalAdministration.findUnique({
            where: {
                id: 1,
            }
        });

        const drug_type_saved = await Models.drugType.findFirst();
        const drug_level_saved = await Models.drugLevel.findFirst();


         try {
             drugs.map(async (data) => {
                 await Models.drug.create({
                     data: {
                         name: data.name,
                         nameSlug: data.nameSlug,
                         description: data.description,
                         isPrescription: data.isPrescription,
                         drug_type_id: drug_type_saved.id,
                         drug_level_id: drug_level_saved.id,
                         medical_administration_id: getMedicalAdministration.id,
                     }
                 });

                 await Models.$disconnect();
             })
         } catch (error) {
             console.log(error)
         }
    } catch (error) {
        console.log(error)
    }


}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await Models.$disconnect();
    })

