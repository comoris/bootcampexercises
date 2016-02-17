import UserModel from './models/userModel';
var faker = require('faker');

export default function() {
    return UserModel.count()
        .then(function(countUser) {
            if (countUser > 1) {
                console.log('User available, skip seed')
                return;
            }

            var promises = [];

            function RanNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            };

            // create 1000 test users
            for( var i=0 ; i<1000 ; i++ ){
                var user = new UserModel({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    age: RanNum(0,100),
                });
                promises.push(user.save());
            }
            // wait for all promised have finised
            return Promise.all(promises);
        })
        .then(function(result) {
            if (result) {
                console.log('Successfull seeded database')
            }
        })
        .catch(function(err) {
            console.log('Failed to seed data', err)
        })
}
