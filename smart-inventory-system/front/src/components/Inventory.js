import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import SuccessAlert from './common/SuccessAlert';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    quantity: '',
    price: '',
    reorderLevel: '5',
    supplierId: ''
  });

  useEffect(() => {
    fetchItems();
    fetchSuppliers();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await apiClient.get('/api/items');
      if (response.data.success) {
        setItems(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch items');
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await apiClient.get('/api/suppliers');
      if (response.data.success) {
        setSuppliers(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.quantity || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        // Update
        const response = await apiClient.put(`/api/items/${editingId}`, formData);
        if (response.data.success) {
          setSuccess('Item updated successfully');
          setEditingId(null);
        }
      } else {
        // Create
        const response = await apiClient.post('/api/items', formData);
        if (response.data.success) {
          setSuccess('Item created successfully');
        }
      }
      
      setFormData({
        name: '',
        sku: '',
        description: '',
        quantity: '',
        price: '',
        reorderLevel: '5',
        supplierId: ''
      });
      setShowForm(false);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      sku: item.sku,
      description: item.description || '',
      quantity: item.quantity,
      price: item.price,
      reorderLevel: item.reorderLevel,
      supplierId: item.supplierId || ''
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await apiClient.delete(`/api/items/${id}`);
        if (response.data.success) {
          setSuccess('Item deleted successfully');
          fetchItems();
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete item');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      sku: '',
      description: '',
      quantity: '',
      price: '',
      reorderLevel: '5',
      supplierId: ''
    });
  };

  if (loading) return <LoadingSpinner message="Loading inventory..." />;

  return (
    <div className="inventory">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {success && <SuccessAlert message={success} onClose={() => setSuccess(null)} />}

      <div className="d-flex justify-between align-center mb-20">
        <h2>Inventory Management</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            + Add Item
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-20">
          <div className="card-header">{editingId ? 'Edit Item' : 'Add New Item'}</div>
          <form onSubmit={handleSubmit}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="form-group">
                <label>Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Laptop"
                  required
                />
              </div>

              <div className="form-group">
                <label>SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="e.g., LAP-001"
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (Rs.) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Reorder Level</label>
                <input
                  type="number"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Supplier</label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Item description..."
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Item' : 'Create Item'}
              </button>
              <button 
                type="button" 
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {items.length > 0 ? (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>
                      <span className={item.quantity <= item.reorderLevel ? 'badge badge-danger' : ''}>
                        {item.quantity}
                      </span>
                    </td>
                    <td>Rs. {item.price}</td>
                    <td>{item.supplier?.name || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn-primary btn-small"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <p>No items found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;