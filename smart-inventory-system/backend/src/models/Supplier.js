const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Supplier name cannot be empty' },
      len: [3, 100]
    }
  },
  type: {
    type: DataTypes.ENUM('Local', 'International', 'General'),
    defaultValue: 'General'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: { msg: 'Invalid email format' }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
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
  tableName: 'suppliers',
  timestamps: true
});

module.exports = Supplier;