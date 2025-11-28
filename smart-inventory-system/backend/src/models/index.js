const Item = require('./Item');
const Supplier = require('./Supplier');
const Alert = require('./Alert');

// Define Associations
Item.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Supplier.hasMany(Item, { foreignKey: 'supplierId', as: 'items' });

Item.hasMany(Alert, { foreignKey: 'itemId', as: 'alerts' });
Alert.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });

module.exports = {
  Item,
  Supplier,
  Alert
};