var express = require('express');
var _ = require('lodash');
var router = express.Router();

var todos = [
   { id: 1, title: 'test1', completed: true},
   { id: 2, title: 'test1', completed: false}
]

// get /api/todos -> []
router.get('/todos', function(req,res){
    res.send(todos);
})

// get /api/todos:id -> {}
router.get('/todos/:id',function(req,res){
    var todo = _.find(todos, { id: Number(req.params.id)})
    if( !todo ){
        return res.status(404).send();
    }
    res.send( todo );
})

// post api/todos -> {}
router.post('/todos',function(req,res){
    var latestid = 0;
    todos.forEach(function(todo) {
        if (todo.id > latestid) latestid = todo.id;
    });

    console.log(req.body);
    var todo = {
        id: latestid + 1,
        title: req.body.title,
        completed: req.body.completed
    }

    todos.push(todo);

    //console.log( newid );
    res.send(todo);
})

// put api/todos -> {}
router.put('/todos/:id',function(req,res){
    var todo = _.find(todos, { id: Number(req.params.id)})

    // update properties

    res.send(todo);
})

// post api/todos -> {}
router.delete('/todos/:id',function(req,res){
    var todo = _.find(todos, { id: Number(req.params.id)})

    // remove from array
    todos = _.without(todos, todo);

    res.send(todo);
})


module.exports = router;



