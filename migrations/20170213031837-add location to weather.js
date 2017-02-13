'use strict';

module.exports = {
  up: function (queryInterface, sequelize) {
    queryInterface.addColumn('WeatherObservation', 'Location', { type:sequelize.STRING, allowNull: false, field: 'Location' });
  },

  down: function (queryInterface, sequelize) {
    queryInterface.removeColumn('WeatherObservation', 'Location');
  }
};
