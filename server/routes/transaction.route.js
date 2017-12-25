import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import transactionCtrl from '../controllers/transaction.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/users - Get list of users */
    .get(transactionCtrl.list)

    /** POST /api/users - Create new user */
    .post(validate(paramValidation.createTransaction), transactionCtrl.create);

router.route('/:userId')

/** GET /api/users/:userId - Get user */
    .get(transactionCtrl.get)

    /** PUT /api/users/:userId - Update user */
    .put(validate(paramValidation.updateUser), transactionCtrl.update)

    /** DELETE /api/users/:userId - Delete user */
    .delete(transactionCtrl.remove);

/** Load user when API with userId route parameter is hit */
// router.param('userId', transactionCtrl.load);

export default router;
