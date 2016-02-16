var express = require('express');
var userMapper = require('../mappers/userMapper');
var UserModel = require('../models/userModel');
var userValidator = require('../validators/userValidator');
var httpErrors = require('../httpErrors');
var userValidate = require('../middleware/userValidate.js');

var router = express.Router();

function findOne(query) {
    return UserModel.findOne(query)
        .then(function(user) {
            return user;
        })
        .catch(function(err) {
            if (err.name == 'CastError') {
                return null;
            }
            throw err;
        })
}

function findOne(query) {
    return new Promise( (resolve,reject) => {
        UserModel.findOne(query, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(user);
        });
    })
}

function save(user) {
    return new Promise( (resolve,reject) => {
        user.save((err, user) => {
            if (err) {
                reject(err);
                return;
            }
            res.status(201);  // created
            resolve(user);
        });
    })
}


router.get('/users', function(req, res, next) {
    // UserModel.find( function(err, users) {
    //     //if (err) return next(err);
    //     if (err) {
    //         res.status(500).json(httpErrors.internalServerError(err));
    //         return;
    //     }
    //     var resources = users.map(user => userMapper.map(user));
    //     res.status(200).json(resources);
    // });
    UserModel.find()
        .then( function(users) {
            var resources = users.map(user => userMapper.map(user));
            res.json(resources);
        })
        .catch( function(err) {
            next(err);
        })
});

router.get('/users/:id', function(req, res, next) {
    // UserModel.findOne({ _id: req.params.id }, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //         return next(err);
    //     }
    //
    //     if (!user) {
    //         // return next('not found');
    //         return next(new NotFoundError);
    //     }
    //
    //     var resource = userMapper.map(user);
    //     res.status(200)
    //        .json(resource);
    // });
    findOne( { _id: req.params.id }  )
        .then( function(user) {
            if (!user) {
                res.status(404).send();
                return;
            }
            var resource = userMapper.map(user);
            res.status(200).json(resource);
        })
        .catch( function(err) {
            next(err);
        })
});

router.post('/users', userValidate, function(req, res, next)  {
    // create new user
    var user = createUser(req.body);

    //- and save to db
    // user.save((err) => {
    //     if (err) return next(err);
    //
    //     res.status(201);  // created
    //     res.header('Location', `http://localhost:3000/api/users/${user._id}`)
    //     //of: res.location(`http://localhost:3000/api/users/${user._id}`)
    //     res.json(userMapper.map(user));
    // })

    user.save()
        .then( function(user) {
            res.status(201);  // created
            res.header('Location', `http://localhost:3000/api/users/${user._id}`)
            //of: res.location(`http://localhost:3000/api/users/${user._id}`)
            res.json(userMapper.map(user));
            //just tzelfde res.send = res.json
        })
        .catch( function(err) {
            next(err);
        })

});

router.put('/users/:id', (req, res, next) => {

    // validate
    var result = userValidator.validator(req.body);
    if (!result.isValid) {
        return res.status(400).send(result);
    }

    // find and update
    // UserModel.findOne({ _id: req.params.id }, (err, user) => {
    //     if (err) return next(err);
    //
    //     // is user found?
    //     if (!user) {
    //         return res.status(404).json(httpErrors.notFound());
    //     }
    //
    //     // update user
    //     user = updateUser(req.body, user);
    //
    //     // save
    //     user.save(err => {
    //         if (err) {
    //             return res.status(500).json(httpErrors.internalServerError(err));
    //         }
    //         var resource = userMapper.map(user);
    //         res.status(200)
    //            .json(resource);
    //     })
    // });
    UserModel.findOne( { _id: req.params.id } )
        .then( function(user) {
            if (!user) {
                return res.status(404).json(httpErrors.notFound());
            }
            return updateUser(req.body, user).save();
        })
        .then( function(user){
            if (!user) {
                return;
            }
            var resource = userMapper.map(user);
            res.status(200).json(resource);
        })
        .catch( function(err) {
            next(err);
        });
});

router.delete('/users/:id', (req, res, next) => {
    UserModel.findOne( { _id: req.params.id } )
        .then( function(user) {
            if (!user) {
                return res.status(204).send();
            }
            return user.remove();
        })
        .then( function(user) {
            if (!user) {
                return;
            }
            return res.status(200).json(userMapper.map(user));
        })
        .catch( function(err) {
            next(err);
        });
    // UserModel.findOne({ _id: req.params.id }, (err, user) => {
    //     if (err) return next(err);
    //
    //     if (!user) {
    //         return res.status(204).send();
    //     }
    //     user.remove((err) => {
    //         if (err) {
    //             return res.status(500).json(httpErrors.internalServerError(err));
    //         }
    //         res.status(200).json(userMapper.map(user));
    //     })
    // });
});

// handle method not allowed for all other routes
router.all('/users/*', (req, res, next) => {
    res.status(405) // method not allowed
        .send('test');
})

function createUser(resource, user) {
    var user = new UserModel();
    return updateUser(resource, user);
}

function updateUser(resource, user) {
    var nameParts = resource.name.split(' ');
    user.firstName = nameParts[0];
    user.lastName = nameParts[1];
    user.email = resource.email;

    if (resource.age)
        user.age = resource.age;
    if (resource.address)
        user.homeAddress.addressLine = resource.address;
    if (resource.city)
        user.homeAddress.city = resource.city;
    if (resource.zip)
        user.homeAddress.zip = resource.zip;

    return user;
}

module.exports = router;
