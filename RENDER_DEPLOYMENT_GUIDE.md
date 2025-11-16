# 🚀 Deploy to Render.com with MySQL

This guide will help you deploy your backend to Render.com (free tier) so your GitHub Pages portfolio can use it.

---

## 📋 Prerequisites

- GitHub account (you already have this)
- Render.com account (free) - Sign up at https://render.com
- Gmail account for email notifications

---

## Part 1: Setup Email Notifications (Gmail)

### Step 1: Enable App Password for Gmail

1. Go to your Google Account: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and generate a password
5. Copy the 16-character password (you'll need this later)

### Step 2: Update Local .env File

Edit `server/.env` and add your email:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

---

## Part 2: Deploy Backend to Render.com

### Step 1: Push Your Code to GitHub

```bash
# In your project root
git add .
git commit -m "Add backend with email notifications"
git push origin master
```

### Step 2: Create Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `afiq-portfolio`
4. Configure the service:

   **Basic Settings:**
   - **Name**: `afiq-portfolio-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

   **Instance Type:**
   - Select **Free** tier

5. Click **"Create Web Service"**

### Step 3: Add Environment Variables

In your Render dashboard, go to **Environment** tab and add:

```
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=afiq_portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
```

**Note:** We'll get the MySQL credentials in the next step.

---

## Part 3: Setup MySQL Database on Render

### Option A: Using Render MySQL (Paid - $7/month)

1. In Render dashboard: **"New +"** → **"MySQL"**
2. Create database named: `afiq_portfolio`
3. Copy the **Internal Database URL**
4. Parse it and update environment variables in your web service

### Option B: Using External Free MySQL

**Railway.app (Recommended - Free $5 credit/month):**

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → **"Provision MySQL"**
4. Copy connection details:
   - Host
   - User
   - Password
   - Database name
5. Add these to Render environment variables

**Alternative Free Options:**
- **PlanetScale** - https://planetscale.com (Free tier, great for production)
- **FreeSQLDatabase** - https://www.freesqldatabase.com (Limited but free)
- **db4free.net** - https://www.db4free.net (Free MySQL hosting)

---

## Part 4: Update Frontend to Use Render Backend

### Update API URLs in Your React App

**File 1: `src/components/ServicesPage.js` (Line ~113)**

```javascript
const response = await fetch('https://your-app-name.onrender.com/api/bookings', {
```

**File 2: `src/components/AdminDashboard.js` (Line ~15 & ~43)**

```javascript
const response = await fetch('https://your-app-name.onrender.com/api/bookings');
```

Replace `your-app-name` with your actual Render app name.

### Deploy Updated Frontend

```bash
npm run deploy
```

---

## Part 5: Test Everything

### 1. Test Backend API

Go to: `https://your-app-name.onrender.com/api/bookings`

You should see: `[]` (empty array)

### 2. Test Booking Form

1. Visit your GitHub Pages: `https://afiqbaharuddin.github.io/afiq-portfolio`
2. Go to Services page
3. Fill and submit the booking form
4. Check your email - you should receive a notification! 📧

### 3. Test Admin Dashboard

Visit: `https://afiqbaharuddin.github.io/afiq-portfolio/#/admin`

You should see the booking you just submitted.

---

## 🔧 Configuration Files Needed

Make sure these files are in your `server/` folder:

```
server/
├── server.js          ✅ (Your main backend file)
├── .env              ✅ (Local environment variables)
├── .gitignore        ✅ (Excludes .env from git)
└── package.json      ✅ (Must be in server folder)
```

### Create server/package.json

Create this file if it doesn't exist:

```json
{
  "name": "afiq-portfolio-backend",
  "version": "1.0.0",
  "description": "Backend API for Afiq Portfolio",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0",
    "mysql2": "^3.15.3",
    "cors": "^2.8.5",
    "body-parser": "^2.2.0",
    "nodemailer": "^6.9.0",
    "dotenv": "^16.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🎯 Important Notes

### Render Free Tier Limitations
- ⏰ Backend sleeps after 15 minutes of inactivity
- 🐌 First request after sleep takes ~30 seconds to wake up
- 💾 Free tier: 750 hours/month (plenty for a portfolio)
- To prevent sleep: Set up a cron job to ping your API every 10 minutes

### Keep Backend Alive (Optional)

Use **cron-job.org**:
1. Go to https://cron-job.org
2. Create a job that hits: `https://your-app-name.onrender.com/api/bookings`
3. Schedule: Every 10 minutes
4. This keeps your backend awake during business hours

---

## 📊 Environment Variables Reference

### Local Development (server/.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=afiq_portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Production (Render Dashboard)
```
PORT=5000
DB_HOST=mysql-host-from-railway-or-render
DB_USER=mysql-username
DB_PASSWORD=mysql-password
DB_NAME=afiq_portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

---

## 🐛 Troubleshooting

### Backend won't start on Render
- Check logs in Render dashboard
- Ensure `server/package.json` exists
- Verify all dependencies are listed
- Check Start Command is `node server.js`

### Email not sending
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Review Render logs for email errors
- Test locally first: `npm run server`

### Database connection failed
- Verify MySQL credentials
- Check if database `afiq_portfolio` exists
- Ensure MySQL service is running
- Test connection with MySQL Workbench

### CORS errors
- Ensure `cors` middleware is enabled in server.js
- Check API URL is correct in frontend
- Verify Render backend is running

### Frontend can't reach backend
- Check API URLs are updated in both files
- Ensure Render deployment succeeded
- Check backend logs for errors
- Test API directly in browser

---

## ✅ Checklist

Before deploying:
- [ ] Gmail app password generated
- [ ] Local .env file configured
- [ ] MySQL database created
- [ ] Backend tested locally (`npm run server`)
- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] Environment variables added to Render
- [ ] MySQL connected to Render
- [ ] Frontend API URLs updated
- [ ] Frontend deployed to GitHub Pages
- [ ] Test booking form works
- [ ] Test admin dashboard loads
- [ ] Email notification received

---

## 🎉 You're Done!

Your portfolio now has:
- ✅ Working booking form
- ✅ MySQL database storage
- ✅ Email notifications
- ✅ Admin dashboard
- ✅ Deployed to GitHub Pages + Render.com
- ✅ Completely free (using free tiers)

**Admin URL:** `https://afiqbaharuddin.github.io/afiq-portfolio/#/admin`

Remember to bookmark this URL! 🔖
