var sequelize = require('sequelize');
var db = require('../index/sequelize');

module.exports = db.define('InventoryItem', {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    name: { type:sequelize.STRING, allowNull: false, field: 'Name' },
    category: { type:sequelize.STRING, allowNull: false, field: 'Category' },
    idealLow: { type: sequelize.FLOAT, allowNull: false, field: 'IdealLow' },
    idealHigh: { type: sequelize.FLOAT, allowNull: false, field: 'IdealHigh' },
    currentCount: { type: sequelize.FLOAT, allowNull: false, field: 'CurrentCount' }
}, {
    tableName: 'InventoryItem'
});
