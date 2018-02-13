import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
        params: {
            userId: Joi.string().hex().required(),
        },
    },

    // POST /api/auth/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },

    register: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },

    // POST /api/transactions
    createTransaction: {
        body: {
            borrower_id: Joi.string().required(),
            loaner_id: Joi.string().required(),
            sum: Joi.number().required(),
        },
    },

};
