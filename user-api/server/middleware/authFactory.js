var config = require('../config');
var Base64 = require('js-base64').Base64;

module.exports = function authFactory(name,pswd){

  return function (req, res, next){
    var b64 = Base64.decode( req.headers.authorization.split(' ')[1] );
    usr = b64.split(':')[0];
    pwd = b64.split(':')[1];

    if( usr == name && pwd == pswd ){
      return next();
    }
    return res.status(401).send();
  };
};
