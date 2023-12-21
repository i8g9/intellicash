const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('intellicash', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

const User = require('../../models/User')(sequelize, Sequelize);
const Transaction = require('../../models/Transaction')(sequelize, Sequelize);
module.exports = {
  sequelize,
  User,
  Transaction,
};
