const { Supplier, Item } = require('../models');

// Get all suppliers
const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll({
      include: [{ model: Item, as: 'items', attributes: ['id', 'name', 'quantity'] }]
    });

    res.status(200).json({
      success: true,
      data: suppliers,
      count: suppliers.length
    });
  } catch (error) {
    next(error);
  }
};

// Get single supplier
const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id, {
      include: [{ model: Item, as: 'items', attributes: ['id', 'name', 'quantity'] }]
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// Create supplier
const createSupplier = async (req, res, next) => {
  try {
    const { name, type, email, phone, address, city, country } = req.body;

    const supplier = await Supplier.create({
      name,
      type: type || 'General',
      email,
      phone,
      address,
      city,
      country
    });

    res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// Update supplier
const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, email, phone, address, city, country } = req.body;

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    await supplier.update({
      name: name || supplier.name,
      type: type || supplier.type,
      email: email || supplier.email,
      phone: phone || supplier.phone,
      address: address || supplier.address,
      city: city || supplier.city,
      country: country || supplier.country
    });

    res.status(200).json({
      success: true,
      message: 'Supplier updated successfully',
      data: supplier
    });
  } catch (error) {
    next(error);
  }
};

// Delete supplier
const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    await supplier.destroy();

    res.status(200).json({
      success: true,
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};