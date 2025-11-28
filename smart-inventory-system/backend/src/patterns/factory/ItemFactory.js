class ItemFactory {
  createItem(type, name, sku, quantity, price, supplierId) {
    let item;

    switch(type.toLowerCase()) {
      case 'electronic':
        item = { 
          type: 'Electronic', 
          name, 
          sku, 
          quantity, 
          price, 
          supplierId,
          description: 'Electronic item'
        };
        break;
      case 'furniture':
        item = { 
          type: 'Furniture', 
          name, 
          sku, 
          quantity, 
          price, 
          supplierId,
          description: 'Furniture item'
        };
        break;
      case 'stationery':
        item = { 
          type: 'Stationery', 
          name, 
          sku, 
          quantity, 
          price, 
          supplierId,
          description: 'Stationery item'
        };
        break;
      default:
        item = { 
          type: 'General', 
          name, 
          sku, 
          quantity, 
          price, 
          supplierId,
          description: 'General item'
        };
    }

    return item;
  }
}

module.exports = new ItemFactory();