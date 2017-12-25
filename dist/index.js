

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _config = require('./config/config');

const _config2 = _interopRequireDefault(_config);

const _express = require('./config/express');

const _express2 = _interopRequireDefault(_express);

const _sequelize = require('./config/sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('amida-api-boilerplate:index');
/* eslint-enable no-unused-vars */

// make bluebird default Promise

/* eslint-disable no-unused-vars */
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// module.parent check is required to support mocha watch
if (!module.parent) {
    // listen on port config.port
    _express2.default.listen(_config2.default.port, () => {
        console.info(`server started on port ${_config2.default.port} (${_config2.default.env})`);
    });
}

exports.default = _express2.default;
module.exports = exports.default;
// # sourceMappingURL=index.js.map
