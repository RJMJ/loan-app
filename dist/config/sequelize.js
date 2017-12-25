

const _sequelize = require('sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);

const _fs = require('fs');

const _fs2 = _interopRequireDefault(_fs);

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _lodash = require('lodash');

const _lodash2 = _interopRequireDefault(_lodash);

const _config = require('./config');

const _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = {};

// connect to postgres db
const sequelize = new _sequelize2.default(_config2.default.postgres.db, _config2.default.postgres.user, _config2.default.postgres.passwd, {
    dialect: 'postgres',
    port: _config2.default.postgres.port,
    host: _config2.default.postgres.host,
});

// User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
const modelsDir = _path2.default.normalize(`${__dirname}/../server/models`);

// loop through all files in models directory ignoring hidden files and this file
_fs2.default.readdirSync(modelsDir).filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
// import model files and save model names
    .forEach((file) => {
        console.log(`Loading model file ${file}`);
        const model = sequelize.import(_path2.default.join(modelsDir, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Synchronizing any model changes with database.
sequelize.sync().then((err) => {
    if (err) console.log('An error occured %j', err); else console.log('Database synchronized');
});

// assign the sequelize variables to the db object and returning the db.
module.exports = _lodash2.default.extend({
    sequelize,
    Sequelize: _sequelize2.default,
}, db);
// # sourceMappingURL=sequelize.js.map
