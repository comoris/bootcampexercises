require("./style.scss");
var userService = require('./userService');

var $ = require("jquery");
var img = require('./dog.png');

var user = userService.getAll();

user.forEach(function(user){
    $('#list').append( "<li>" + user.id + ' ' + user.name + "</li>");
});

$('#img').attr('src', img);
