import express from 'express';
import userMapper from '../mappers/userMapper';
import UserModel from '../models/userModel';
import userValidator from '../validators/userValidator';
import { NotFoundError, BadRequestError, MethodNotAllowedError,UnauthorizedError } from '../httpErrors';
var srs = require('secure-random-string');
var sha256 = require('sha256');
var base64 = require('base-64');
var _ = require('lodash');
var jwt = require('jwt-simple');

var router = express.Router();

// user validation middleware
function validateUser(req, res, next) {
    // validate
    var result = userValidator.validate(req.body);
    if (!result.isValid) {
        return next(new BadRequestError(result));
    }
    next();
}

// user validation middleware
var secret = '123';
function checkToken(req, res, next){
    try {
        var decoded = jwt.decode(req.headers.authorization.split(' ')[1], secret);
        next();
    } catch (err) {
        next(new UnauthorizedError() );
    }
}
// GET /api/users
// GET /api/users?page=0&pageSize=5
// GET /api/users?page=3
router.get('/users', function(req, res, next) {
    var pagesize = Number(req.query.pageSize) || 25;
    var page = Number(req.query.page) || 0;
    var age_sort = Number(req.query.age);
    var sort_prop = req.query.sort;
    //console.log(req.query.sort);
    if( req.query.sort.includes('name') ){
        sort_prop = req.query.sort.replace( 'name', 'lastName');

        var stortType;

        if( req.query.sort.charAt(0) == ' ' || req.query.sort.charAt(0) == '+'){
            stortType = '+';
        } else if (req.query.sort.charAt(0) == '-'){
                stortType = '-';
        } else {
            stortType = '+';
        }

        sort_prop = sort_prop + ' ' + stortType + 'firstName';
    }
    UserModel.find()
        .limit(pagesize)
        .skip(pagesize * page)
        .sort(sort_prop)
        .then(function(results) {
            //console.log(results);
            var resources = results.map(user => userMapper.map(user));
            res.json(resources);
        })
        .catch(function(err) {
            next(err);
        })
});

// router.get('/users', function(req, res, next) {
//     UserModel.find()
//         .then(function(users) {
//             // map and return list of users
//             var resources = users.map(user => userMapper.map(user));
//             res.json(resources);
//         })
//         .catch(function(err) {
//             next(err);
//         })
// });

router.get('/users/:id', function(req, res, next) {

    // find the specified user
    UserModel.findOne({ _id: req.params.id })
        .then(user => {

            // user not found
            if (!user) {
                throw new NotFoundError();
            }

            // map and return
            var resource = userMapper.map(user);
            res.json(resource);
        })
        .catch(function(err) {
            next(err);
        });
});

router.post('/users', checkToken, validateUser, function(req, res, next)  {

    // create new user
    var user = createUser(req.body);

    // and save to db
    user.save()
        .then(user => {
            res.status(201);  // created
            res.location(`http://localhost:3000/api/users/${user._id}`)
            res.json(userMapper.map(user));
        })
        .catch(function(err) {
            next(err);
        });
});

router.put('/users/:id', validateUser, (req, res, next) => {

    // find and update
    UserModel.findOne({ _id: req.params.id })
        .then(user => {

            // user not found
            if (!user) {
                throw new NotFoundError();
            }

            // update user
            user = updateUser(req.body, user);

            // save
            return user.save();
        })
        .then(user => {
            // map and return
            var resource = userMapper.map(user);
            res.status(200)
               .json(resource);
        })
        .catch(function(err) {
            next(err);
        });
});

router.delete('/users/:id', (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) return;  // not found
            return user.remove();
        })
        .then(user => {
            if (!user) {
                // no content
                res.status(204).send();
            }
            else {
                // resource deleted
                res.status(200).json(userMapper.map(user));
            }
        })
        .catch(function(err) {
            next(err);
        });
});

/*
    1. get name from request
    2. API create (with random string)
    3. response with key
    4. sha256
    5. base64 encode bin
    5. save db
*/

// POST | GENERATE KEY
router.post('/users/:id/keys', (req, res, next) => {
    //console.log(req.params.id, req.body);

    var name = req.body.name || 'default'; // 1
    var plain_apikey = 'api_' + srs(); // 2

    // store in obj
    UserModel.findOne({ _id: req.params.id })
        .then( user => {
            var b64_apikey =  base64.encode(sha256(plain_apikey)); // 3
            user.apiKeys.push({
                'name': name ,
                'encryptedKey': b64_apikey
            });
            //console.log(user.apiKeys);
            return user.save();
        })
        .then(user => {
            res.json({
                name,
                key: plain_apikey
            });
        })
        .catch(function(err) {
            next(err);
        });
});

// GET KEYS
router.delete('/users/:id/keys/:name', (req, res, next) => {

    var todelete;

    UserModel.findOne({ _id: req.params.id })
        .then(user => {

            todelete = _.find(user.apiKeys, (o) => {
                return o.name == req.params.name;
            });
            user.apiKeys = _.without( user.apiKeys, todelete );
            return user.save();
        })
        .then(user => {
            res.json(todelete.name);
        })
        .catch(function(err) {
            next(err);
        });
});

// GET KEYS
router.get('/users/:id/keys', (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
    .then(user => {
            res.json( user.apiKeys );
    })
    .catch(function(err) {
        next(err);
    });

});

// POST LOGIN
router.post('/auth/login', (req, res, next) => {
    // api_L1WnKkqySKfKRUPa7gKNNxL7Fz6wrwuj
    // 1  NAME & ID OPZOEKEN OP BASIS VAN ENCODED APIKEY
    var plain_apikey = req.body.apiKey;
    var b64_apikey  = base64.encode(sha256(plain_apikey));

    UserModel.findOne({ 'apiKeys.encryptedKey':  b64_apikey} )
        .then( user => {
            var payload = {
                "name": user.firstName + ' ' +  user.lastName,
                "userId": user._id
            };
            // encode
            var token = jwt.encode(payload, secret);
            res.json({
                "accessToken": token,
                "tokenType": "bearer"
            })
        })
        .catch(function(err) {
            next(err);
        });
});


// handle method not allowed for all other routes
router.all('/users/*', (req, res, next) => {
    next(new NotFoundError())
})

// helpers methods

function createUser(resource) {
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
function updateUser(resource, user) {

}

module.exports = router;
