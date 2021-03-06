import express from 'express';
import userMapper from '../mappers/userMapper';
import UserModel from '../models/userModel';
import userValidator from '../validators/userValidator';
import { NotFoundError, BadRequestError, MethodNotAllowedError } from '../httpErrors';

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

// GET /api/users
// GET /api/users?page=0&pageSize=5
// GET /api/users?page=3
router.get('/users', function(req, res, next) {
    var pagesize = Number(req.query.pageSize) || 25;
    var page = Number(req.query.page) || 0;
    var age_sort = Number(req.query.age);
    var sort_prop = req.query.sort;
    //console.log(req.query.sort);
    if( req.query.sort.includes('name')){
        sort_prop = req.query.sort.replace( 'name', 'lastName');

        var stortType;

        if( req.query.sort.charAt(0) == ' ' || req.query.sort.charAt(0) == '+'){
            stortType = '+';
        } else if (req.query.sort.charAt(0) == '-'){
                stortType = '-';
        } else {
            stortType = '+';
        }

        console.log(sort_prop + ' ' + stortType + 'firstName'  );
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

router.post('/users', validateUser, function(req, res, next)  {

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

// handle method not allowed for all other routes
router.all('/users/*', (req, res, next) => {
    next(new MethodNotAllowedError())
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

module.exports = router;
