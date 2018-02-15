// import config from './config/config';
// import app from './config/express';
// /* eslint-disable no-unused-vars */
// import db from './config/sequelize';
//
// const debug = require('debug')('amida-api-boilerplate:index');
// /* eslint-enable no-unused-vars */
//
// // make bluebird default Promise
// Promise = require('bluebird'); // eslint-disable-line no-global-assign
//
// // module.parent check is required to support mocha watch
// if (!module.parent) {
//     // listen on port config.port
//     app.listen(config.port, () => {
//         console.info(`server started on port ${config.port} (${config.env})`);
//     });
// }
//
// export default app;

const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(request, response) {
    response.send('Hello from Express!');
    console.log('Hello')
})

app.listen(port, function(err) {
    if(err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
})
