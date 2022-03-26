/*
 * This function is used to start a server only for the test environment
 */

const express = require("express")
const routes = require("./../routes")
const cors = require("cors");
const logger = require("morgan");

const createServerTest = () => {
    const app = express()
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json())
    app.use(express.urlencoded({extended: false}));
    app.use('/api/company', routes.CompanyRouter);
    app.use('/api/contact', routes.ContactRouter);
    app.use('/api/contact_type', routes.ContactTypeRouter);
    app.use('/api/diseases', routes.diseaseRouter);
    app.use('/api/disease_type', routes.diseaseTypeRouter);
    app.use('/api/drugs', routes.drugRouter);
    app.use('/api/drugLevels', routes.drugLevelRouter)
    app.use('/api/drugTypes', routes.drugTypeRouter)
    app.use('/api/medicalAdministrations', routes.medicalAdministrationRouter);
    app.use('/api/notification_type', routes.NotificationTypeRouter);
    app.use('/api/notification_history', routes.NotificationHistory);
    app.use('/api/treatments', routes.treatmentRouter);
    app.use('/api/treatmentMedias', routes.treatmentMediaRouter);
    app.use('/api/treatmentDrugs', routes.treatmentDrugRouter);
    app.use('/api/treatmentPeriodicities', routes.treatmentPeriodicityRouter);
    app.use('/api/user_company', routes.UserCompanyRouter);
    app.use('/api/user_notification_type', routes.userNotificationRouter);
    app.use('/api/users', routes.usersRouter);
    return app
}

module.exports = createServerTest