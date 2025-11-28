import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/reports/full');
      
      if (response.data.success) {
        setReport(response.data.data);
      } else {
        setError('Failed to load report data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  return (
    <div className="dashboard">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {report && (
        <>
          {/* Summary Stats */}
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total Items</h3>
              <div className="stat-value">{report.summary?.totalItems || 0}</div>
            </div>
            <div className="stat-card">
              <h3>Total Suppliers</h3>
              <div className="stat-value">{report.summary?.totalSuppliers || 0}</div>
            </div>
            <div className="stat-card">
              <h3>Active Alerts</h3>
              <div className="stat-value" style={{ color: '#dc3545' }}>
                {report.summary?.activeAlerts || 0}
              </div>
            </div>
            <div className="stat-card">
              <h3>Low Stock Items</h3>
              <div className="stat-value" style={{ color: '#ffc107' }}>
                {report.summary?.lowStockItems || 0}
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          {report.alerts && report.alerts.length > 0 && (
            <div className="card">
              <div className="card-header">Recent Alerts</div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.alerts.slice(0, 5).map(alert => (
                      <tr key={alert.id}>
                        <td>{alert.itemName}</td>
                        <td>{alert.type}</td>
                        <td>
                          <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-${alert.status === 'Active' ? 'warning' : 'success'}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td>{alert.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inventory Overview */}
          {report.items && report.items.length > 0 && (
            <div className="card">
              <div className="card-header">Inventory Overview</div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>SKU</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.items.slice(0, 10).map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.sku}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price}</td>
                        <td>
                          {item.labels.map((label, idx) => (
                            <span 
                              key={idx} 
                              className={`badge badge-${
                                label === 'Low Stock' ? 'warning' :
                                label === 'Out of Stock' ? 'danger' :
                                label === 'High Priority' ? 'primary' :
                                'info'
                              }`}
                            >
                              {label}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;