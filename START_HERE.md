# 🚀 START HERE - Quick Setup

## ✨ Your Booking Form Now Uses EmailJS (No Backend!)

---

## 📋 What You Need (10 minutes total)

### Step 1: Create EmailJS Account
👉 https://www.emailjs.com/ → Sign Up Free

### Step 2: Connect Gmail
- Dashboard → Email Services → Add New Service
- Choose Gmail → Connect Account
- Copy **Service ID**

### Step 3: Create Email Template
- Dashboard → Email Templates → Create New
- Copy the template from **EMAILJS_SETUP.md** (Step 3)
- Copy **Template ID**

### Step 4: Get Public Key
- Dashboard → Account
- Copy **Public Key**

### Step 5: Update Your Code
Open: `src/components/ServicesPage.js` (line ~110)

Find:
```javascript
'YOUR_SERVICE_ID',
'YOUR_TEMPLATE_ID',
'YOUR_PUBLIC_KEY'
```

Replace with your actual IDs from EmailJS dashboard.

### Step 6: Test & Deploy
```bash
npm start           # Test locally
npm run deploy      # Deploy to GitHub Pages
```

---

## 📖 Detailed Instructions

Read: **EMAILJS_SETUP.md**

---

## ✅ Done!

Your portfolio now:
- ✅ Sends booking emails to you
- ✅ Works on GitHub Pages
- ✅ No backend needed
- ✅ 100% free (200 emails/month)

---

**Questions?** → Check **EMAILJS_SETUP.md** for full guide!
