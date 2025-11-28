const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { validateSupplier } = require('../middleware/validators');

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// Get supplier by id
router.get('/:id', supplierController.getSupplierById);

// Create supplier
router.post('/', validateSupplier, supplierController.createSupplier);

// Update supplier
router.put('/:id', supplierController.updateSupplier);

// Delete supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;