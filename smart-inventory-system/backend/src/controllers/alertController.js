const { Alert, Item } = require('../models');

// Get all alerts
const getAllAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.findAll({
      include: [{ model: Item, as: 'item', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    next(error);
  }
};

// Get alert by id
const getAlertById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alert = await Alert.findByPk(id, {
      include: [{ model: Item, as: 'item', attributes: ['id', 'name'] }]
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

// Create alert
const createAlert = async (req, res, next) => {
  try {
    const { itemName, itemId, message, type, severity } = req.body;

    const alert = await Alert.create({
      itemName,
      itemId,
      message,
      type: type || 'Low Stock',
      severity: severity || 'Medium',
      status: 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

// Update alert status
const updateAlertStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Resolved', 'Dismissed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const alert = await Alert.findByPk(id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    await alert.update({ status });

    res.status(200).json({
      success: true,
      message: 'Alert status updated successfully',
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

// Delete alert
const deleteAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alert = await Alert.findByPk(id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    await alert.destroy();

    res.status(200).json({
      success: true,
      message: 'Alert deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlerts,
  getAlertById,
  createAlert,
  updateAlertStatus,
  deleteAlert
};