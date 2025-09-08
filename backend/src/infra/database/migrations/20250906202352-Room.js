'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true  
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      open_time:{
        type: Sequelize.TIME,
        allowNull: false,
      },
      close_time:{
        type: Sequelize.TIME,
        allowNull: false,
      },
      schedule_block:{
        type: Sequelize.JSON,
        allowNull: false,
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');

  }
};
