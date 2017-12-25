

const _supertestAsPromised = require('supertest-as-promised');

const _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

const _httpStatus = require('http-status');

const _httpStatus2 = _interopRequireDefault(_httpStatus);

const _jsonwebtoken = require('jsonwebtoken');

const _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const _chai = require('chai');

const _chai2 = _interopRequireDefault(_chai);

const _index = require('../../index');

const _index2 = _interopRequireDefault(_index);

const _config = require('../../config/config');

const _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

_chai2.default.config.includeStack = true;

describe('## Auth APIs', () => {
    const validUserCredentials = {
        username: 'react',
        password: 'express',
    };

    const invalidUserCredentials = {
        username: 'react',
        password: 'IDontKnow',
    };

    let jwtToken = void 0;

    describe('# POST /api/auth/login', () => {
        it('should return Authentication error', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).post('/api/auth/login').send(invalidUserCredentials).expect(_httpStatus2.default.UNAUTHORIZED)
                .then((res) => {
                    (0, _chai.expect)(res.body.message).to.equal('Authentication error');
                    done();
                })
                .catch(done);
        });

        it('should get valid JWT token', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).post('/api/auth/login').send(validUserCredentials).expect(_httpStatus2.default.OK)
                .then((res) => {
                    (0, _chai.expect)(res.body).to.have.property('token');
                    _jsonwebtoken2.default.verify(res.body.token, _config2.default.jwtSecret, (err, decoded) => {
                        (0, _chai.expect)(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
                        (0, _chai.expect)(decoded.username).to.equal(validUserCredentials.username);
                        jwtToken = `Bearer ${res.body.token}`;
                        done();
                    });
                })
                .catch(done);
        });
    });

    describe('# GET /api/auth/random-number', () => {
        it('should fail to get random number because of missing Authorization', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/auth/random-number').expect(_httpStatus2.default.UNAUTHORIZED).then((res) => {
                (0, _chai.expect)(res.body.message).to.equal('Unauthorized');
                done();
            })
                .catch(done);
        });

        it('should fail to get random number because of wrong token', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/auth/random-number').set('Authorization', 'Bearer inValidToken').expect(_httpStatus2.default.UNAUTHORIZED)
                .then((res) => {
                    (0, _chai.expect)(res.body.message).to.equal('Unauthorized');
                    done();
                })
                .catch(done);
        });

        it('should get a random number', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/auth/random-number').set('Authorization', jwtToken).expect(_httpStatus2.default.OK)
                .then((res) => {
                    (0, _chai.expect)(res.body.num).to.be.a('number');
                    done();
                })
                .catch(done);
        });
    });
});
// # sourceMappingURL=auth.test.js.map
