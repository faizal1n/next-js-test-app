'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import config from '@/database/config/config.js';

const basename = path.basename(__filename);
const db = {};

let sequelize;
sequelize = new Sequelize(config);

const modelDirectory = process.cwd() + '/models/' || __dirname;

fs
  .readdirSync(modelDirectory)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file !== 'index.js');
  })
  .forEach(file => {
    const model = require('./'+file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
