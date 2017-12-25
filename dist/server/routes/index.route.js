

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _user = require('./user.route');

const _user2 = _interopRequireDefault(_user);

const _transaction = require('./transaction.route');

const _transaction2 = _interopRequireDefault(_transaction);

const _auth = require('./auth.route');

const _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', _user2.default);

// mount user routes at /users
router.use('/transactions', _transaction2.default);

// mount auth routes at /auth
router.use('/auth', _auth2.default);

exports.default = router;
module.exports = exports.default;
// # sourceMappingURL=index.route.js.map
