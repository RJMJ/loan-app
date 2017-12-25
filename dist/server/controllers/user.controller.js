

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _httpStatus = require('http-status');

const _httpStatus2 = _interopRequireDefault(_httpStatus);

const _sequelize = require('../../config/sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _sequelize2.default.User;

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.findById(id).then((user) => {
        if (!user) {
            const e = new Error('User does not exist');
            e.status = _httpStatus2.default.NOT_FOUND;
            return next(e);
        }
        req.user = user; // eslint-disable-line no-param-reassign
        return next();
    }).catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
    const user = User.build({
        username: req.body.username,
    });

    user.save().then(savedUser => res.json(savedUser)).catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user.save().then(savedUser => res.json(savedUser)).catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    let _req$query$limit = req.query.limit,
        limit = _req$query$limit === undefined ? 50 : _req$query$limit;

    User.findAll({ limit }).then(users => res.json(users)).catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    const username = req.user.username;
    user.destroy().then(() => res.json(username)).catch(e => next(e));
}

exports.default = {
    load, get, create, update, list, remove,
};
module.exports = exports.default;
// # sourceMappingURL=user.controller.js.map
