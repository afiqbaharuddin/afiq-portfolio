require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'afiq_portfolio'
});

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email app password
  }
});

// Function to send email notification
const sendBookingEmail = async (bookingData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Service Booking from ${bookingData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 New Service Booking!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="color: #666; margin-bottom: 30px;">You have received a new booking request. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">👤 Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${bookingData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">📧 Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                <a href="mailto:${bookingData.email}" style="color: #14b8a6; text-decoration: none;">${bookingData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">📱 Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                <a href="tel:${bookingData.phone}" style="color: #14b8a6; text-decoration: none;">${bookingData.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; font-weight: 600;">💼 Service:</td>
              <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                <span style="background: #14b8a6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${bookingData.service}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #666; font-weight: 600; vertical-align: top;">💬 Message:</td>
              <td style="padding: 12px; color: #333;">${bookingData.message || 'No message provided'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #14b8a6;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong style="color: #14b8a6;">⏰ Quick Response Tip:</strong><br>
              Respond within 24 hours to maintain high client satisfaction!
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated notification from your portfolio booking system.
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create bookings table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Bookings table ready');
  }
});

// API Routes

// Get all bookings (for admin)
app.get('/api/bookings', (req, res) => {
  const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
      return;
    }
    res.json(results);
  });
});

// Create new booking
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, message } = req.body;
  
  // Validation
  if (!name || !email || !phone || !service) {
    res.status(400).json({ error: 'All fields except message are required' });
    return;
  }
  
  const query = 'INSERT INTO bookings (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [name, email, phone, service, message], async (err, result) => {
    if (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ error: 'Failed to create booking' });
      return;
    }
    
    // Send email notification
    const emailSent = await sendBookingEmail({ name, email, phone, service, message });
    
    res.status(201).json({ 
      message: 'Booking created successfully', 
      bookingId: result.insertId,
      emailSent: emailSent
    });
  });
});

// Delete booking (optional - for admin)
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM bookings WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Failed to delete booking' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.json({ message: 'Booking deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
