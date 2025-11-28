import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import SuccessAlert from './common/SuccessAlert';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'General',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/suppliers');
      if (response.data.success) {
        setSuppliers(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch suppliers');
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

    if (!formData.name) {
      setError('Supplier name is required');
      return;
    }

    try {
      if (editingId) {
        const response = await apiClient.put(`/api/suppliers/${editingId}`, formData);
        if (response.data.success) {
          setSuccess('Supplier updated successfully');
          setEditingId(null);
        }
      } else {
        const response = await apiClient.post('/api/suppliers', formData);
        if (response.data.success) {
          setSuccess('Supplier created successfully');
        }
      }

      setFormData({
        name: '',
        type: 'General',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: ''
      });
      setShowForm(false);
      fetchSuppliers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save supplier');
    }
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      type: supplier.type,
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      city: supplier.city || '',
      country: supplier.country || ''
    });
    setEditingId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        const response = await apiClient.delete(`/api/suppliers/${id}`);
        if (response.data.success) {
          setSuccess('Supplier deleted successfully');
          fetchSuppliers();
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete supplier');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'General',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: ''
    });
  };

  if (loading) return <LoadingSpinner message="Loading suppliers..." />;

  return (
    <div className="suppliers">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {success && <SuccessAlert message={success} onClose={() => setSuccess(null)} />}

      <div className="d-flex justify-between align-center mb-20">
        <h2>Supplier Management</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            + Add Supplier
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-20">
          <div className="card-header">{editingId ? 'Edit Supplier' : 'Add New Supplier'}</div>
          <form onSubmit={handleSubmit}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="form-group">
                <label>Supplier Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., ABC Supplies"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option>General</option>
                  <option>Local</option>
                  <option>International</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1-555-0100"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Supplier address..."
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Supplier' : 'Create Supplier'}
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

      {suppliers.length > 0 ? (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.type}</td>
                    <td>{supplier.email || 'N/A'}</td>
                    <td>{supplier.phone || 'N/A'}</td>
                    <td>{supplier.city || 'N/A'}</td>
                    <td>{supplier.itemsCount || 0}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="btn-primary btn-small"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
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
          <p>No suppliers found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Suppliers;