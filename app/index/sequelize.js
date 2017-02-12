var sequelize = require('sequelize');
var config = global.config;

module.exports = new sequelize(config.db.name, config.db.username, config.db.password, config.db.options);