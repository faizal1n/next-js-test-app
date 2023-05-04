// import process from 'process';

// const config = {
//   'default': {
//     "username": process.env.DB_USER,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_NAME,
//     "host": process.env.DB_HOST,
//     "dialect": process.env.DB_DIALECT,
//     "logging": false,
//     dialectOptions: {
//     },
//   }
// };

// export default config;

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
  }
}
