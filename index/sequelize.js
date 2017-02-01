var sequelize = require('sequelize');
var config = require('../.config');

module.exports = new sequelize(config.db.name, config.db.username, config.db.password, config.db.options);