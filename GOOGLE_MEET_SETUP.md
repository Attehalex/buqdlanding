# Calendly Setup for One-on-One Scheduling

## Step 1: Create Your Calendly Account & Link

1. **Go to:** https://calendly.com
2. **Sign up** for a free account
3. **Create an Event Type:**
   - Click "Create Event Type"
   - Name it: "BUQD One-on-One"
   - Set duration (e.g., 30 minutes)
   - Set your availability
4. **Get your link:**
   - It will look like: `https://calendly.com/your-username/one-on-one`
   - Or: `https://calendly.com/your-username` for default event

## Step 2: Add Your Calendly Link to the Code

1. **Open:** `script.js`
2. **Find line 5-6:** 
   ```javascript
   const CALENDLY_ONE_ON_ONE = 'https://calendly.com/your-username/one-on-one';
   ```
3. **Replace** with your actual Calendly link
4. **Save the file**

## Step 3: How It Works

When a user scores **71+ (Perfect Match)**:

1. ✅ They see result: "BUQD is Perfect for You! 🎯"
2. ✅ They click: "Schedule Your One-on-One"
3. ✅ A beautiful form appears where they enter:
   - **Full Name**
   - **Email**
   - **Phone Number**
4. ✅ Their info is **saved to `feedback_data.json`**
5. ✅ Calendly popup opens so they can **book a time**
6. ✅ You get a **Calendly notification** when they book
7. ✅ You also get their info in your **feedback system**

## Step 4: Access Their Contact Info

All the info for perfect matches is saved in `feedback_data.json`. You can:

1. **Check the file directly:**
   - Open `feedback_data.json` in VS Code
   - Look for entries with `"meetingType": "one-on-one"` and `"leadStatus": "contacted"`

2. **Or use the API:**
   ```javascript
   fetch('/api/feedback')
     .then(r => r.json())
     .then(data => {
       const perfectMatches = data.filter(d => d.assessmentScore >= 71);
       console.log(perfectMatches);
     });
   ```

## Example Entry

When someone books a call, you'll see:

```json
{
  "id": 1732186200000,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "feedback": "Perfect match - scheduled one-on-one call",
  "rating": 5,
  "assessmentScore": 85,
  "timestamp": "2025-11-22T15:30:00.000Z",
  "meetingType": "one-on-one",
  "leadStatus": "contacted",
  "received_at": "2025-11-22T15:30:05.123Z"
}
```

## Next Steps

1. ✅ Create your Calendly account at https://calendly.com
2. ✅ Create a "BUQD One-on-One" event type
3. ✅ Copy your Calendly link
4. ✅ Add it to `script.js` (replace the placeholder)
5. ✅ Refresh your app at http://localhost:3000
6. ✅ Test by scoring 71+ on the assessment

## Bonus: Email Notifications

Calendly will automatically:
- ✅ Send you an email when someone books
- ✅ Send the user a calendar invite
- ✅ Send you reminders before each meeting

You're all set! 🎉

