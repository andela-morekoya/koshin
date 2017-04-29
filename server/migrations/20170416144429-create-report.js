module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      report: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          referenceKey: 'user_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('reports');
  }
};
