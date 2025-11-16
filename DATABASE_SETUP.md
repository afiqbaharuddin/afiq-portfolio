# Database & Backend Setup Instructions

## Prerequisites
- Install MySQL Server on your computer
- Make sure Node.js is installed

## Step 1: Setup MySQL Database

1. **Install MySQL** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL

2. **Create the Database**
   ```sql
   CREATE DATABASE afiq_portfolio;
   ```

3. **Configure Database Connection**
   - Open `server/server.js`
   - Update these lines with your MySQL credentials:
   ```javascript
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',           // Your MySQL username
     password: '',           // Your MySQL password
     database: 'afiq_portfolio'
   });
   ```

## Step 2: Start the Backend Server

1. Open a new terminal (separate from your React app)

2. Navigate to your project folder:
   ```bash
   cd C:\Users\User\Herd\afiq-portfolio
   ```

3. Start the backend server:
   ```bash
   node server/server.js
   ```

   You should see:
   ```
   Server running on http://localhost:5000
   Connected to MySQL database
   Bookings table ready
   ```

## Step 3: Test the System

1. **Frontend**: Your React app should be running on `http://localhost:3001`

2. **Backend**: The API server is running on `http://localhost:5000`

3. **Test the booking form**:
   - Go to Services page: `http://localhost:3001/afiq-portfolio/#/services`
   - Click "Book Free Consultation"
   - Fill in the form and submit
   - Data will be saved to MySQL database

4. **View bookings in Admin Dashboard**:
   - Go to: `http://localhost:3001/afiq-portfolio/#/admin`
   - You'll see all booking records in a table
   - You can delete bookings if needed

## API Endpoints

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Delete a booking

## Troubleshooting

### Error: Cannot connect to MySQL
- Make sure MySQL service is running
- Check username and password in `server/server.js`
- Verify database `afiq_portfolio` exists

### Error: Port 5000 already in use
- Change the PORT in `server/server.js` (line 6)
- Update the API URL in:
  - `src/components/ServicesPage.js` (line 113)
  - `src/components/AdminDashboard.js` (line 15)

### CORS Error
- Make sure the backend server is running
- Check that CORS is enabled in `server/server.js`

## Database Schema

The `bookings` table structure:
```sql
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running Both Servers

You need TWO terminals running simultaneously:

**Terminal 1 - React App:**
```bash
npm start
```

**Terminal 2 - Backend Server:**
```bash
node server/server.js
```

## Production Deployment Notes

For production, you'll need to:
1. Use environment variables for database credentials
2. Update API URLs to your production domain
3. Consider using a process manager like PM2 for the backend
4. Use a production-grade database setup
5. Add authentication to the admin dashboard
