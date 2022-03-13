require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'Demo User',
      email: 'demo@gmail.com',
      password: await bcrypt.hash(process.env.DEMO_PASS, saltRounds),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
