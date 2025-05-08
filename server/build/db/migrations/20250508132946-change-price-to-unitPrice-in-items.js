'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('items', 'price', 'unitPrice');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('items', 'unitPrice', 'price');
  }
};
