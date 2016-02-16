'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// ES6 MODULES

function add(a, b) {
    if (!checktype(a)) throw new Error('a is not a number');
    if (!checktype(b)) throw new Error('b is not a number');
    return a + b;
}

function multiply(a, b) {
    if (checktype(a)) throw new Error('a is not a number');
    if (checktype(b)) throw new Error('b is not a number');
    return a * b;
}

function checktype(a) {
    return typeof a === 'number' ? true : false;
};

exports.default = {
    add: add
};
//# sourceMappingURL=service.js.map