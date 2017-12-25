

const _supertestAsPromised = require('supertest-as-promised');

const _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

const _httpStatus = require('http-status');

const _httpStatus2 = _interopRequireDefault(_httpStatus);

const _chai = require('chai');

const _chai2 = _interopRequireDefault(_chai);

const _index = require('../../index');

const _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

_chai2.default.config.includeStack = true;

describe('## Misc', () => {
    describe('# GET /api/health-check', () => {
        it('should return OK', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/health-check').expect(_httpStatus2.default.OK).then((res) => {
                (0, _chai.expect)(res.text).to.equal('OK');
                done();
            })
                .catch(done);
        });
    });

    describe('# GET /api/404', () => {
        it('should return 404 status', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/404').expect(_httpStatus2.default.NOT_FOUND).then((res) => {
                (0, _chai.expect)(res.body.message).to.equal('Not Found');
                done();
            })
                .catch(done);
        });
    });

    describe('# Error Handling', () => {
        it('should handle express validation error - username is required', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).post('/api/users').send({
                mobileNumber: '1234567890',
            }).expect(_httpStatus2.default.BAD_REQUEST)
                .then((res) => {
                    (0, _chai.expect)(res.body.message).to.equal('"username" is required');
                    done();
                })
                .catch(done);
        });
    });
});
// # sourceMappingURL=misc.test.js.map
