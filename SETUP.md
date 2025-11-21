# BUQD Landing Page - Setup Guide

## Project Structure

```
bugd-landing-page/
├── index.html          # Main landing page with feedback form
├── styles.css          # All styling (separated from HTML)
├── script.js           # Client-side form handling and assessments
├── server.js           # Node.js backend for email & storage
├── package.json        # Dependencies management
├── .env.example        # Environment variables template
├── .env                # Your actual environment variables (DON'T COMMIT)
└── feedback_data.json  # Local storage for feedback (auto-created)
```

## Features

✅ **Assessment Quiz** - Users answer 6 questions about their reading habits
✅ **Feedback Form** - Collects name, email, rating, and feedback
✅ **Email Notifications** - Sends confirmation to user + alert to admin
✅ **Local Storage** - Saves feedback to JSON file (upgradeable to database)
✅ **Clean Code Organization** - Separated concerns (HTML, CSS, JS)

---

## Installation & Setup

### 1. Install Dependencies

```powershell
cd "c:\VS CODE Projects\dev\bugd landing page"
npm install
```

### 2. Configure Email

#### Option A: Gmail Setup (Recommended)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character app password
4. Create a `.env` file in the project root:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-email@gmail.com
PORT=3000
NODE_ENV=development
```

#### Option B: Other Email Services

For Outlook, Yahoo, SendGrid, etc., update `.env`:

```
EMAIL_SERVICE=outlook    # or yahoo, sendgrid, etc.
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
ADMIN_EMAIL=admin@yourdomain.com
PORT=3000
```

### 3. Run the Server

```powershell
npm start
```

Or with auto-reload during development:

```powershell
npm run dev
```

Visit: http://localhost:3000

---

## File Descriptions

### `index.html`
- Clean, semantic HTML
- Links to external `styles.css` and `script.js`
- Contains: Hero section, Assessment quiz, Feedback form

### `styles.css`
- **Global styles**: Typography, colors, spacing
- **Hero section**: Animations, gradients, floating elements
- **Assessment section**: Cards, options, selections
- **Feedback form**: Input styling, validation states
- **Utilities**: Loading spinner, alerts, animations

### `script.js`
- **Assessment Logic**: Score calculation, result generation
- **Form Handling**: Validation, submission, loading states
- **Error Handling**: User-friendly error messages
- **Email Notifications**: Sends to `/api/feedback` endpoint

### `server.js`
- **Express server**: Serves static files
- **POST /api/feedback**: Receives and processes feedback
- **GET /api/feedback**: Retrieves all feedback (for admin)
- **Email sending**: Uses Nodemailer for Gmail/Outlook/etc.
- **Local storage**: Saves to `feedback_data.json`

---

## API Endpoints

### Submit Feedback
**POST** `/api/feedback`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "feedback": "Great app!",
  "rating": 5,
  "assessmentScore": 72,
  "timestamp": "2025-11-21T10:30:00Z"
}
```

Response:
```json
{
  "message": "Feedback submitted successfully",
  "id": 1732186200000
}
```

### Get All Feedback
**GET** `/api/feedback`

Returns array of all feedback submissions.

---

## Customization

### Change Colors
Edit `styles.css`:
- Primary color: `#358D74` (teal)
- Secondary: `#0E2025` (dark navy)
- Light bg: `#E9F3F6` (light blue)

### Add/Remove Assessment Questions
Edit `index.html` - Add/remove `<div class="question">` blocks

### Change Email Templates
Edit `server.js` - Modify HTML in `userMailOptions` and `adminMailOptions`

### Upgrade to Database
Replace the file-based storage in `server.js` with:
- MongoDB
- PostgreSQL
- Firebase
- Supabase

---

## Troubleshooting

### "Cannot find module" error
```powershell
npm install
```

### Email not sending
- Check `.env` file exists and is configured
- Verify Gmail App Password is correct (spaces don't matter)
- Enable "Less secure app access" if not using App Password
- Check spam folder

### Port 3000 already in use
```powershell
# Windows - kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change PORT in .env to 3001, 3002, etc.
```

### Form submission fails
- Check browser console (F12) for errors
- Check server logs for stack traces
- Verify email configuration in `.env`
- Check feedback_data.json has write permissions

---

## Security Considerations

⚠️ **Never commit `.env`** - Add to `.gitignore`

```
.env
node_modules/
feedback_data.json
```

### In Production:
- Add rate limiting to `/api/feedback`
- Implement CAPTCHA to prevent spam
- Move to proper database (don't use JSON)
- Add authentication for `/api/feedback` GET
- Use HTTPS
- Add input sanitization
- Implement request validation

---

## Next Steps

1. **Deploy**: Use Vercel, Heroku, Railway, or DigitalOcean
2. **Database**: Migrate from JSON to MongoDB/PostgreSQL
3. **Admin Dashboard**: Create interface to view/manage feedback
4. **Analytics**: Track assessment results over time
5. **Email Templates**: Add HTML email templates for branding

---

## Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for client errors
- Check server logs for backend errors
- Verify `.env` configuration
