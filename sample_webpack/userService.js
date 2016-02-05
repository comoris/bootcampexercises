'use strict';

// OBJECT
// var obj = {
//     getAll: function(){
//         return [
//             { id: '123', name: 'Peter' },
//             { id: '124', name: 'joris' },
//         ]
//     }
// }
// module.exports = obj;


// var moment = require('moment');
// // CONSTRUCTOR FUNCTION
// function userService(){
//     this.getAll = function(){
//         console.log(moment().format());
//         return [
//             { id: '123', name: 'Bram' },
//             { id: '124', name: 'peter' },
//         ]
//     };
//     this.getOne = function(){
//         return { id: '123', name: 'Test' }
//     }
// }
// module.exports = nuw userService();


var moment = require('moment');

// CLASSE EC6
class userService {
    getAll() {
        console.log(moment().format());
        return [
            { id: '123', name: 'Bram' },
            { id: '129', name: 'peter' },
        ]
    }
    getOne() {
        return { id: '123', name: 'Test' }
    }
}

module.exports = new userService();


