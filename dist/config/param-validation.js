

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /api/users
    createUser: {
        body: {
            username: _joi2.default.string().required(),
        },
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: _joi2.default.string().required(),
        },
        params: {
            userId: _joi2.default.string().hex().required(),
        },
    },

    // POST /api/auth/login
    login: {
        body: {
            username: _joi2.default.string().required(),
            password: _joi2.default.string().required(),
        },
    },

    // POST /api/transactions
    createTransaction: {
        body: {
            borrower_id: _joi2.default.string().required(),
            loaner_id: _joi2.default.string().required(),
            sum: _joi2.default.number().required(),
        },
    },

};
module.exports = exports.default;
// # sourceMappingURL=param-validation.js.map
