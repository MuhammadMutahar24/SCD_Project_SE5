import React, { useState } from 'react';
import './styles/index.css';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Suppliers from './components/Suppliers';
import Alerts from './components/Alerts';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderComponent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'suppliers':
        return <Suppliers />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>📦 Smart Inventory Management System</h1>
      </header>

      <nav>
        <div className="nav-container">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'active' : ''}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={activeTab === 'inventory' ? 'active' : ''}
          >
            📦 Inventory
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={activeTab === 'suppliers' ? 'active' : ''}
          >
            🏭 Suppliers
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={activeTab === 'alerts' ? 'active' : ''}
          >
            🔔 Alerts
          </button>
        </div>
      </nav>

      <main>
        <div className="container">
          {renderComponent()}
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', color: '#666', borderTop: '1px solid #eee' }}>
        <p>© 2025 Smart Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;