'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('products', [
      {
        name: 'Kaca Spion Standard',
        image: 'https://via.placeholder.com/100x100?text=Spion',
        description: 'Deskripsi Kaca Spion Standard',
        price: 20000,
        created_by: 1,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lampu Sein Motor Standard',
        image: 'https://via.placeholder.com/200x100?text=Sein',
        description: 'Deskripsi Lampu Sein Motor Standard',
        price: 100000,
        created_by: 2,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ban Luar Belakang Standard',
        image: 'https://via.placeholder.com/200x100?text=Ban',
        description: 'Deskripsi Ban Luar Belakang Standard',
        price: 100000,
        created_by: 2,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('products', null, {});
  }
};
