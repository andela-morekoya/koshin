export default (sequelize, DataTypes) => {
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
    }
  },
    {
      timestamps: true,
      tableName: 'reports'
    });
  return Report;
};
