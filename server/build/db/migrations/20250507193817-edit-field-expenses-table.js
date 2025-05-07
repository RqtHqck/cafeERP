'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('expenses', 'transaction_date', 'transactionDate');
    await queryInterface.renameColumn('payments', 'transaction_date', 'transactionDate');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('expenses', 'transactionDate', 'transaction_date');
    await queryInterface.renameColumn('payments', 'transactionDate', 'transaction_date');
  }
};