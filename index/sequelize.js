var sequelize = require('sequelize');
module.exports = new sequelize('daisy.db3', null, null, { dialect: 'sqlite', storage: './teal.db3' });