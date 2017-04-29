module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      personal_access_token: {
        type: Sequelize.STRING
      },
      sender_email: {
        type: Sequelize.STRING
      },
      organisations: {
        type: Sequelize.ARRAY(Sequelize.STRING), // eslint-disable-line
        defaultValue: []
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
