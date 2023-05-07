// dotenv used for non application CLI command
const dotenv = require("dotenv")
dotenv.config();

const process = require('process');

module.exports = {
  'development': {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false,
    dialectOptions: {
    },

    // log seeder execution into database
    "seederStorage":'sequelize'
  }
}
