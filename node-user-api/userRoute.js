var express = require('express');
var _       = require('lodash');
var router  = express.Router();
var User    = require('./usermodel');


function mapUser(user) {
    return  {
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        age: user.age,
        email: user.email,
        address: user.homeAddress.addressLine,
        city: user.homeAddress.city,
        zip: user.homeAddress.zip,
    }
}

//--------------------------

// get /api/todos -> []
router.get('/users/:id', function(req,res){
    User.findOne( { '_id': req.params.id }, function(err, user){
        if (!user) {
            return res.status(404).send('not found');
        }
        return res.send(mapUser(user));
    });
});


// get /api/user
router.delete('/users/:id', function(req,res){

    User.findOne( { '_id': req.params.id }, function(err, user){
        if (!user) {
            return res.status(204).send();
        }

        user.remove(function(err) {
            if(err) {
                return res.status(500, err);
            }

            res.status(200).send(mapUser(user));
        })

    });
});

// get /api/users
router.get('/users', function(req,res){
    User.find(function(err, users){

        var resources = users.map(user => mapUser(user));

        return res.send(resources);
    });
});

// get /api/post
router.post('/users', function(req,res){

    var user = new User({
        firstName: req.body.name.split(' ')[0],
        lastName: req.body.name.split(' ')[1],
        age: req.body.age,
        email: req.body.email,
        homeAddress: {
            addressLine: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
        }
    });

    user.save(function(err) {
        if(err) {
            return res.status(500, err);
        }
        res.status(200).send(mapUser(user));
    });

});

function updateUser(usr, res){
    usr.firstName = res.name.split(' ')[0] || usr.firstName ;
    usr.lastName = res.name.split(' ')[1] || usr.lastName ;
    usr.age = res.age || usr.age;
    usr.email = res.age || usr.email;
    usr.homeAddress = {
        address : res.address || usr.homeAddress.address,
        city : res.city || usr.homeAddress.city,
        zip : res.zip || usr.homeAddress.zip,
    };
    return usr;
}

// get /api/put
router.put('/users/:id',function(req, res){

    User.findById( req.params.id, function (err, user) {

        var resource = updateUser( user, req.body );

        resource.save(function(err) {
            if(err) {
                return res.status(500, err);
            }
            res.status(200).send( mapUser(resource) );
        });
    });

})


//--------------------------
module.exports = router;
