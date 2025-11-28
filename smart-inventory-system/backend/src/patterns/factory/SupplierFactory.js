class SupplierFactory {
  createSupplier(type, name, email, phone, address, city, country) {
    let supplier;

    switch(type.toLowerCase()) {
      case 'local':
        supplier = { 
          type: 'Local', 
          name, 
          email, 
          phone, 
          address, 
          city, 
          country 
        };
        break;
      case 'international':
        supplier = { 
          type: 'International', 
          name, 
          email, 
          phone, 
          address, 
          city, 
          country 
        };
        break;
      default:
        supplier = { 
          type: 'General', 
          name, 
          email, 
          phone, 
          address, 
          city, 
          country 
        };
    }

    return supplier;
  }
}

module.exports = new SupplierFactory();