

const _supertestAsPromised = require('supertest-as-promised');

const _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

const _httpStatus = require('http-status');

const _httpStatus2 = _interopRequireDefault(_httpStatus);

const _chai = require('chai');

const _chai2 = _interopRequireDefault(_chai);

const _sequelize = require('../../config/sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);

const _index = require('../../index');

const _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

/**
 * root level hooks
 */
/* eslint-env mocha */

before(() => {
    _sequelize2.default.sequelize.sync();
});

after(() => {
    _sequelize2.default.User.drop();
});

describe('## User APIs', () => {
    let user = {
        username: 'KK123',
    };

    describe('# POST /api/users', () => {
        it('should create a new user', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).post('/api/users').send(user).expect(_httpStatus2.default.OK)
                .then((res) => {
                    (0, _chai.expect)(res.body.username).to.equal(user.username);
                    user = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/users/:userId', () => {
        it('should get user details', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get(`/api/users/${user.id}`).expect(_httpStatus2.default.OK).then((res) => {
                (0, _chai.expect)(res.body.username).to.equal(user.username);
                done();
            })
                .catch(done);
        });

        it('should report error with message - Not found, when user does not exist', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/12345').expect(_httpStatus2.default.NOT_FOUND).then((res) => {
                (0, _chai.expect)(res.body.message).to.equal('Not Found');
                done();
            })
                .catch(done);
        });
    });

    describe('# PUT /api/users/:userId', () => {
        it('should update user details', (done) => {
            user.username = 'KK';
            (0, _supertestAsPromised2.default)(_index2.default).put(`/api/users/${user.id}`).send(user).expect(_httpStatus2.default.OK)
                .then((res) => {
                    (0, _chai.expect)(res.body.username).to.equal('KK');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/users/', () => {
        it('should get all users', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/users').expect(_httpStatus2.default.OK).then((res) => {
                (0, _chai.expect)(res.body).to.be.an('array');
                done();
            })
                .catch(done);
        });

        it('should get all users (with limit and skip)', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).get('/api/users').query({ limit: 10, skip: 1 }).expect(_httpStatus2.default.OK)
                .then((res) => {
                    (0, _chai.expect)(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api/users/', () => {
        it('should delete user', (done) => {
            (0, _supertestAsPromised2.default)(_index2.default).delete(`/api/users/${user.id}`).expect(_httpStatus2.default.OK).then((res) => {
                (0, _chai.expect)(res.body).to.equal('KK');
                done();
            })
                .catch(done);
        });
    });
});
// # sourceMappingURL=user.test.js.map
