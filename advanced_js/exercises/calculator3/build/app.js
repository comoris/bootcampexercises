'use strict';

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
    console.log(_service2.default.add(2, 'test'));
} catch (err) {
    console.log(err.message);
};

console.log(_service2.default.add(2, 5));
//# sourceMappingURL=app.js.map