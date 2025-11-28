import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import SuccessAlert from './common/SuccessAlert';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchAlerts();
    // Refresh alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await apiClient.get('/api/alerts');
      if (response.data.success) {
        setAlerts(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (alertId, newStatus) => {
    try {
      const response = await apiClient.patch(`/api/alerts/${alertId}/status`, {
        status: newStatus
      });

      if (response.data.success) {
        setSuccess(`Alert marked as ${newStatus}`);
        fetchAlerts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update alert status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        const response = await apiClient.delete(`/api/alerts/${id}`);
        if (response.data.success) {
          setSuccess('Alert deleted successfully');
          fetchAlerts();
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete alert');
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading alerts..." />;

  const activeAlerts = alerts.filter(a => a.status === 'Active');
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved');
  const dismissedAlerts = alerts.filter(a => a.status === 'Dismissed');

  return (
    <div className="alerts">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      {success && <SuccessAlert message={success} onClose={() => setSuccess(null)} />}

      <h2 className="mb-20">Alert Management</h2>

      {/* Alert Summary */}
      <div className="stats-container mb-20">
        <div className="stat-card">
          <h3>Active</h3>
          <div className="stat-value" style={{ color: '#dc3545' }}>
            {activeAlerts.length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <div className="stat-value" style={{ color: '#28a745' }}>
            {resolvedAlerts.length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Dismissed</h3>
          <div className="stat-value" style={{ color: '#6c757d' }}>
            {dismissedAlerts.length}
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="card mb-20">
          <div className="card-header" style={{ borderLeftColor: '#dc3545' }}>Active Alerts</div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Message</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeAlerts.map(alert => (
                  <tr key={alert.id}>
                    <td>{alert.itemName}</td>
                    <td>{alert.type}</td>
                    <td>
                      <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td>{alert.message}</td>
                    <td>{new Date(alert.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleStatusChange(alert.id, 'Resolved')}
                        className="btn-success btn-small"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleStatusChange(alert.id, 'Dismissed')}
                        className="btn-warning btn-small"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleDelete(alert.id)}
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
      )}

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div className="card mb-20">
          <div className="card-header" style={{ borderLeftColor: '#28a745' }}>Resolved Alerts</div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Resolved</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resolvedAlerts.map(alert => (
                  <tr key={alert.id}>
                    <td>{alert.itemName}</td>
                    <td>{alert.type}</td>
                    <td>{alert.message}</td>
                    <td>{new Date(alert.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(alert.id)}
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
      )}

      {alerts.length === 0 && (
        <div className="card text-center">
          <p>No alerts at the moment. Everything looks good!</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;