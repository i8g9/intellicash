'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category', {
      userId: {
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
        allowNull: true,
      },
      clothing_accessories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      electronics: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entertainment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transport_travel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      groceries: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category');
  }
};
