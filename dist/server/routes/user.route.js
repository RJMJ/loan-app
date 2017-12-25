

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _expressValidation = require('express-validation');

const _expressValidation2 = _interopRequireDefault(_expressValidation);

const _paramValidation = require('../../config/param-validation');

const _paramValidation2 = _interopRequireDefault(_paramValidation);

const _user = require('../controllers/user.controller');

const _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/users - Get list of users */
    .get(_user2.default.list)

/** POST /api/users - Create new user */
    .post((0, _expressValidation2.default)(_paramValidation2.default.createUser), _user2.default.create);

router.route('/:userId')

/** GET /api/users/:userId - Get user */
    .get(_user2.default.get)

/** PUT /api/users/:userId - Update user */
    .put((0, _expressValidation2.default)(_paramValidation2.default.updateUser), _user2.default.update)

/** DELETE /api/users/:userId - Delete user */
    .delete(_user2.default.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', _user2.default.load);

exports.default = router;
module.exports = exports.default;
// # sourceMappingURL=user.route.js.map
