'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('product_items', 'amount', 'quantity');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('product_items', 'quantity', 'amount');
  }
};
