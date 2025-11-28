const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Message cannot be empty' }
    }
  },
  type: {
    type: DataTypes.ENUM('Low Stock', 'Out of Stock', 'Reorder', 'Info'),
    defaultValue: 'Low Stock'
  },
  status: {
    type: DataTypes.ENUM('Active', 'Resolved', 'Dismissed'),
    defaultValue: 'Active'
  },
  severity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
    defaultValue: 'Medium'
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
  tableName: 'alerts',
  timestamps: true
});

module.exports = Alert;