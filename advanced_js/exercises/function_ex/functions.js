function identify(n){
    return n;
};
// console.log( identify(14) );
// --------------------------------------
function add(a,b){
    return a+b;
};
function mul(a,b){
    return a*b;
};
// console.log( add(89,67) );
// console.log( mul(89,67) );
// --------------------------------------
function identifyf(a){
    return function(){
        return a;
    }
}
idf = identifyf(3);
idf();
// console.log( idf() );
// --------------------------------------
function addf(a){
    return function(b){
        return a * b;
    }
}
addf(3)(6);
console.log( addf(3)(6) );
// --------------------------------------
function applyf(fn){
     return function(x){
        return function(y){
            return fn(x,y);
        }
    };
}
addf = applyf(add);
addf(5)(9);
// console.log( addf(5)(9) );
// --------------------------------------
add3 = curry(add, 3);
add3(4);

function curry(fn,x){
    return function(y){
        return fn(x, y);
    }
}
// --------------------------------------
var inc = addf(1);
var inc = applyf(add)(1);
var inc = curry(add, 1);

// console.log( inc(5) );
// console.log( inc(inc(5)) );
// --------------------------------------

// Number.prototype.add = methodize(add);
// (3).add(4);

function methodize(fn) {
    return function(y) {
        return fn(this, y);
    }
}
