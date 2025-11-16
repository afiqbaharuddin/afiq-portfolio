# 📧 EmailJS Setup Guide - Simple Email Notifications

## ✅ No Backend Required! No Database! No Server!

Your booking form now sends emails directly to you using **EmailJS** - a free service that works perfectly with GitHub Pages.

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Create EmailJS Account (2 minutes)

1. Go to: https://www.emailjs.com/
2. Click **"Sign Up Free"**
3. Sign up with your email or Google account
4. Verify your email address

---

### Step 2: Add Email Service (3 minutes)

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Click **"Connect Account"**
5. Log in with your Gmail account
6. Allow EmailJS permissions
7. Copy the **Service ID** (e.g., `service_abc1234`)

---

### Step 3: Create Email Template (3 minutes)

1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** `booking_notification`

**Subject:**
```
New Service Booking from {{from_name}}
```

**Content:**
```html
<h2>🎉 New Service Booking!</h2>

<p>You have received a new booking request:</p>

<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Name:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{from_name}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Email:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{from_email}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Phone:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{phone}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Service:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{service}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>Message:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{message}}</td>
  </tr>
</table>

<p style="margin-top: 20px; color: #666;">
  <strong>⏰ Tip:</strong> Respond within 24 hours for best client satisfaction!
</p>
```

4. Click **"Save"**
5. Copy the **Template ID** (e.g., `template_xyz5678`)

---

### Step 4: Get Your Public Key (1 minute)

1. Go to **"Account"** in EmailJS dashboard
2. Find **"Public Key"** section
3. Copy your **Public Key** (e.g., `abcdefghijklmnop`)

---

### Step 5: Update Your Code (2 minutes)

Open `src/components/ServicesPage.js` and find these lines (around line 110):

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message || 'No message provided'
  },
  'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
);
```

**Replace with your actual IDs:**

```javascript
await emailjs.send(
  'service_abc1234',      // Your Service ID
  'template_xyz5678',     // Your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message || 'No message provided'
  },
  'abcdefghijklmnop'      // Your Public Key
);
```

---

### Step 6: Test It! (1 minute)

1. Make sure your React app is running: `npm start`
2. Go to: http://localhost:3001/afiq-portfolio/#/services
3. Click **"Book Free Consultation"**
4. Fill in the form with your test data
5. Click **"Schedule Consultation"**
6. Check your email inbox! 📧

---

## 🎉 That's It!

### What You Have Now:
- ✅ Booking form sends emails directly to you
- ✅ No backend server needed
- ✅ No database required
- ✅ Works perfectly with GitHub Pages
- ✅ 200 free emails per month
- ✅ Professional email template

---

## 📦 Deploy to GitHub Pages

Your app is now ready to deploy!

```bash
npm run deploy
```

That's it! Your portfolio with email notifications is now live on GitHub Pages! 🚀

---

## 💡 Free Tier Limits

**EmailJS Free Plan:**
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ All email services supported
- ✅ No credit card required

**Need more emails?**
- Upgrade to Personal plan: $7/month (500 emails)
- Or create multiple accounts (one per portfolio)

---

## 🔧 Troubleshooting

### Error: "Invalid public key"
- Double-check your Public Key in EmailJS dashboard
- Make sure you copied it correctly to your code

### Error: "Service not found"
- Verify your Service ID is correct
- Ensure the email service is connected in EmailJS

### Error: "Template not found"
- Check your Template ID
- Make sure the template is saved in EmailJS

### Email not received
- Check your spam/junk folder
- Verify email template is set up correctly
- Test with "Test Email" button in EmailJS template editor
- Check EmailJS dashboard for error logs

### Form submits but no email
- Open browser console (F12) to see error messages
- Verify all three IDs (Service, Template, Public Key) are correct
- Check EmailJS dashboard "Logs" for failed attempts

---

## 🎨 Customize Email Template

You can customize the email template in EmailJS dashboard:

1. Go to **"Email Templates"**
2. Click your template
3. Edit the HTML/CSS
4. Add your logo or branding
5. Change colors and styling
6. Click **"Save"**

**Available Variables:**
- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email
- `{{phone}}` - Client's phone
- `{{service}}` - Service type selected
- `{{message}}` - Client's message

---

## 📝 Important URLs

| Resource | URL |
|----------|-----|
| **EmailJS Dashboard** | https://dashboard.emailjs.com |
| **Your Portfolio** | https://afiqbaharuddin.github.io/afiq-portfolio |
| **Services Page** | https://afiqbaharuddin.github.io/afiq-portfolio/#/services |

---

## ✅ Final Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Service ID copied
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] Code updated with all three IDs
- [ ] Test booking submitted
- [ ] Email received successfully
- [ ] App deployed to GitHub Pages

---

## 🎯 Quick Reference

### Your EmailJS Credentials
```javascript
// Save these somewhere safe!
Service ID:   _________________
Template ID:  _________________
Public Key:   _________________
```

### Code Location
File: `src/components/ServicesPage.js`
Line: ~110 (inside handleSubmit function)

---

## 🆘 Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Check browser console for errors (F12)
- Review EmailJS logs in dashboard

---

## 🚀 You're Done!

Your portfolio now has:
- ✅ Working booking form
- ✅ Email notifications
- ✅ No backend complexity
- ✅ Works on GitHub Pages
- ✅ 100% free!

**Just deploy and you're live!** 🎊

```bash
npm run deploy
```

Share your portfolio: `https://afiqbaharuddin.github.io/afiq-portfolio` 🎉
