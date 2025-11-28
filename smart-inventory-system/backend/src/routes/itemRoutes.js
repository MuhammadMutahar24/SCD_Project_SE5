const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { validateItem } = require('../middleware/validators');

// Get all items
router.get('/', itemController.getAllItems);

// Get item by id
router.get('/:id', itemController.getItemById);

// Create item
router.post('/', validateItem, itemController.createItem);

// Update item
router.put('/:id', itemController.updateItem);

// Delete item
router.delete('/:id', itemController.deleteItem);

// Update stock
router.post('/update-stock', itemController.updateStock);

module.exports = router;