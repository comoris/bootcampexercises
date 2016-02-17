# UserAPI extended

## Add Paging

Steps:
1. Create 1000 users with faker.js
2. Check if there are users in the database
3. If not insert the 1000 user with bulk import
4. Add paging to your GET route

REST API

	GET /api/users?page=0&pageSize=5

Create 1000 users in your db

    // Use the faker.js library
    var faker = require('faker');
    var randomName = faker.name.findName(); // Rowan Nikolaus
    var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    var randomCard = faker.helpers.createCard(); // random contact card containing many properties

see: https://github.com/marak/Faker.js/

Query the database with paging

    MyModel.find(query, { skip: 10, limit: 5 })
        .then(function(items) {
            ...
        })
    });

or

    MyModel
        .find(query)
        .limit(pageSize)
        .skip(pageSize * page)
        .then(function(results) {
            ...
        });


## Add Sorting

REST API

    GET /api/users?sort=+age
    GET /api/users?sort=-email

Mongoose sorting

    User.find({...}).sort({'age': 'asc'});
    User.find({...}).sort({'email': 'desc'});
    User.find({...}).sort({'email': -1});
    User.find({...}).sort('age');
    User.find({...}).sort('-email');

    User.find({...})
        .sort('age -email')
        .then(function(users) {
            ...
        })

Can be combined with paging

    MyModel
        .find(query)
        .limit(pageSize)
        .skip(pageSize * page)
        .sort({'age': 'asc'})
        .then(function(results) {
            ...
        });
