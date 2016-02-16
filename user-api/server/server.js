var express = require('express');
var config = require('./config');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var httpErrors = require('./httpErrors');

var userRoute = require('./routes/userRoute');

var authFactory = require('./middleware/authFactory.js');

// ----------------------------------------
// mongoDB
mongoose.connect(config.mongoUri);
mongoose.Promise = global.Promise;

// setup express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());  // add body parser


// ERROR MIDDLEWARE ----------------------
function errorHandler(err, req, res, next) {
    res.status(500).json(httpErrors.internalServerError(err));
}

// MIDDLEWARE ----------------------

// 1
// 'app.get' draait enkel mee als hij op dit pad via get binnenkomt
var name = config.user;
var pswd = config.password;
app.get('/api/users', authFactory(name,pswd), function (req, res, next) {
    console.log('approved');
    next(); // --> roept de next middleware op
});


// --------------------------------

app.use('/api', userRoute);

// for all other routes => Not Found
app.all('/*', (req, res) => {
    res.status(404)
       .json(httpErrors.notFound())
});

// errorLogger functie boven
app.use(errorHandler);

// --------------------------------

// listen for port
var server = app.listen(config.port, function() {
    console.log(`Server listening on port: ${server.address().port}`);
});
