module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('emails');
  }
};
