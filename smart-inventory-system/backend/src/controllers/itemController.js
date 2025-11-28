const { Item, Supplier } = require('../models');

// Get all items
const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Supplier, as: 'supplier', attributes: ['id', 'name'] }]
    });
    
    res.status(200).json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    next(error);
  }
};

// Get single item
const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const item = await Item.findByPk(id, {
      include: [{ model: Supplier, as: 'supplier', attributes: ['id', 'name'] }]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Create item
const createItem = async (req, res, next) => {
  try {
    const { name, sku, description, quantity, price, priority, reorderLevel, supplierId } = req.body;

    const item = await Item.create({
      name,
      sku,
      description,
      quantity,
      price,
      priority: priority || false,
      reorderLevel: reorderLevel || 5,
      supplierId: supplierId || null
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Update item
const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, sku, description, quantity, price, priority, reorderLevel, supplierId } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.update({
      name: name || item.name,
      sku: sku || item.sku,
      description: description || item.description,
      quantity: quantity !== undefined ? quantity : item.quantity,
      price: price || item.price,
      priority: priority !== undefined ? priority : item.priority,
      reorderLevel: reorderLevel || item.reorderLevel,
      supplierId: supplierId || item.supplierId
    });

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.destroy();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update stock
const updateStock = async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'itemId and quantity are required'
      });
    }

    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    const oldQuantity = item.quantity;
    item.quantity = quantity;
    await item.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: {
        itemId: item.id,
        itemName: item.name,
        oldQuantity,
        newQuantity: quantity
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  updateStock
};