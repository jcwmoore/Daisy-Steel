var sequelize = require('sequelize');
var db = require('../index/sequelize');

module.exports = db.define('WeatherObservation', {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    timeStamp: { type: sequelize.DATE, allowNull: false, field: 'TimeStamp' },
    temperature: { type: sequelize.FLOAT, allowNull: true, field: 'Temperature' },
    humidity: { type: sequelize.FLOAT, allowNull: true, field: 'Humidity' },
}, {
    tableName: 'WeatherObservation'
});
