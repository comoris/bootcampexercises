var express = require('express');
var config = require('./config.js'); //common js
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var todoRouter = require('./todoRoute');
var mongoose = require('mongoose');

var app = express();

// mongoDB
mongoose.connect('mongodb://localhost/demo');
// model in mongoose
var Todo = mongoose.model( 'Todo', {
    title: String,
    completed: Boolean
});

var todo = new Todo ({
    title: 'test2',
    completed: false
})

todo.save(function(err){
    if (err){
        return console.log(err);
    }
    console.log('ok');
});

app.get('/api/test', function(req, res){
    Todo.find({}, function(err,todos){
        if (err) return console.log(err);
        console.log(todos);
        res.send(todos);
    })
})

app.get('/api/test/:id', function(req, res){
    Todo.findOne( { _id: req.params.id }, function(err,todo){
        if (err) return console.log(err);
        res.send(todo);
    })
})




// --------------------------




// viewengine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// (volgorde logger)
app.use( logger('dev') );
app.use(express.static( path.join( __dirname, 'public') ));
// add body parser
app.use(bodyParser.json());

// general path
app.use('/api', todoRouter);


app.post('/api', function(req,res){

})

var server =  app.listen(config.port, function(){
    //console.log(`server listening on port: ${config.port}`);
    console.log(`server listening on port: ${server.address().port}`);
})

