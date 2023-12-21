const { DataTypes } = require('sequelize');
const { UUIDV4 } = require('uuid');

module.exports = (sequelize) => {
  const Income = sequelize.define('income', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'income'
  });
  return Income;
};


