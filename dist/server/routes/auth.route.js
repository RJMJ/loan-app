

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _expressValidation = require('express-validation');

const _expressValidation2 = _interopRequireDefault(_expressValidation);

const _expressJwt = require('express-jwt');

const _expressJwt2 = _interopRequireDefault(_expressJwt);

const _paramValidation = require('../../config/param-validation');

const _paramValidation2 = _interopRequireDefault(_paramValidation);

const _auth = require('../controllers/auth.controller');

const _auth2 = _interopRequireDefault(_auth);

const _config = require('../../config/config');

const _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login - Returns token if correct username and password is provided
 */
router.route('/login').post((0, _expressValidation2.default)(_paramValidation2.default.login), _auth2.default.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
router.route('/random-number').get((0, _expressJwt2.default)({
    secret: _config2.default.jwtSecret,
}), _auth2.default.getRandomNumber);

exports.default = router;
module.exports = exports.default;
// # sourceMappingURL=auth.route.js.map
