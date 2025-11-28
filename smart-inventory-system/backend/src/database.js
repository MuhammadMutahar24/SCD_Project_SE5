require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'smart_inventory',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '12345678',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    timezone: '+05:00'
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to database:', err.message);
  });

module.exports = sequelize;