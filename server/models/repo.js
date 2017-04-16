module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
    },
    lastReportDate: {
      type: DataTypes.DATE,
      field: 'last_report_date'
    },
    defaultReportBranch: {
      type: DataTypes.STRING,
      field: 'default_report_branch'
    },
    report: {
      type: DataTypes.BOOLEAN
    }
  },
    {
      timestamps: true,
      tableName: 'repos'
    });
  return Repo;
};
