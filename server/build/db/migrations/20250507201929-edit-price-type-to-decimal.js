'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('items', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    await queryInterface.changeColumn('expenses', 'total_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    await queryInterface.changeColumn('payments', 'total_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
    await queryInterface.changeColumn('products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
