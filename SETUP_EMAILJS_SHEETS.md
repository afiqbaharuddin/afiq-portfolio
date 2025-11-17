# Email & Google Sheets Integration Setup Guide

This guide will help you set up EmailJS and Google Sheets to receive booking submissions from your portfolio website.

## ✅ What's Already Done

- ✓ EmailJS library installed (`@emailjs/browser`)
- ✓ Form with controlled inputs (name, email, phone, project type, budget, details)
- ✓ Loading states and success/error messages
- ✓ Form validation (required fields)
- ✓ Auto-close modal after successful submission

## 📧 Part 1: EmailJS Setup (10 minutes)

EmailJS allows you to send emails directly from your website without a backend server - perfect for GitHub Pages!

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE for up to 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **"Connect Account"**
   - Sign in with your Google account (`mafqqq16@gmail.com`)
   - Allow EmailJS permissions
4. Copy your **Service ID** (looks like: `service_xxxxxxx`)

### Step 3: Create Email Template

1. Click **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** `booking_notification`

**Subject:** `New Project Booking from {{from_name}}`

**Content:**

```
You have a new project booking request!

Client Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Project Information:
- Type: {{project_type}}
- Budget: {{budget}}

Project Details:
{{message}}

---
Respond within 24 hours!
```

4. Click **"Save"**
5. Copy your **Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Public Key

1. Click **"Account"** in the sidebar
2. Find your **Public Key** (looks like: `xxxxxxxxxxxxxxxxx`)
3. Copy it

### Step 5: Update Your Code

Open `src/components/ServicesPage.js` and replace these placeholders around **line 140**:

```javascript
const emailJSConfig = {
  serviceID: "YOUR_SERVICE_ID", // Replace with your Service ID
  templateID: "YOUR_TEMPLATE_ID", // Replace with your Template ID
  publicKey: "YOUR_PUBLIC_KEY", // Replace with your Public Key
};
```

**Example:**

```javascript
const emailJSConfig = {
  serviceID: "service_abc1234",
  templateID: "template_xyz5678",
  publicKey: "abcdefghijklmnopq",
};
```

### Step 6: Test It!

1. Save the file
2. Your app should auto-reload (or run `npm start`)
3. Click "Book Services" → Fill the form → Submit
4. Check your email at `mafqqq16@gmail.com` 📬

---

## 📊 Part 2: Google Sheets Setup (Optional Backup - 15 minutes)

Store all submissions in a Google Sheet as a backup!

### Step 1: Create Google Sheet

1. Go to [https://sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Portfolio Bookings"**
4. Add these column headers in row 1:
   ```
   A1: Timestamp
   B1: Full Name
   C1: Email
   D1: Phone
   E1: Project Type
   F1: Budget
   G1: Project Details
   ```

### Step 2: Create Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(data.timestamp),
      data.fullName,
      data.email,
      data.phone,
      data.projectType,
      data.budget,
      data.projectDetails,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Settings:
   - **Description:** "Portfolio Booking Form"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
5. Click **"Deploy"**
6. Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Portfolio Bookings (unsafe)"**
   - Click **"Allow"**
7. Copy the **"Web app URL"** (looks like: `https://script.google.com/macros/s/xxxxx/exec`)

### Step 4: Update Your Code

In `src/components/ServicesPage.js`, find around **line 115** and replace:

```javascript
const scriptURL = "YOUR_GOOGLE_SHEETS_SCRIPT_URL";
```

With your actual URL:

```javascript
const scriptURL = "https://script.google.com/macros/s/AKfycbxxxx.../exec";
```

### Step 5: Test It!

1. Save and reload your app
2. Submit a test booking
3. Check your Google Sheet - new row should appear! 🎉

---

## 🚀 Deploy to GitHub Pages

After setting up EmailJS (and optionally Google Sheets):

```bash
npm run deploy
```

Your live website will now:

- ✅ Send you emails when users book consultations
- ✅ Store submissions in Google Sheets (if configured)
- ✅ Show professional success/error messages
- ✅ Work perfectly on GitHub Pages (no backend needed!)

---

## 🔧 Troubleshooting

### Email not received?

- Check EmailJS dashboard → Email Logs
- Verify Service ID, Template ID, and Public Key are correct
- Check spam folder
- Ensure you're under 200 emails/month limit (free plan)

### Google Sheets not working?

- Check browser console for errors (F12)
- Verify the script URL is correct
- Make sure the script is deployed as "Anyone" can access
- Check Google Sheets → Extensions → Apps Script → Executions for errors

### Form submission fails?

- Open browser console (F12) to see error messages
- Verify all credentials are entered correctly (no spaces)
- Check internet connection
- Try the backup email link: `mafqqq16@gmail.com`

---

## 📝 Free Tier Limits

**EmailJS:**

- ✅ 200 emails/month FREE
- ✅ Unlimited templates
- ✅ All features included

**Google Sheets:**

- ✅ Completely FREE
- ✅ Unlimited submissions
- ✅ Real-time updates

**GitHub Pages:**

- ✅ 100% FREE hosting
- ✅ Works perfectly with client-side code

---

## 🎯 Next Steps

1. Set up EmailJS (required) - 10 minutes
2. Set up Google Sheets (optional) - 15 minutes
3. Test locally with `npm start`
4. Deploy with `npm run deploy`
5. Share your portfolio and start receiving bookings! 🚀

---

**Need help?** The code includes helpful error messages and console logs to debug any issues.

**Security Note:** All credentials (Service ID, Template ID, Public Key) are safe to expose in client-side code - they're designed for public use. EmailJS handles security on their end.
