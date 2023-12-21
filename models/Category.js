const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('uuid');

module.exports = ( sequelize ) => {
  const Category = sequelize.define('category', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    money: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    food: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    clothing_accesories: {
      type: DataTypes.STRING,
      allowNull: true
    },
    electronics: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entertainment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transport_travel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    groceries: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {
    tableName: 'category'
  });
  return Category;
};

