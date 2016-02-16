var express    = require('express');
var config     = require('./config.js'); //common js
var logger     = require('morgan');
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var userRouter = require('./userRoute');

//--------------------------------

// mongoDB
mongoose.connect('mongodb://localhost/demo');


// express setup -------------------------------

var app = express();
app.use( bodyParser.json() );   // bodyparser
app.use(logger('dev'));
app.use('/api', userRouter);  // user routing

//--------------------------------

var server =  app.listen(config.port, function(){
    //console.log(`server listening on port: ${config.port}`);
    console.log(`server listening on port: ${server.address().port}`);
})





