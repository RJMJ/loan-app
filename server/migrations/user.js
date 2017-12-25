module.exports = {
    up(queryInterface) {
        return queryInterface.removeColumn('User', 'deleted_at');
    },

    down(queryInterface, Sequelize) {
        return queryInterface
            .addColumn('User', 'deleted_at', {
                type: Sequelize.DATE,
            });
    },
};
