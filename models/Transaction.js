const {DataTypes} = require('sequelize');

module.exports = ( sequelize ) => {
  const Transaction = sequelize.define('transaction', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.DATE
    },
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'transaction'
  });
  return Transaction;
}

