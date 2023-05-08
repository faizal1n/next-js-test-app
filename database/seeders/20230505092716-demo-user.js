'use strict';

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND);
const salt = bcrypt.genSaltSync(saltRounds);

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
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'Admin',
        last_name: 'NextProduct',
        username: 'admin.nextproduct@maildrop.cc',
        email: 'admin.nextproduct@maildrop.cc',
        password: bcrypt.hashSync('password1234', salt),
        is_active: true,
        profile_image: 'https://via.placeholder.com/80x80?text=Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Staff',
        last_name: 'NextProduct',
        username: 'staff.nextproduct@maildrop.cc',
        email: 'staff.nextproduct@maildrop.cc',
        password: bcrypt.hashSync('password1234', salt),
        is_active: true,
        profile_image: 'https://via.placeholder.com/80x80?text=Staff',
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
    return queryInterface.bulkDelete('users', null, {});
  }
};
