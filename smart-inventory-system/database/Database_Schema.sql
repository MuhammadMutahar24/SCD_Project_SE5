-- Create Database
CREATE DATABASE IF NOT EXISTS smart_inventory;
USE smart_inventory;

-- ==========================================
-- TABLE 1: SUPPLIERS
-- ==========================================
CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('Local', 'International', 'General') DEFAULT 'General',
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_city (city),
  UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- TABLE 2: ITEMS
-- ==========================================
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  quantity INT NOT NULL DEFAULT 0,
  price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  priority BOOLEAN DEFAULT FALSE,
  reorderLevel INT DEFAULT 5,
  supplierId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sku (sku),
  INDEX idx_quantity (quantity),
  INDEX idx_supplier (supplierId),
  FOREIGN KEY (supplierId) REFERENCES suppliers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_quantity CHECK (quantity >= 0),
  CONSTRAINT chk_price CHECK (price >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- TABLE 3: ALERTS
-- ==========================================
CREATE TABLE IF NOT EXISTS alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  itemId INT NOT NULL,
  message TEXT NOT NULL,
  type ENUM('Low Stock', 'Out of Stock', 'Reorder', 'Info', 'High Priority') DEFAULT 'Info',
  severity ENUM('Critical', 'High', 'Medium', 'Low') DEFAULT 'Low',
  status ENUM('Active', 'Resolved', 'Dismissed') DEFAULT 'Active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_severity (severity),
  INDEX idx_item (itemId),
  FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- INSERT SUPPLIERS
-- ==========================================
INSERT INTO suppliers (name, type, email, phone, address, city, country, createdAt, updatedAt) VALUES
('Tech Corp International', 'International', 'contact@techcorp.com', '+1-555-0100', '123 Tech Street', 'New York', 'USA', NOW(), NOW()),
('Local Supplies Ltd', 'Local', 'info@localsupplies.com', '+92-300-1234567', '45 Market Road', 'Karachi', 'Pakistan', NOW(), NOW()),
('Global Electronics', 'International', 'sales@globalelec.com', '+44-20-7946-0958', '789 Innovation Ave', 'London', 'UK', NOW(), NOW()),
('Premium Furnishings', 'Local', 'office@premiumfurn.com', '+92-21-2345678', '12 Business Park', 'Lahore', 'Pakistan', NOW(), NOW()),
('Office Essentials Co', 'General', 'support@officeessen.com', '+1-800-555-0199', '456 Commerce Blvd', 'Chicago', 'USA', NOW(), NOW());

-- ==========================================
-- INSERT ITEMS
-- ==========================================
INSERT INTO items (name, sku, description, quantity, price, priority, reorderLevel, supplierId, createdAt, updatedAt) VALUES
('Dell Laptop XPS 13', 'LAP-DELL-001', 'High-performance laptop with Intel i7 processor', 15, 85000.00, 1, 5, 1, NOW(), NOW()),
('HP Laptop Pavilion', 'LAP-HP-001', 'Budget-friendly laptop for office work', 8, 45000.00, 0, 5, 1, NOW(), NOW()),
('MacBook Pro 14', 'LAP-APPLE-001', 'Professional laptop with M1 chip', 3, 180000.00, 1, 2, 1, NOW(), NOW()),
('Desktop Monitor LG 27"', 'MON-LG-001', '4K Ultra HD Monitor with USB-C', 22, 35000.00, 0, 5, 1, NOW(), NOW()),
('Wireless Mouse Logitech', 'MOUSE-LOG-001', 'Ergonomic wireless mouse', 45, 2500.00, 0, 20, 1, NOW(), NOW()),
('Executive Office Chair', 'CHAIR-EXEC-001', 'Leather executive chair with lumbar support', 7, 22000.00, 0, 3, 4, NOW(), NOW()),
('Office Desk Oak Wood', 'DESK-OAK-001', 'Solid oak wood office desk 1.5m', 12, 18000.00, 0, 5, 4, NOW(), NOW()),
('Meeting Table Glass Top', 'TABLE-GLASS-001', 'Glass top conference table 2.4m', 4, 42000.00, 0, 2, 4, NOW(), NOW()),
('Storage Cabinet Metal', 'CABINET-METAL-001', '4-tier metal storage cabinet', 18, 8500.00, 0, 8, 4, NOW(), NOW()),
('A4 Paper Ream White', 'PAPER-A4-001', 'Premium quality A4 paper - 500 sheets', 120, 800.00, 0, 50, 5, NOW(), NOW()),
('Ballpoint Pens Blue Pack', 'PEN-BLUE-001', 'Box of 50 blue ballpoint pens', 85, 400.00, 0, 40, 5, NOW(), NOW()),
('Notebook 100 Pages', 'NOTEBOOK-001', 'Spiral notebook 100 pages lined', 200, 350.00, 0, 100, 5, NOW(), NOW()),
('Sticky Notes 3x3 Neon', 'NOTES-NEON-001', 'Pack of 12 neon sticky note pads', 95, 250.00, 0, 50, 5, NOW(), NOW()),
('USB-C Cable 2M', 'CABLE-USBC-001', 'High-speed USB-C charging cable', 156, 1200.00, 0, 50, 1, NOW(), NOW()),
('External Hard Drive 1TB', 'HDD-EXTERNAL-001', 'External HDD 1TB USB 3.0', 28, 6500.00, 0, 10, 1, NOW(), NOW()),
('Desk Lamp LED', 'LAMP-LED-001', 'LED desk lamp with USB charging', 33, 3500.00, 0, 15, 5, NOW(), NOW()),
('Cable Organizer', 'ORGANIZER-CABLE-001', 'Silicone cable organizer set', 67, 800.00, 0, 30, 5, NOW(), NOW()),
('Emergency Backup Generator', 'GEN-EMERGENCY-001', '5KW Emergency Power Generator', 2, 150000.00, 1, 3, 1, NOW(), NOW()),
('Laser Printer HP Color', 'PRINTER-HP-001', 'HP Color LaserJet Pro Printer', 1, 75000.00, 1, 2, 3, NOW(), NOW()),
('Server Rack 42U', 'RACK-42U-001', '42U Server Rack with PDU', 1, 95000.00, 1, 1, 3, NOW(), NOW());

-- ==========================================
-- INSERT ALERTS
-- ==========================================
INSERT INTO alerts (itemName, itemId, message, type, severity, status, createdAt, updatedAt) VALUES
('A4 Paper Ream White', 10, 'Stock for A4 Paper is running low. Current: 120 units', 'Low Stock', 'Medium', 'Active', NOW(), NOW()),
('USB-C Cable 2M', 15, 'Stock for USB-C Cable is running low. Current: 156 units', 'Low Stock', 'Low', 'Active', NOW(), NOW()),
('Ballpoint Pens Blue Pack', 11, 'Stock for Ballpoint Pens is running low. Current: 85 units', 'Low Stock', 'Low', 'Resolved', NOW(), NOW()),
('Server Rack 42U', 20, 'Server Rack 42U is out of stock! Reorder immediately!', 'Out of Stock', 'Critical', 'Active', NOW(), NOW()),
('Laser Printer HP Color', 20, 'Laser Printer HP Color is out of stock! Reorder immediately!', 'Out of Stock', 'Critical', 'Active', NOW(), NOW()),
('Emergency Backup Generator', 19, 'Reorder level reached for Emergency Backup Generator. Consider ordering more units.', 'Reorder', 'High', 'Active', NOW(), NOW()),
('Dell Laptop XPS 13', 1, 'New shipment of Dell Laptop XPS 13 received. 15 units added to inventory.', 'Info', 'Low', 'Resolved', NOW(), NOW()),
('Office Desk Oak Wood', 7, 'Office Desk Oak Wood maintenance scheduled for next week.', 'Info', 'Low', 'Dismissed', NOW(), NOW()),
('MacBook Pro 14', 3, 'FRAGILE ITEM: MacBook Pro 14 requires special handling and storage conditions.', 'High Priority', 'High', 'Active', NOW(), NOW());

-- ==========================================
-- VERIFICATION
-- ==========================================
SELECT 
    'Database Setup Complete!' as Status,
    (SELECT COUNT(*) FROM suppliers) as Suppliers,
    (SELECT COUNT(*) FROM items) as Items,
    (SELECT COUNT(*) FROM alerts) as Alerts;