var calc = require('./service.js');

try {
    console.log(calc.add(2,'jskflkjdasfjkd'));
}
catch(err){
    console.log(err);
};

console.log(calc.multiply(2,5));
