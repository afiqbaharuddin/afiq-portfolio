# ⚡ Quick Reference - Commands & URLs

## 🚀 Start Commands

### Start Backend (Terminal 1)
```bash
npm run server
```

### Start Frontend (Terminal 2)
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🔗 Local URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3001/afiq-portfolio |
| **Backend API** | http://localhost:5000 |
| **Services Page** | http://localhost:3001/afiq-portfolio/#/services |
| **Admin Dashboard** | http://localhost:3001/afiq-portfolio/#/admin |

---

## 🌐 Production URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://afiqbaharuddin.github.io/afiq-portfolio |
| **Backend API** | https://your-app-name.onrender.com |
| **Services Page** | https://afiqbaharuddin.github.io/afiq-portfolio/#/services |
| **Admin Dashboard** | https://afiqbaharuddin.github.io/afiq-portfolio/#/admin |

---

## 📧 Gmail App Password Setup

1. https://myaccount.google.com/security
2. Enable 2-Step Verification
3. https://myaccount.google.com/apppasswords
4. Generate password for "Mail"
5. Copy 16-character password
6. Add to `server/.env`

---

## 🔧 Configuration Files

### server/.env
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=afiq_portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 📡 API Endpoints

### Get All Bookings (Admin)
```bash
GET http://localhost:5000/api/bookings
```

### Create Booking
```bash
POST http://localhost:5000/api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+60 12-345 6789",
  "service": "Web Application",
  "message": "Project details..."
}
```

### Delete Booking
```bash
DELETE http://localhost:5000/api/bookings/:id
```

---

## 🗃️ Database Commands

### Create Database
```sql
CREATE DATABASE afiq_portfolio;
```

### View Bookings
```sql
USE afiq_portfolio;
SELECT * FROM bookings;
```

### Count Bookings
```sql
SELECT COUNT(*) FROM bookings;
```

### Delete All Bookings
```sql
DELETE FROM bookings;
```

---

## 🐛 Troubleshooting Quick Fixes

### Backend won't start
```bash
cd server
npm install
node server.js
```

### Port 5000 in use
```bash
# Change PORT in server/.env to 5001
# Then update API URLs in frontend
```

### MySQL not connected
```bash
# Check MySQL service is running
# Verify database exists:
CREATE DATABASE IF NOT EXISTS afiq_portfolio;
```

### Email not sending
```bash
# 1. Check server logs
# 2. Verify EMAIL_USER and EMAIL_PASS in .env
# 3. Check Gmail app password is correct
# 4. Enable 2-Step Verification on Google
```

---

## 📦 Install Dependencies

### Root (Frontend)
```bash
npm install
```

### Server (Backend)
```bash
cd server
npm install
```

---

## 🔄 Git Commands

### Commit Changes
```bash
git add .
git commit -m "Update booking system"
git push origin master
```

### Deploy Frontend
```bash
npm run deploy
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **BOOKING_SYSTEM_COMPLETE.md** | Full system overview |
| **EMAIL_SETUP_GUIDE.md** | Email configuration |
| **RENDER_DEPLOYMENT_GUIDE.md** | Deployment instructions |
| **DATABASE_SETUP.md** | Database setup |
| **QUICK_REFERENCE.md** | This file! |

---

## ✅ Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend compiles successfully
- [ ] Can access services page
- [ ] Booking form opens
- [ ] Form submits successfully
- [ ] Email notification received
- [ ] Admin dashboard shows booking
- [ ] Can delete booking from admin

---

## 🎯 Important Files

```
afiq-portfolio/
├── server/
│   ├── server.js          # Backend server
│   ├── .env              # Configuration
│   └── package.json      # Dependencies
├── src/
│   ├── components/
│   │   ├── ServicesPage.js    # Booking form
│   │   └── AdminDashboard.js  # Admin panel
│   └── App.js            # Routes
└── package.json          # Root dependencies
```

---

## 🔐 Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Use environment variables in production
- ⚠️ Keep Gmail app password secure
- ⚠️ Add authentication to admin dashboard for production

---

## 📞 Support URLs

| Resource | URL |
|----------|-----|
| **Render Dashboard** | https://dashboard.render.com |
| **Railway Dashboard** | https://railway.app |
| **GitHub Repo** | https://github.com/afiqbaharuddin/afiq-portfolio |
| **Gmail App Passwords** | https://myaccount.google.com/apppasswords |
| **MySQL Workbench** | https://dev.mysql.com/downloads/workbench/ |

---

## 💻 VS Code Extensions (Recommended)

- MySQL (by Weijan Chen)
- REST Client (by Huachao Mao)
- Dotenv (by Chmln)
- Thunder Client (for API testing)

---

## 🎉 Quick Test

### 1. Start Everything
```bash
# Terminal 1
npm run server

# Terminal 2
npm start
```

### 2. Test Booking
- Go to: http://localhost:3001/afiq-portfolio/#/services
- Fill and submit booking form
- Check your email!

### 3. View Admin
- Go to: http://localhost:3001/afiq-portfolio/#/admin
- See your booking!

---

**Save this file for quick reference! 📌**
