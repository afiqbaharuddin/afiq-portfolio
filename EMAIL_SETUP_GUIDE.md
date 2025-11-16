# 📧 Email & Database Setup - Quick Start

## Step 1: Setup Gmail App Password (5 minutes)

### Get Your Gmail App Password:

1. **Go to Google Account Security:**
   - Visit: https://myaccount.google.com/security
   
2. **Enable 2-Step Verification:**
   - Click "2-Step Verification" 
   - Follow the steps to enable it (if not already enabled)

3. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Type "Portfolio Backend"
   - Click **Generate**
   - **Copy the 16-character password** (shown without spaces)

### Update Your .env File:

Open `server/.env` and update these lines:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Your 16-character app password
```

**Example:**
```env
EMAIL_USER=afiq@gmail.com
EMAIL_PASS=xyzw abcd efgh ijkl
```

---

## Step 2: Setup MySQL Database (Already done!)

Your MySQL is already configured:
- Database: `afiq_portfolio`
- Table: `bookings` (auto-created by server)
- Connection: localhost

If you need to create the database manually:
```sql
CREATE DATABASE afiq_portfolio;
```

---

## Step 3: Start the Backend Server

### Option 1: Using npm script (Recommended)
```bash
npm run server
```

### Option 2: Direct command
```bash
cd server
node server.js
```

You should see:
```
Server running on http://localhost:5000
Connected to MySQL database
Bookings table ready
```

---

## Step 4: Test Email Functionality

### Test 1: Submit a Booking

1. Make sure your React app is running: `npm start`
2. Go to: http://localhost:3001/afiq-portfolio/#/services
3. Click "Book Free Consultation"
4. Fill in the form with test data
5. Submit

### Test 2: Check Your Email

Within a few seconds, you should receive an email with:
- 🎉 Beautiful formatted notification
- All booking details (name, email, phone, service, message)
- Clickable email and phone links

### Test 3: Check Admin Dashboard

Go to: http://localhost:3001/afiq-portfolio/#/admin

You should see:
- The booking you just submitted
- Statistics cards
- Full booking details in a table

---

## 🔥 Common Issues & Solutions

### ❌ Error: "Invalid login" when starting server

**Problem:** Gmail app password is incorrect

**Solution:**
1. Regenerate Gmail app password
2. Update `server/.env` with new password
3. Restart server: `npm run server`

---

### ❌ Email not received

**Check these:**
- [ ] Gmail app password is correct (16 characters)
- [ ] 2-Step Verification is enabled on Google account
- [ ] Check your Spam/Junk folder
- [ ] Verify `EMAIL_USER` matches your Gmail address
- [ ] Look at server terminal for error messages

**Test your email config:**
Check the server terminal after submitting a booking:
- ✅ "Email notification sent successfully" = Working!
- ❌ "Error sending email" = Check app password

---

### ❌ Database connection failed

**Check:**
- [ ] MySQL service is running
- [ ] Database `afiq_portfolio` exists
- [ ] Username/password in `.env` are correct

**Quick fix:**
```bash
# Check if MySQL is running (Windows)
# Open Services and look for MySQL
```

---

### ❌ Port 5000 already in use

**Solution:** Kill the process or change port

**Change port:**
1. Edit `server/.env`: `PORT=5001`
2. Update API URLs in:
   - `src/components/ServicesPage.js` → Line 113
   - `src/components/AdminDashboard.js` → Line 15

---

## 📁 File Structure

Make sure you have:

```
afiq-portfolio/
├── server/
│   ├── server.js          ✅ Main backend file
│   ├── .env              ✅ Your email & DB config
│   ├── .gitignore        ✅ Protects .env
│   └── package.json      ✅ Dependencies
├── src/
│   └── components/
│       ├── ServicesPage.js    ✅ Booking form
│       └── AdminDashboard.js  ✅ Admin view
└── package.json          ✅ Root package.json
```

---

## ✅ Success Checklist

Before moving to deployment:

- [ ] Gmail app password generated and added to `.env`
- [ ] MySQL database `afiq_portfolio` exists
- [ ] Backend starts without errors: `npm run server`
- [ ] Booking form submits successfully
- [ ] Email notification received in Gmail
- [ ] Admin dashboard shows bookings
- [ ] No errors in browser console
- [ ] No errors in server terminal

---

## 🚀 Ready for Deployment?

Once everything works locally, follow:
- **RENDER_DEPLOYMENT_GUIDE.md** - Deploy to Render.com

---

## 💡 Tips

### Email Template
Your emails will look professional with:
- Gradient header with "🎉 New Service Booking!"
- Formatted table with all booking details
- Clickable email and phone links
- Quick response reminder

### Testing Tips
1. Use your real email for testing
2. Check spam folder first time
3. Mark emails as "Not Spam" if they go there
4. Test different service types
5. Try with and without message field

### Admin Dashboard Features
- 📊 Total bookings count
- 📅 Monthly bookings count  
- 🗑️ Delete bookings
- 🔄 Refresh data
- 📋 Full booking details
- 📧 Clickable contact info

---

## Need Help?

Common commands:

```bash
# Start backend
npm run server

# Start frontend  
npm start

# Check MySQL
# Windows: Open Services → MySQL

# View server logs
# Check terminal where server is running
```

**Everything working?** → Proceed to **RENDER_DEPLOYMENT_GUIDE.md**! 🎉
