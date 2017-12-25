

Object.defineProperty(exports, '__esModule', {
    value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _morgan = require('morgan');

const _morgan2 = _interopRequireDefault(_morgan);

const _bodyParser = require('body-parser');

const _bodyParser2 = _interopRequireDefault(_bodyParser);

const _cookieParser = require('cookie-parser');

const _cookieParser2 = _interopRequireDefault(_cookieParser);

const _compression = require('compression');

const _compression2 = _interopRequireDefault(_compression);

const _methodOverride = require('method-override');

const _methodOverride2 = _interopRequireDefault(_methodOverride);

const _cors = require('cors');

const _cors2 = _interopRequireDefault(_cors);

const _httpStatus = require('http-status');

const _httpStatus2 = _interopRequireDefault(_httpStatus);

const _expressWinston = require('express-winston');

const _expressWinston2 = _interopRequireDefault(_expressWinston);

const _expressValidation = require('express-validation');

const _expressValidation2 = _interopRequireDefault(_expressValidation);

const _helmet = require('helmet');

const _helmet2 = _interopRequireDefault(_helmet);

const _winston = require('./winston');

const _winston2 = _interopRequireDefault(_winston);

const _index = require('../server/routes/index.route');

const _index2 = _interopRequireDefault(_index);

const _config = require('./config');

const _config2 = _interopRequireDefault(_config);

const _APIError = require('../server/helpers/APIError');

const _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

if (_config2.default.env === 'development') {
    app.use((0, _morgan2.default)('dev'));
}

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());

// secure apps by setting various HTTP headers
app.use((0, _helmet2.default)());

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());

// enable detailed API logging in dev env
// if (config.env === 'development') {
//     expressWinston.requestWhitelist.push('body');
//     expressWinston.responseWhitelist.push('body');
//     app.use(expressWinston.logger({
//         winstonInstance,
//         meta: true, // optional: log meta data about request (defaults to true)
//         msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
//         colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
//     }));
// }

// mount all routes on /api path
app.use('/api', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof _expressValidation2.default.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new _APIError2.default(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof _APIError2.default)) {
        const apiError = new _APIError2.default(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new _APIError2.default('API not found', _httpStatus2.default.NOT_FOUND);
    return next(err);
});

// log error in winston transports except when executing test suite
if (_config2.default.env !== 'test') {
    app.use(_expressWinston2.default.errorLogger({
        winstonInstance: _winston2.default,
    }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => (// eslint-disable-line no-unused-vars
    res.status(err.status).json({
        message: err.isPublic ? err.message : _httpStatus2.default[err.status],
        stack: _config2.default.env === 'development' ? err.stack : {},
    })
));

exports.default = app;
module.exports = exports.default;
// # sourceMappingURL=express.js.map
