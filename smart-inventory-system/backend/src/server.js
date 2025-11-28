require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const errorHandler = require('./middleware/errorHandler');
const routeIndex = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routeIndex(app);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Sync database and start server
sequelize.sync({ alter: false }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Database sync error:', err);
  process.exit(1);
});

module.exports = app;