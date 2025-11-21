# Quick Start

## 30-Second Setup

```powershell
# 1. Install dependencies
npm install

# 2. Create .env file with your email
# Copy .env.example to .env and fill in your Gmail credentials

# 3. Run the server
npm start

# 4. Open browser
# http://localhost:3000
```

## Email Configuration (Gmail)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Create `.env` file:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ADMIN_EMAIL=your-email@gmail.com
   PORT=3000
   ```

## What's Included

✅ **Assessment Quiz** - 6 questions scoring system
✅ **Feedback Form** - Name, Email, Rating, Message
✅ **Email Notifications** - Auto-sent to user & admin
✅ **Data Storage** - Saved to `feedback_data.json`
✅ **Responsive Design** - Mobile-friendly
✅ **Clean Code** - Organized CSS & JS files

## Files

- `index.html` - Main page with feedback form
- `styles.css` - All styling
- `script.js` - Form logic & interactivity
- `server.js` - Backend with email service
- `.env` - Your configuration (create from `.env.example`)

## Testing Form Locally

1. Fill out the assessment quiz (6 questions)
2. See your personalized result
3. Scroll to feedback form
4. Submit feedback → Emails sent instantly!

## Customize

- **Colors**: Edit `styles.css`
- **Email text**: Edit `server.js` (search for "html:")
- **Questions**: Add/remove in `index.html`

## Next: Deploy

Ready to go live? Choose a platform:
- **Vercel** (easiest for Node.js)
- **Heroku** (free tier available)
- **Railway** (simple & affordable)
- **DigitalOcean** (more control)

📖 See `SETUP.md` for full documentation
