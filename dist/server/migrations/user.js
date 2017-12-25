

module.exports = {
    up: function up(queryInterface) {
        return queryInterface.removeColumn('User', 'deleted_at');
    },

    down: function down(queryInterface, Sequelize) {
        return queryInterface.addColumn('User', 'deleted_at', {
            type: Sequelize.DATE,
        });
    },
};
// # sourceMappingURL=user.js.map
