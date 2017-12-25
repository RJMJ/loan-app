

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = _joi2.default.object({
    NODE_ENV: _joi2.default.string().allow(['development', 'production', 'test', 'provision']).default('development'),
    PORT: _joi2.default.number().default(4000),
    JWT_SECRET: _joi2.default.string().required().description('JWT Secret required to sign'),
    PG_DB: _joi2.default.string().required().description('Postgres database name'),
    PG_PORT: _joi2.default.number().default(5432),
    PG_HOST: _joi2.default.string().default('localhost'),
    PG_USER: _joi2.default.string().required().description('Postgres username'),
    PG_PASSWD: _joi2.default.string().allow('').description('Postgres password'),
}).unknown().required();

let _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    postgres: {
        db: envVars.PG_DB,
        port: envVars.PG_PORT,
        host: envVars.PG_HOST,
        user: envVars.PG_USER,
        passwd: envVars.PG_PASSWD,
    },
};

exports.default = config;
module.exports = exports.default;
// # sourceMappingURL=config.js.map
