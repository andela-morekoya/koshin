const development = {
  url: process.env.DATABASE_URL || 'postgres://chukwuma@localhost:5432/koshin_db_dev',
  dialect: 'postgres'
};

const test = {
  url: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/koshin_db_test',
  dialect: 'postgres'
};

const production = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres'
};

module.exports = {
  production,
  development,
  test
};
