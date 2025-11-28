# Smart Inventory and Warehouse Management System

## Project Description

The Smart Inventory and Warehouse Management System is a comprehensive full-stack web application designed to streamline inventory tracking, supplier management, and alert notifications for warehouses and business operations. This system provides real-time monitoring of stock levels, automated alerts for low inventory and out-of-stock situations, and efficient supplier relationship management through an intuitive user interface.

The application implements a modern three-tier architecture comprising a React-based frontend, a Node.js/Express backend, and a MySQL database. The system demonstrates proficiency in database design, RESTful API development, and responsive user interface design. It serves as a practical implementation of inventory management principles combined with contemporary web development technologies.

### Key Features

The system provides the following functional capabilities:

- Real-time inventory tracking with quantity monitoring and reorder level management
- Comprehensive supplier management with contact information and categorization
- Automated alert system for low stock, out-of-stock, and reorder conditions
- Dashboard with statistical summaries and inventory value calculations
- Complete CRUD operations for inventory items, suppliers, and alerts
- Responsive design supporting desktop and mobile devices
- Search and filter functionality for efficient data retrieval
- Status management for alerts with resolved and dismissed states

### Technology Stack

The project utilizes the following technology ecosystem:

- Frontend: React.js with modern JavaScript (ES6+)
- Backend: Node.js with Express.js framework
- Database: MySQL with Sequelize ORM
- HTTP Protocol: RESTful API architecture
- Styling: CSS3 with responsive design patterns
- Package Management: npm (Node Package Manager)

---

## How to Run the System

### Prerequisites

Before running the application, ensure the following software is installed on your system:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MySQL Server (v5.7 or higher)
- Git (for version control)

### Installation and Setup

#### Step 1: Clone the Repository

Open your terminal or command prompt and execute the following command to clone the project repository:

```bash
git clone <repository-url>
cd smart-inventory-system
```

#### Step 2: Database Setup

Execute the provided SQL script to create the database schema and populate initial data:

```bash
mysql -u root -p < database/setup.sql
```

When prompted, enter your MySQL root password. The default password used in development is "12345678".

Alternatively, if you prefer to create the database manually, open MySQL CLI and run:

```bash
mysql -u root -p
# Enter password: 12345678
```

Then paste the complete SQL script containing CREATE DATABASE, CREATE TABLE, and INSERT statements.

#### Step 3: Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Configure the database connection by creating or updating the .env file in the backend directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678
DB_NAME=smart_inventory
DB_PORT=3306
NODE_ENV=development
PORT=5000
```

Start the backend server:

```bash
npm start
```

Expected output indicates successful startup:
```
Database connection established
Backend running on http://localhost:5000
```

#### Step 4: Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

The application will automatically open in your default web browser at http://localhost:3000

#### Step 5: Access the Application

The complete system is now running with the following access points:

- Frontend Application: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:3306 (MySQL)

### Running the Application

Once all components are running, the application provides the following workflow:

1. Navigate to the Dashboard tab to view summary statistics
2. Access the Inventory tab to view, add, update, or delete items
3. Manage suppliers through the Suppliers tab
4. Monitor system alerts in the Alerts tab
5. All operations automatically sync between frontend and backend

### Stopping the Application

To stop the application, press Ctrl+C in each running terminal window (backend and frontend).

---

## Dependencies

### Backend Dependencies

The backend application requires the following npm packages:

- **express** (v4.18.2) - Web application framework for Node.js
- **mysql2** (v2.3.3) - MySQL client for Node.js
- **sequelize** (v6.25.3) - Promise-based ORM for Node.js
- **cors** (v2.8.5) - Cross-Origin Resource Sharing middleware
- **dotenv** (v16.0.3) - Environment variable management
- **nodemon** (v2.0.20) - Automatic server restart on file changes (development)

Install backend dependencies:
```bash
cd backend
npm install
```

### Frontend Dependencies

The frontend application requires the following npm packages:

- **react** (v18.2.0) - JavaScript library for building user interfaces
- **react-dom** (v18.2.0) - React package for working with the DOM
- **react-scripts** (v5.0.1) - Build scripts and configuration for Create React App
- **axios** (v1.3.4) - Promise-based HTTP client for API calls

Install frontend dependencies:
```bash
cd frontend
npm install
```

### System Dependencies

- **Node.js** - JavaScript runtime environment
- **npm** - Node package manager
- **MySQL Server** - Database management system

---

## Folder Structure

The project follows a modular architecture with clear separation of concerns. The folder structure is organized as follows:

```
smart-inventory-system/
├── backend/
│   ├── models/
│   │   ├── Supplier.js              - Supplier data model and schema
│   │   ├── Item.js                  - Item data model and schema
│   │   └── Alert.js                 - Alert data model and schema
│   ├── routes/
│   │   ├── suppliers.js             - Supplier API endpoints
│   │   ├── items.js                 - Item API endpoints
│   │   └── alerts.js                - Alert API endpoints
│   ├── controllers/
│   │   ├── supplierController.js    - Supplier business logic
│   │   ├── itemController.js        - Item business logic
│   │   └── alertController.js       - Alert business logic
│   ├── middleware/
│   │   └── errorHandler.js          - Global error handling middleware
│   ├── config/
│   │   └── database.js              - Database connection configuration
│   ├── .env                         - Environment variables (not in repo)
│   ├── package.json                 - Backend dependencies and scripts
│   ├── server.js                    - Main server file and Express app setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js         - Dashboard page component
│   │   │   ├── Inventory.js         - Inventory management component
│   │   │   ├── Suppliers.js         - Supplier management component
│   │   │   ├── Alerts.js            - Alerts display component
│   │   │   ├── Header.js            - Application header component
│   │   │   ├── Navigation.js        - Navigation menu component
│   │   │   └── ChatSimulator.js     - Chat/messaging simulator component
│   │   ├── styles/
│   │   │   └── index.css            - Global styles and theme variables
│   │   ├── utils/
│   │   │   └── api.js               - API client and HTTP utilities
│   │   ├── App.js                   - Main application component
│   │   ├── index.js                 - React application entry point
│   │   └── index.css                - Application styles
│   ├── public/
│   │   ├── index.html               - HTML template
│   │   └── favicon.ico              - Application icon
│   ├── .env                         - Environment variables (optional)
│   ├── package.json                 - Frontend dependencies and scripts
│
├── database/
│   ├── Smart_Inventory_Schema.sql   - Complete database schema and sample data
│
├── README.md                        - Project overview (this file)
```

### Folder Descriptions

**backend/** - Contains all server-side logic including models, routes, controllers, and database configuration. This directory handles all business logic, database operations, and API endpoint management.

**frontend/** - Contains React application files organized into components, styles, and utilities. This directory manages the user interface and client-side operations.

**database/** - Stores database initialization scripts, schema definitions, and optional backup files for database recovery.

---

## Known Issues

### Issue 1: Foreign Key Constraint Error During Data Insertion

**Description:** When attempting to insert data directly into the alerts table without first populating the items and suppliers tables, a foreign key constraint error occurs with message "Cannot add or update a child row: a foreign key constraint fails".

**Root Cause:** The alerts table has a foreign key reference to the items table. Alerts cannot be created if the referenced items do not exist in the database.

**Solution:** Always insert data in the following order:
1. First: Insert suppliers
2. Second: Insert items (which reference suppliers)
3. Third: Insert alerts (which reference items)

Alternatively, use the provided complete SQL setup script that maintains correct insertion order.

**Status:** This is expected behavior and not a bug. It enforces data integrity.

### Issue 2: CORS Policy Errors

**Description:** Frontend requests to the backend API may fail with "CORS policy: No 'Access-Control-Allow-Origin' header is present" error.

**Root Cause:** The CORS middleware may not be properly configured if the backend server is not running on port 5000 or if the frontend is not on port 3000.

**Solution:** 
1. Verify that the backend server is running on http://localhost:5000
2. Verify that the frontend is running on http://localhost:3000
3. Check that the CORS configuration in server.js includes the correct origins
4. Clear browser cache and refresh the page

**Status:** Resolved by ensuring proper port configuration and CORS middleware setup.

### Issue 3: Database Connection Failures

**Description:** Backend server fails to start with error "ECONNREFUSED 127.0.0.1:3306" indicating database connection failure.

**Root Cause:** MySQL server is not running or database credentials are incorrect in the .env file.

**Solution:**
1. Verify MySQL server is running:
   - Windows: Check Services in Task Manager
   - macOS: Check System Preferences or use brew services list
   - Linux: Use systemctl status mysql
2. Verify database credentials match in .env file
3. Default credentials are user: root, password: 12345678
4. Create database using: mysql -u root -p < setup.sql

**Status:** This is a configuration issue resolved by ensuring MySQL server is running with correct credentials.

### Issue 4: Port Already in Use

**Description:** Starting the backend server fails with error "Port 5000 is already in use" or similar for port 3000.

**Root Cause:** Another process is using the required port or a previous instance did not properly close.

**Solution:**
1. Find the process using the port (Windows):
   netstat -ano | findstr :5000
2. Kill the process (Windows):
   taskkill /PID <PID> /F
3. Alternative: Change the port in .env and server.js

**Status:** This is a system configuration issue that can be resolved by freeing the port.

### Issue 5: Missing Environment Variables

**Description:** Backend server crashes or behaves unexpectedly due to undefined environment variables.

**Root Cause:** The .env file is missing or incomplete with required variables.

**Solution:**
1. Create a .env file in the backend directory
2. Add all required variables:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=12345678
   DB_NAME=smart_inventory
   DB_PORT=3306
   NODE_ENV=development
   PORT=5000

**Status:** This is a setup issue resolved by properly configuring environment variables.

### Issue 6: API Response Delays

**Description:** API requests take longer than expected to complete, particularly on the first request.

**Root Cause:** This is typical behavior when database connection is first established or during initial component mounting.

**Solution:**
1. Verify database server performance
2. Check network connectivity
3. Ensure sufficient system resources are available
4. Consider implementing request caching for frequently accessed data

**Status:** This is normal behavior and not a bug.

### Issue 7: Styling Not Applied After Theme Change

**Description:** CSS theme changes do not reflect in the browser after modifying index.css.

**Root Cause:** The development server may not have detected the file change or browser cache may be showing old styles.

**Solution:**
1. Save the CSS file (Ctrl+S)
2. Hard refresh the browser (Ctrl+Shift+R)
3. If using Chrome DevTools, disable cache
4. Stop and restart the npm development server

**Status:** This is a development workflow issue resolved by proper file saving and browser cache clearing.

---

## Development Notes

### Database Initialization

The system requires proper database initialization before first run. Use the provided SQL script located in database/setup.sql to create all necessary tables with proper relationships and initial sample data.

### API Communication

The frontend communicates with the backend through REST API endpoints. All HTTP requests use JSON format for request and response bodies. The API client is located in frontend/src/utils/api.js and provides utility functions for all database operations.

### State Management

The application uses React component state for managing application data. Data is fetched from the backend on component mount and updated when user interactions occur.

### Error Handling

The application implements comprehensive error handling throughout. Backend errors are caught and returned with appropriate HTTP status codes. Frontend displays error messages to users and logs exceptions to the console.

---

## Future Enhancement Recommendations

1. Implement user authentication and authorization
2. Add data export functionality (CSV, PDF)
3. Implement advanced search and filtering
4. Add data pagination for large datasets
5. Implement real-time notifications using WebSockets
6. Add audit logging for all operations
7. Implement data backup and recovery procedures
8. Add batch import functionality
9. Implement advanced analytics and reporting
10. Add multi-user support with role-based access control

---

## Conclusion

This Smart Inventory and Warehouse Management System demonstrates comprehensive full-stack web development capabilities including frontend design, backend API development, and database management. The modular architecture allows for easy maintenance and future enhancements. All components are designed to work together seamlessly while maintaining clear separation of concerns and following industry best practices.

For additional questions or issues, refer to the documentation files in the documentation directory or contact the development team.
