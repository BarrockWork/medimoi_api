const userTypes = [
    {
        "name": "company",
        "nameSlug": "company",
        "createdAt": new Date(),
        "updatedAt": null
    },
    {
        "name": "user",
        "nameSlug": "user",
        "createdAt": new Date(),
        "updatedAt": null
    }
]

const users = [
    {
        "firstName": "john",
        "lastName": "doe",
        "age": 30,
        "email": "johnDoe.medimoi.fr",
        "password": "123456",
        "role": "admin",
        "cellphone": "0123456789",
        "homephone": "0123456789",
        "workphone": "0123456789",
        "createdAt": new Date(),
        "updatedAt": null,
        "isActive": true,
        "lastConnection": new Date(),
        "user_type_id": userTypes[0].id,
    },
    {
        "firstName": "Hassan",
        "lastName": "Derkaoui",
        "age": 25,
        "email": "hassan.medimoi.fr",
        "password": "password",
        "role": "admin",
        "cellphone": "0123456789",
        "homephone": "0123456789",
        "workphone": "0123456789",
        "createdAt": new Date(),
        "updatedAt": null,
        "isActive": true,
        "lastConnection": new Date(),
        "user_type_id": userTypes[1].id,
    }
]

const userNotificationTypes = [
    {
        "notification_type_id": 1,
        "user_id": 8
    },
]

const diseaseTypes = [
    {
        "name": "dermatologie",
        "nameSlug": "dermatologie",
        "description": "maladie de la peau",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    },
    {
        "name": "cardiologie",
        "nameSlug": "cardiologie",
        "description": "maladie cardiovasculaire",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    },
    {
        "name": "neurologie",
        "nameSlug": "neurologie",
        "description": "maladie neurologique",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    },
    {
        "name": "pulmonologie",
        "nameSlug": "pulmonologie",
        "description": "maladie pulmonaire",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    },
    {
        "name": "gastroentereologie",
        "nameSlug": "gastroentereologie",
        "description": "maladie de l'appareil digestif",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    },
    {
        "name": "inconnue",
        "nameSlug": "inconnue",
        "description": "maladie inconnue",
        "createdAt": new Date(),
        "updatedAt": null,
        'isActive': true
    }
]

const diseases = [
    {
        "name": "Asthme",
        "nameSlug": "Asthme",
        "description": "Les symptômes classiques de l’asthme sont une gêne respiratoire aiguë.",
        "incubationPeriod": "15 jours",
        "transmitting": "orale",
        "disease_type_id": diseaseTypes[3].id,
    },
    {
        "name": "Convulsions",
        "nameSlug": "Convulsions",
        "description": " Les convulsions sont des manifestations fréquentes et durent habituellement de 2 à 3 minutes ",
        "incubationPeriod": "15 jours",
        "transmitting": "on ne sait pas",
        "disease_type_id": diseaseTypes[5].id,
    },
    {
        "name": "Brûlures",
        "nameSlug": "Brûlures",
        "description": "Si la brûlure est phlycténulaire (présence de cloque) ou carbonisée (noire ou blanche et dure)",
        "incubationPeriod": "3 mois",
        "transmitting": "peau",
        "disease_type_id": diseaseTypes[0].id,
    }
]

const drugLevels = [
    {
        "level": 1,
        "description": "niveau 1",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    },
    {
        "level": 2,
        "description": "niveau 2",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    },
    {
        "level": 3,
        "description": "niveau 3",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    }
]

const drugTypes = [
    {
        "name": "pommade",
        "nameSlug": "pommade",
        "description": "gel froid",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    },
    {
        "name": "comprimé",
        "nameSlug": "comprimé",
        "description": "gellule",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    },
    {
        "name": "sachet",
        "nameSlug": "sachet",
        "description": "poudre ",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    },
    {
        "name": "sirop",
        "nameSlug": "sirop",
        "description": "liquide ",
        "isActive": true,
        "createdAt": new Date(),
        "updatedAt": null,
    }
]

const medicalAdminstrations = [
    {
        "name": "administration 1",
    },
    {
        "name": "administration 2",
    },
    {
        "name": "administration 3",
    }
]

const drugs = [
    {
        "name": "test",
        "description": "test",
        "isPrescription": true,
        "drug_level_id": drugLevels[0].id,
        "drug_type_id": drugTypes[0].id,
        "medical_administration_id": medicalAdminstrations[0].id,
    },
    {
        "name": "voltarene",
        "description": "pommade ",
        "isPrescription": true,
        "drug_level_id": drugLevels[0].id,
        "drug_type_id": drugTypes[0].id,
        "medical_administration_id": medicalAdminstrations[0].id,
    },
    {
        "name": "toplexis",
        "description": "sirop pour la toux",
        "isPrescription": true,
        "drug_level_id": drugLevels[0].id,
        "drug_type_id": drugTypes[3].id,
        "medical_administration_id": medicalAdminstrations[0].id,
    }
]

module.exports = {
    users,
    userTypes,
    userNotificationTypes,
    diseaseTypes,
    diseases,
    drugLevels,
    drugTypes,
    medicalAdminstrations,
    drugs,
};