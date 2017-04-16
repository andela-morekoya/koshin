module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      github_id: {
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
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
