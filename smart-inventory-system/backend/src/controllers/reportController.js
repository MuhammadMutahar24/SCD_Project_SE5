const ReportFacade = require('../patterns/facade/ReportFacade');

const reportFacade = new ReportFacade();

// Get full report
const getFullReport = async (req, res, next) => {
  try {
    const report = await reportFacade.getFullReport();

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// Get inventory report
const getInventoryReport = async (req, res, next) => {
  try {
    const items = await reportFacade.getInventoryReport();

    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// Get supplier report
const getSupplierReport = async (req, res, next) => {
  try {
    const suppliers = await reportFacade.getSupplierReport();

    res.status(200).json({
      success: true,
      data: suppliers
    });
  } catch (error) {
    next(error);
  }
};

// Get alerts report
const getAlertsReport = async (req, res, next) => {
  try {
    const alerts = await reportFacade.getAlerts();

    res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFullReport,
  getInventoryReport,
  getSupplierReport,
  getAlertsReport
};