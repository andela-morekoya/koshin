module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    report: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'report'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  },
    {
      timestamps: true,
      tableName: 'reports'
    });
  return Report;
};
