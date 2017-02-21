'use strict';

module.exports = {
  up: function (queryInterface, sequelize) {
    return queryInterface.createTable('WeatherObservation', {
      id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
      timeStamp: { type: sequelize.DATE, allowNull: false, field: 'TimeStamp' },
      temperature: { type: sequelize.FLOAT, allowNull: true, field: 'Temperature' },
      humidity: { type: sequelize.FLOAT, allowNull: true, field: 'Humidity' },
      createdAt: { type: sequelize.DATE },
      updatedAt: { type: sequelize.DATE },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('WeatherObservation');
    
  }
};
