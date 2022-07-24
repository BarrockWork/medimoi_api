require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken')

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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using routes
app.use('/', routes.indexRouter);
app.use('/api/address',authenticateToken, routes.addressRouter);
app.use('/api/address_road_type',authenticateToken,  routes.addressRoadTypeRouter);
app.use('/api/company', authenticateToken, routes.CompanyRouter);
app.use('/api/contact', authenticateToken, routes.ContactRouter);
app.use('/api/contact_type', authenticateToken, routes.ContactTypeRouter);
app.use('/api/diseases', authenticateToken, routes.diseaseRouter);
app.use('/api/disease_types', authenticateToken, routes.diseaseTypeRouter);
app.use('/api/drugs', authenticateToken, routes.drugRouter);
app.use('/api/drug_levels', authenticateToken, routes.drugLevelRouter);
app.use('/api/drug_types', authenticateToken, routes.drugTypeRouter);
app.use('/api/medical_administrations', authenticateToken, routes.medicalAdministrationRouter);
app.use('/api/notification_type', authenticateToken, routes.NotificationTypeRouter);
app.use('/api/notification_history', authenticateToken, routes.NotificationHistory);
app.use('/api/treatments', authenticateToken, routes.treatmentRouter);
app.use('/api/treatment_medias', authenticateToken, routes.treatmentMediaRouter);
app.use('/api/treatment_drugs', authenticateToken, routes.treatmentDrugRouter);
app.use('/api/treatment_periodicities', authenticateToken, routes.treatmentPeriodicityRouter);
app.use('/api/user_company', authenticateToken, routes.UserCompanyRouter);
app.use('/api/user_notification_type', authenticateToken, routes.userNotificationRouter);
app.use('/api/users', authenticateToken, routes.usersRouter);
app.use('/api/user_type', authenticateToken, routes.userTypeRouter);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']

    // Récupération du token
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    // Véracité du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

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
