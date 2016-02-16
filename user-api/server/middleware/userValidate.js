var userValidator = require('../validators/userValidator.js');
var httpErrors = require('../httpErrors');

module.exports = function userValidate(req, res, next){
  var result = userValidator.validate(req.body);
  if (!result.isValid) {
      return res.status(400).json(httpErrors.badRequest(result));
  }
  next();
}
