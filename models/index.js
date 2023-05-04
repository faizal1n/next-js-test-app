'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const config = require(__dirname + '/../database/config/config.js');
const basename = path.basename(__filename);
const db = {};

const usedConfig = config.development;

let sequelize;
sequelize = new Sequelize(usedConfig);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
