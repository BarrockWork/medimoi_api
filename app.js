require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./src/routes/home');
const usersRouter = require('./src/routes/users');
const treatmentRouter = require('./src/routes/treatment');
const treatmentMediaRouter = require('./src/routes/treatment_media');
const treatmentDrugRouter = require('./src/routes/treatment_drug');
const treatmentPeriodicityRouter = require('./src/routes/treatment_periodicity');
const medicalAdministrationRouter = require('./src/routes/medical_administration');
const diseaseRouter = require('./src/routes/disease');
// Diseasetype router
const diseaseTypeRouter = require('./src/routes/disease_type');
// Drug router
const drugRouter = require('./src/routes/drug');
//Drug Level router
const drugLevelRouter = require('./src/routes/drug_level');
//Drug Type router
const drugTypeRouter = require('./src/routes/drug_type');
// NotificationType router
const NotificationTypeRouter = require('./src/routes/notification_type');
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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Disease route
app.use('/api/diseases', diseaseRouter);
// Disease_type route
app.use('/api/disease_type', diseaseTypeRouter);
//Drug route
app.use('/api/drugs', drugRouter);
//Drug level route
app.use('/api/drugLevels', drugLevelRouter)
//Drug Type route
app.use('/api/drugTypes', drugTypeRouter)
app.use('/api/treatments', treatmentRouter);
app.use('/api/treatmentMedias', treatmentMediaRouter);
app.use('/api/treatmentDrugs', treatmentDrugRouter);
app.use('/api/treatmentPeriodicities', treatmentPeriodicityRouter);
app.use('/api/medicalAdministrations', medicalAdministrationRouter);
// NotificationType Route
app.use('/api/notification_type', NotificationTypeRouter)
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
