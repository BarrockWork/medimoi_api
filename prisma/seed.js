const Models = require('../src/models');

// importation des fixtures
const medical_administrations = require('./fixtures/medical_administration');
const user_types = require('./fixtures/user_type');
const users = require('./fixtures/user');
const diseaseTypes = require('./fixtures/disease_type');
const diseases = require('./fixtures/disease');
const addressRoadTypes = require('./fixtures/address_road_type');
const address = require('./fixtures/address');
const notificationsTypes = require('./fixtures/notification_type');
const treatmentsPeriodicity = require('./fixtures/treatment_periodicity');
const company = require('./fixtures/company');
const contacts = require('./fixtures/contact');
const contactTypes = require('./fixtures/contact_type');
const drugLevels = require('./fixtures/drug_levels');
const drugTypes = require('./fixtures/drug_types');
const drugs = require('./fixtures/drugs');
const userNotificationTypes = require('./fixtures/user_notification_type');
const userCompanys = require('./fixtures/user_company');
const notifactionHistories = require('./fixtures/notification_history');
const treatments = require('./fixtures/treatment');
const treatmentDrugs = require('./fixtures/treatment_drug');
const treatmentMedias = require('./fixtures/treatment_media');

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

    // treatment_periodicity
    try {
        await Models.treatmentPeriodicity.createMany({
            data: treatmentsPeriodicity
        })
    } catch (error) {
        console.error(error)
    }

    // company
    try {
        await Models.company.createMany({
            data: company
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
        const user_type_saved = await Models.userType.create({
            data: user_types[0],
        })

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
                        user_type_id: user_type_saved.id
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
        const address_road_type_saved = await Models.addressRoadType.create({
            data: addressRoadTypes[0],
        })
        const getUser = await Models.User.findFirst();
        try {
            address.map(async (data) => {
                await Models.address.create({
                    data: {
                        numberRoad: data.numberRoad,
                        streetName: data.streetName,
                        zipcode: data.zipcode,
                        city: data.city,
                        region: data.region,
                        country: data.country,
                        title: data.title,
                        address_road_type_id: address_road_type_saved.id,
                        user_id: getUser.id
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

    // creation des diseases & diseases_types
    try {
        const disease_type_saved = await Models.diseaseType.create({
            data: diseaseTypes[0],
        });

        try {
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
    } catch (error) {
        console.log(error)
    }

    // creation des drugs & drugs_types & drugs_levels
    try {
        const drug_level_saved = await Models.drugLevel.create({
            data: drugLevels[0],
        });

        const drug_type_saved = await Models.drugType.create({
            data: drugTypes[0],
        });

        const getMedicalAdministration = await Models.MedicalAdministration.findUnique({
            where: {
                id: 1,
            }
        });

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

    // creation contact
    try {
        const getContactType = await Models.contactType.findUnique({
            where: {
                id: 1,
            }
        });

        const getUser = await Models.user.findUnique({
            where: {
                id: 1,
            }
        });
        contacts.map(async (data) => {
            await Models.contact.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    user_id: getUser.id,
                    contact_type_id: getContactType.id,
                }
            });

            await Models.$disconnect();
        })
    } catch (error) {
        console.error(error)
    }

    // creation user_notification_type
    try {
        const getUser = await Models.user.findUnique({
            where: {
                id: 1,
            }
        });
        const getNotificationType = await Models.notificationType.findUnique({
            where: {
                id: 1,
            }
        });

        userNotificationTypes.map(async (data) => {
            await Models.UserNotificationType.create({
                data: {
                    user_id: getUser.id,
                    notification_type_id: getNotificationType.id,
                }
            });
            await Models.$disconnect();
        });

    } catch (error) {
        console.error(error)
    }

    // creation user_comapny
    try {
        const getUser = await Models.user.findUnique({
            where: {
                id: 1,
            }
        });
        const getCompany = await Models.company.findUnique({
            where: {
                id: 1,
            }
        });

        userCompanys.map(async (data) => {
            await Models.UserCompany.create({
                data: {
                    user_id: getUser.id,
                    company_id: getCompany.id,
                }
            });
            await Models.$disconnect();
        });

    } catch (error) {
        console.error(error)
    }

    // creation notification_history
    try {
        const getUserNotificationType = await Models.UserNotificationType.findFirst();
        notifactionHistories.map(async (data) => {
            await Models.notificationHistory.createMany({
                data: {
                    user_notification_type_id: getUserNotificationType.id,
                }
            });
            await Models.$disconnect();
        });

    } catch (error) {
        console.error(error)
    }

    // creation treatment
    try {
        const getUser = await Models.user.findFirst();
        const getTreatmentPeriodicity = await Models.treatmentPeriodicity.findFirst();

        treatments.map(async (data) => {
            await Models.treatment.create({
                data: {
                    user_id: getUser.id,
                    treatment_periodicity_id: getTreatmentPeriodicity.id,
                    name: data.name,
                    startedAt: data.startedAt,
                    finishedAt: data.finishedAt,
                }
            });
            await Models.$disconnect();
        });
    } catch (error) {
        console.error(error)
    }

    // creation treatment_drug
    try {
        const getTreatment = await Models.treatment.find;
        const getDrug = await Models.drug.findFirst();

        treatmentDrugs.map(async (data) => {
            await Models.TreatmentDrug.create({
                data: {
                    treatment_id: getTreatment.id,
                    drug_id: getDrug.id,
                    comments: data.comments,
                }
            });
            await Models.$disconnect();
        });
    } catch (error) {
        console.error(error)
    }

    // creation treatment_media
    try {
        const getTreatment = await Models.treatment.findFirst();

        treatmentMedias.map(async (data) => {
            await Models.treatmentMedia.create({
                data: {
                    treatment_id: getTreatment.id,
                    name: data.name,
                    mimeType: data.mimeType,
                }
            });
            await Models.$disconnect();
        });
    } catch (error) {
        console.error(error)
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

