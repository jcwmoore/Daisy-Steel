var sequelize = require('sequelize');
var db = require('../index/sequelize');
var item = require('./item.model');

module.exports = db.define('InventoryTransaction', {
    id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    itemId: { type: sequelize.INTEGER, allowNull: false, field: 'InventoryItemId', references: { model: item, key: 'id' } },
    timeStamp: { type: sequelize.DATE, allowNull: false, field: 'TimeStamp' },
    transactionType: { type: sequelize.STRING, allowNull: false, field: 'TransactionType', validate: { isIn: [['ISSUE', 'RECEIPT']] } },
    amountCount: { type: sequelize.INTEGER, allowNull: false, field: 'AmountCount' },
    expireDate: { type: sequelize.DATE, allowNull: true, field: 'ExpireDate' },
}, {
    tableName: 'InventoryTransaction'
});
