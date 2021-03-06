import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';

import db from '../../config/sequelize';

const { User } = db;

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    User.findOne({ where: { username: req.body.username } })
        .then((user) => {
            if (!user) {
                const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                return next(err);
            }
            const token = jwt.sign({
                username: user.username,
                expiresIn: 3600,
            }, config.jwtSecret);
            return res.json({
                token,
                username: user.username,
            });
        })
        .catch(e => next(e));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100,
    });
}

export default { login, getRandomNumber };
