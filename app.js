require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./src/routes/home');
const usersRouter = require('./src/routes/users');
const userTypeRouter = require('./src/routes/user_type');
const userNotificationRouter = require('./src/routes/user_notification_type');
const addressRoadTypeRouter = require('./src/routes/address_road_type');
const addressRouter = require('./src/routes/address');
const treatmentRouter = require('./src/routes/treatment');
const treatmentMediaRouter = require('./src/routes/treatment_media');
const treatmentDrugRouter = require('./src/routes/treatment_drug');
const treatmentPeriodicityRouter = require('./src/routes/treatment_periodicity');
const medicalAdministrationRouter = require('./src/routes/medical_administration');
// NotificationType router
const NotificationTypeRouter = require('./src/routes/notification_type');
const NotificationHistory = require('./src/routes/notification_history');
// ContactType router
const ContactTypeRouter = require('./src/routes/contact_type');
// Company router
const CompanyRouter = require('./src/routes/company');
// Contact router
const ContactRouter = require('./src/routes/contact');
// UserCompany router
const UserCompanyRouter = require('./src/routes/user_company');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//User Route
app.use('/api/users', usersRouter);
//UserType Route
app.use('/api/user_type', userTypeRouter);
app.use('/api/address_road_type', addressRoadTypeRouter);
app.use('/api/user_notification_type', userNotificationRouter);
app.use('/api/address', addressRouter);
app.use('/api/treatments', treatmentRouter);
app.use('/api/treatmentMedias', treatmentMediaRouter);
app.use('/api/treatmentDrugs', treatmentDrugRouter);
app.use('/api/treatmentPeriodicities', treatmentPeriodicityRouter);
app.use('/api/medicalAdministrations', medicalAdministrationRouter);
// NotificationType Route
app.use('/api/notification_type', NotificationTypeRouter);
app.use('/api/notification_history', NotificationHistory);
// ContactType Route
app.use('/api/contact_type', ContactTypeRouter)
// Company Route
app.use('/api/company', CompanyRouter)
// Contact Route
app.use('/api/contact', ContactRouter)
// UserCompany Route
app.use('/api/user_company', UserCompanyRouter)

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
