const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { validateAlert } = require('../middleware/validators');

// Get all alerts
router.get('/', alertController.getAllAlerts);

// Get alert by id
router.get('/:id', alertController.getAlertById);

// Create alert
router.post('/', validateAlert, alertController.createAlert);

// Update alert status
router.patch('/:id/status', alertController.updateAlertStatus);

// Delete alert
router.delete('/:id', alertController.deleteAlert);

module.exports = router;