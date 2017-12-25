

/**
 * User Schema
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        underscored: true,
        classMethods: {
            associate: (models) => {
                User.hasMany(models.Transaction, {
                    foreignKey: 'borrower_id',
                    // constraints: false,
                    // as: 'id',
                });
            },
        },
    });

    return User;
};

