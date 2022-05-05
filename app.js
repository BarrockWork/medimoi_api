require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Import of routes
const routes = require('./src/routes');

// Initialize express server
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

// Configurations for express server
app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using routes
app.use('/', routes.indexRouter);
app.use('/api/address', routes.addressRouter);
app.use('/api/address_road_type', routes.addressRoadTypeRouter);
app.use('/api/company', routes.CompanyRouter);
app.use('/api/contact', routes.ContactRouter);
app.use('/api/contact_type', routes.ContactTypeRouter);
app.use('/api/diseases', routes.diseaseRouter);
app.use('/api/disease_type', routes.diseaseTypeRouter);
app.use('/api/drugs', routes.drugRouter);
app.use('/api/drug_levels', routes.drugLevelRouter);
app.use('/api/drug_types', routes.drugTypeRouter);
app.use('/api/medical_administrations', routes.medicalAdministrationRouter);
app.use('/api/notification_type', routes.NotificationTypeRouter);
app.use('/api/notification_history', routes.NotificationHistory);
app.use('/api/treatments', routes.treatmentRouter);
app.use('/api/treatment_medias', routes.treatmentMediaRouter);
app.use('/api/treatment_drugs', routes.treatmentDrugRouter);
app.use('/api/treatment_periodicities', routes.treatmentPeriodicityRouter);
app.use('/api/user_company', routes.UserCompanyRouter);
app.use('/api/user_notification_type', routes.userNotificationRouter);
app.use('/api/users', routes.usersRouter);
app.use('/api/user_type', routes.userTypeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
