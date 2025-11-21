# Quick Reference Card

## 🚀 First Time Setup (5 minutes)

```powershell
# 1. Install packages
npm install

# 2. Create .env from template
# Copy .env.example to .env
# Edit with your Gmail credentials:
# - Get app password: https://myaccount.google.com/apppasswords
# - Select "Mail" and "Windows Computer"

# 3. Start server
npm start

# 4. Open browser
# http://localhost:3000

# 5. Test the form!
```

---

## 📁 File Quick Reference

| File | Purpose | Edit For |
|------|---------|----------|
| `index.html` | Landing page structure | Content, form fields |
| `styles.css` | All styling & animations | Colors, layout, fonts |
| `script.js` | Form logic & validation | Quiz questions, validation rules |
| `server.js` | Backend & emails | Email templates, endpoints |
| `.env` | Email credentials | Your Gmail app password |
| `.env.example` | Configuration template | Show other developers |
| `package.json` | Dependencies | Add new npm packages |

---

## 🎯 Common Tasks

### Change Primary Color
**File:** `styles.css`
```css
/* Find and replace */
#358D74  /* Old teal */
#YOUR_COLOR  /* New color */
```

### Add Assessment Question
**File:** `index.html`
```html
<div class="question">
  <h3>Your question here?</h3>
  <div class="options" data-question="7">
    <div class="option" data-score="20">Option A</div>
    <div class="option" data-score="15">Option B</div>
  </div>
</div>
```
⚠️ Update `selectOption()` in script.js to check for 7 questions

### Change Email Template
**File:** `server.js`
```javascript
// Find: const userMailOptions = {
// Edit the html: property
// Can use: ${name}, ${email}, ${feedback}, ${rating}
```

### Add Admin Dashboard
**File:** Create `admin.html`
```html
<script>
fetch('/api/feedback')
  .then(r => r.json())
  .then(data => console.log(data))
</script>
```

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| `Cannot find module` | Run `npm install` |
| Email not sending | Check `.env` file exists |
| Port 3000 in use | Change `PORT=3001` in `.env` |
| Form won't submit | Check browser console (F12) for errors |
| Feedback not saving | Check `feedback_data.json` file permissions |

---

## 📧 Email Configuration

### Gmail (Recommended)
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy password (16 chars, spaces ok)
4. In `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-email@gmail.com
```

### Outlook
```
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
ADMIN_EMAIL=admin@yourdomain.com
```

### Custom SMTP
```
EMAIL_SERVICE=false
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

---

## 🔗 API Endpoints Reference

### POST /api/feedback
**Send feedback**
```javascript
fetch('/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    feedback: 'Great app!',
    rating: 5,
    assessmentScore: 75,
    timestamp: new Date().toISOString()
  })
})
```

**Response (200 OK)**
```json
{
  "message": "Feedback submitted successfully",
  "id": 1732186200000
}
```

### GET /api/feedback
**Get all submissions**
```javascript
fetch('/api/feedback')
  .then(r => r.json())
  .then(data => console.log(data))
```

---

## 📊 Assessment Scoring

| Total Score | Category | Call to Action |
|-------------|----------|----------------|
| 71+ | Perfect fit | Schedule 1-on-1 |
| 61-70 | Could help | Join demo |
| 55-60 | Maybe interested | Join group call |
| <55 | Not interested | Stay updated |

---

## 🔒 Important Files to Protect

```
# NEVER commit these:
.env                    # Your email password
node_modules/          # Install from package.json
feedback_data.json     # User submissions

# DO commit these:
.gitignore            # Protects above files
.env.example          # Template for developers
package.json          # Dependencies list
All .md files         # Documentation
All source files      # HTML, CSS, JS
```

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `nodemailer` | Send emails |
| `cors` | Allow cross-origin requests |
| `dotenv` | Load environment variables |
| `nodemon` | Auto-reload dev server |

---

## 🚀 Deployment Platforms

### Vercel (Easiest)
- Connect GitHub repo
- Set environment variables
- Deploy on push

### Heroku
- Free tier available
- Requires dyno hours
- Simple config

### Railway
- Pay per use
- Simple interface
- Database included

### DigitalOcean
- Full control
- Drop-in Ubuntu servers
- $5/month minimum

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| `QUICKSTART.md` | 30-second setup |
| `SETUP.md` | Complete documentation |
| `COMPLETE.md` | Project overview |
| `CODE_ORGANIZATION.md` | Code structure & flow |
| `README.md` | (This file equivalent) |

---

## 💡 Pro Tips

✅ Use `npm run dev` for development (auto-reload)
✅ Check browser console (F12) for JavaScript errors
✅ Check server logs for backend errors
✅ Test emails in spam folder
✅ Keep feedback_data.json backed up
✅ Use version control (Git)
✅ Test on mobile before deploying

---

## ❓ Need Help?

1. Check `SETUP.md` for detailed instructions
2. Look at `CODE_ORGANIZATION.md` for architecture
3. Review console errors (F12 in browser)
4. Check server output for logs
5. Verify `.env` configuration

---

**Your feedback system is ready! 🎉**

Start with: `npm install` then `npm start`
