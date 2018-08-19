const Sequelize = require('sequelize');

const sequelize = new Sequelize('graphql_sequelize_test', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.sqlite',
});

module.exports = sequelize;
