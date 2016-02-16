function add(a,b) {
    if( !checktype(a) )
        throw new Error('a is not a number');
    if( !checktype(b) )
        throw new Error('b is not a number');
    return  a + b;
}

function multiply(a,b) {
    if( checktype(a)) throw new Error('a is not a number');
    if( checktype(b)) throw new Error('b is not a number');
    return  a * b;
}

function checktype(a) {
    return ( a === Number ) ? true : false;

};

module.exports = {
    add: add,
    multiply: multiply
}

