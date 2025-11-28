const { Item, Supplier, Alert } = require('../../models');
const { LabelDecorator } = require('../decorator/ItemDecorator');

class ReportFacade {
  constructor() {}

  async getInventoryReport() {
    try {
      const itemsFromDB = await Item.findAll({
        include: [{ model: Supplier, as: 'supplier', attributes: ['id', 'name'] }]
      });

      const items = itemsFromDB.map(item => {
        const labels = [];
        if (item.quantity <= item.reorderLevel) labels.push('Low Stock');
        if (item.quantity === 0) labels.push('Out of Stock');
        if (item.priority) labels.push('High Priority');
        if (item.name.toLowerCase().includes('fragile')) labels.push('Fragile');

        const decoratedItem = new LabelDecorator(item, labels);
        return {
          id: decoratedItem.id,
          name: decoratedItem.name,
          sku: item.sku,
          quantity: decoratedItem.quantity,
          price: item.price,
          supplier: item.supplier ? item.supplier.name : 'Not assigned',
          labels: decoratedItem.getLabels()
        };
      });

      return items;
    } catch (error) {
      console.error('Error in getInventoryReport:', error);
      throw new Error('Failed to generate inventory report');
    }
  }

  async getSupplierReport() {
    try {
      const suppliers = await Supplier.findAll({
        include: [{ 
          model: Item, 
          as: 'items', 
          attributes: ['id', 'name', 'quantity'],
          required: false 
        }]
      });

      return suppliers.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        type: supplier.type,
        email: supplier.email,
        phone: supplier.phone,
        itemsCount: supplier.items ? supplier.items.length : 0,
        items: supplier.items || []
      }));
    } catch (error) {
      console.error('Error in getSupplierReport:', error);
      throw new Error('Failed to generate supplier report');
    }
  }

  async getAlerts() {
    try {
      const alerts = await Alert.findAll({
        include: [{ model: Item, as: 'item', attributes: ['id', 'name', 'quantity'] }],
        order: [['createdAt', 'DESC']]
      });

      return alerts.map(alert => ({
        id: alert.id,
        itemName: alert.itemName,
        message: alert.message,
        type: alert.type,
        severity: alert.severity,
        status: alert.status,
        createdAt: alert.createdAt
      }));
    } catch (error) {
      console.error('Error in getAlerts:', error);
      throw new Error('Failed to generate alerts report');
    }
  }

  async getFullReport() {
    try {
      const [items, suppliers, alerts] = await Promise.all([
        this.getInventoryReport(),
        this.getSupplierReport(),
        this.getAlerts()
      ]);

      return {
        timestamp: new Date(),
        summary: {
          totalItems: items.length,
          totalSuppliers: suppliers.length,
          activeAlerts: alerts.filter(a => a.status === 'Active').length,
          lowStockItems: items.filter(i => i.labels.includes('Low Stock')).length,
          outOfStockItems: items.filter(i => i.labels.includes('Out of Stock')).length
        },
        items,
        suppliers,
        alerts
      };
    } catch (error) {
      console.error('Error in getFullReport:', error);
      throw new Error('Failed to generate full report');
    }
  }
}

module.exports = ReportFacade;