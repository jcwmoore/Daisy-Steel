'use strict';

module.exports = {
  up: function (queryInterface, sequelize) {
    return queryInterface.createTable('InventoryItem', {
      id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
      name: { type:sequelize.STRING, allowNull: false, field: 'Name' },
      category: { type:sequelize.STRING, allowNull: false, field: 'Category' },
      idealLow: { type: sequelize.FLOAT, allowNull: false, field: 'IdealLow' },
      idealHigh: { type: sequelize.FLOAT, allowNull: false, field: 'IdealHigh' },
      currentCount: { type: sequelize.FLOAT, allowNull: false, field: 'CurrentCount' },
      createdAt: { type: sequelize.DATE },
      updatedAt: { type: sequelize.DATE },
    }).then(r1 => queryInterface.createTable('InventoryTransaction', {
      id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
      itemId: { type: sequelize.INTEGER, allowNull: false, field: 'InventoryItemId', references: { model: 'InventoryItem', key: 'Id' } },
      timeStamp: { type: sequelize.DATE, allowNull: false, field: 'TimeStamp' },
      transactionType: { type: sequelize.STRING, allowNull: false, field: 'TransactionType', validate: { isIn: [['ISSUE', 'RECEIPT']] } },
      amountCount: { type: sequelize.INTEGER, allowNull: false, field: 'AmountCount' },
      expireDate: { type: sequelize.DATE, allowNull: true, field: 'ExpireDate' },
      createdAt: { type: sequelize.DATE },
      updatedAt: { type: sequelize.DATE },
    }));
  },

  down: function (queryInterface, sequelize) {
    return queryInterface.dropTable('InventoryTransaction').then(r1 =>
      queryInterface.dropTable('InventoryItem'));
    
  }
};