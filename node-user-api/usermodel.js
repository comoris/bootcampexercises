var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
   firstName: String,
   lastName: String,
   age: Number,
   email: String,
   homeAddress: {
       addressLine: String,
       city: String,
       zip: String
   },
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
