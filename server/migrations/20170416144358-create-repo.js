module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('repos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      last_report_date: {
        type: Sequelize.DATE
      },
      default_report_branch: {
        type: Sequelize.STRING
      },
      report: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable('repos');
  }
};
