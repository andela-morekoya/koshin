export default (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      field: 'email'
    }
  },
    {
      timestamps: true,
      tableName: 'emails'
    });
  return Email;
};
