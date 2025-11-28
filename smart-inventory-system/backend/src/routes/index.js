const itemRoutes = require('./itemRoutes');
const supplierRoutes = require('./supplierRoutes');
const alertRoutes = require('./alertRoutes');
const reportRoutes = require('./reportRoutes');

module.exports = (app) => {
  app.use('/api/items', itemRoutes);
  app.use('/api/suppliers', supplierRoutes);
  app.use('/api/alerts', alertRoutes);
  app.use('/api/reports', reportRoutes);
};