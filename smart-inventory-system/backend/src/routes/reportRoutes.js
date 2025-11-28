const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get full report
router.get('/full', reportController.getFullReport);

// Get inventory report
router.get('/inventory', reportController.getInventoryReport);

// Get supplier report
router.get('/suppliers', reportController.getSupplierReport);

// Get alerts report
router.get('/alerts', reportController.getAlertsReport);

module.exports = router;