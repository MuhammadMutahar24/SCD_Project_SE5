const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Item name cannot be empty' },
      len: [3, 100]
    }
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'SKU cannot be empty' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: { msg: 'Quantity must be an integer' },
      min: { args: [0], msg: 'Quantity cannot be negative' }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Price must be a valid decimal' },
      min: { args: [0], msg: 'Price cannot be negative' }
    }
  },
  priority: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reorderLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: { args: [0], msg: 'Reorder level cannot be negative' }
    }
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'items',
  timestamps: true
});

module.exports = Item;