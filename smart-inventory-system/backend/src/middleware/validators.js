// Input Validation Middleware

const validateItem = (req, res, next) => {
  const { name, sku, quantity, price } = req.body;

  if (!name || !sku || quantity === undefined || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, sku, quantity, price'
    });
  }

  const parsedQuantity = Number(quantity);
  const parsedPrice = Number(price);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be a non-negative integer'
    });
  }

  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({
      success: false,
      message: 'Price must be a non-negative number'
    });
  }

  req.body.quantity = parsedQuantity;
  req.body.price = parsedPrice;

  next();
};

const validateSupplier = (req, res, next) => {
  const { name, type } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Supplier name is required'
    });
  }

  if (type && !['Local', 'International', 'General'].includes(type)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid supplier type'
    });
  }

  next();
};

const validateAlert = (req, res, next) => {
  const { itemName, message } = req.body;

  if (!itemName || !message) {
    return res.status(400).json({
      success: false,
      message: 'itemName and message are required'
    });
  }

  next();
};

module.exports = {
  validateItem,
  validateSupplier,
  validateAlert
};