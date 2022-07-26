const indexRouter = require('./home');
const usersRouter = require('./users');
const userTypeRouter = require('./user_type');
const userNotificationRouter = require('./user_notification_type');
const addressRoadTypeRouter = require('./address_road_type');
const addressRouter = require('./address');
const treatmentRouter = require('./treatment');
const treatmentMediaRouter = require('./treatment_media');
const treatmentDrugRouter = require('./treatment_drug');
const treatmentPeriodicityRouter = require('./treatment_periodicity');
const medicalAdministrationRouter = require('./medical_administration');
const diseaseRouter = require('./disease');
const diseaseTypeRouter = require('./disease_type');
const drugRouter = require('./drug');
const drugLevelRouter = require('./drug_level');
const drugTypeRouter = require('./drug_type');
const NotificationTypeRouter = require('./notification_type');
const NotificationHistory = require('./notification_history');
const ContactTypeRouter = require('./contact_type');
const CompanyRouter = require('./company');
const ContactRouter = require('./contact');
const UserCompanyRouter = require('./user_company');
const KhysInfoRouter = require('./khys_info');
const AuthServer = require('./authServer');
const PlanRouter = require('./plan');
const PlanPeriodicityRouter = require("./plan_periodicity");

module.exports = {
  indexRouter,
  AuthServer,
  usersRouter,
  userTypeRouter,
  userNotificationRouter,
  addressRoadTypeRouter,
  addressRouter,
  treatmentRouter,
  treatmentMediaRouter,
  treatmentDrugRouter,
  treatmentPeriodicityRouter,
  medicalAdministrationRouter,
  diseaseRouter,
  diseaseTypeRouter,
  drugRouter,
  drugLevelRouter,
  drugTypeRouter,
  NotificationTypeRouter,
  NotificationHistory,
  ContactTypeRouter,
  CompanyRouter,
  ContactRouter,
  UserCompanyRouter,
  KhysInfoRouter,
  PlanRouter,
  PlanPeriodicityRouter
};
