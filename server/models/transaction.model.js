
/**
 * Borrow Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        borrower_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        loaner_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        sum: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: (models) => {
                Transaction.belongsTo(models.User, { foreignKey: 'loaner_id', sourceKey: 'user_id' });
                // Transaction.belongsTo(models.User, {foreignKey: 'borrower_id', sourceKey: 'user_id'});
            },
        },

    });
    return Transaction;
};
