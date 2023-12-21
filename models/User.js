const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('uuid');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    user_id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    refresh_token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  }, {
    tableName: 'user',
  });
  return User;
}


