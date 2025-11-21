# System Architecture Diagram

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BUQD Landing Page                            │
│                      (Your Users Visit)                             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                ┌─────────────────────────────┐
                │   1. HERO SECTION           │
                │   - Welcome message         │
                │   - Call to action button   │
                └─────────────────────────────┘
                              ↓
                ┌─────────────────────────────┐
                │   2. ASSESSMENT SECTION     │
                │   - 6 scoring questions     │
                │   - User selects answers    │
                │   - Scores calculated       │
                └─────────────────────────────┘
                              ↓
                ┌─────────────────────────────┐
                │   3. RESULTS SECTION        │
                │   - Personalized message    │
                │   - Based on score          │
                │   - Call to action          │
                └─────────────────────────────┘
                              ↓
                ┌─────────────────────────────┐
                │   4. FEEDBACK FORM          │
                │   - Name input              │
                │   - Email input             │
                │   - Rating select (1-5)     │
                │   - Feedback textarea       │
                └─────────────────────────────┘
                              ↓
                ┌─────────────────────────────┐
                │   5. FORM SUBMISSION        │
                │   - Client-side validation  │
                │   - Show loading spinner    │
                │   - POST to /api/feedback   │
                └─────────────────────────────┘
                              ↓
         ╔════════════════════════════════════════════════════╗
         ║          NODE.JS BACKEND SERVER                   ║
         ║         (Express.js + Nodemailer)                 ║
         ║                                                   ║
         ║  POST /api/feedback Endpoint                      ║
         ║  1. Receive form data                             ║
         ║  2. Validate all fields                           ║
         ║  3. Create feedback object with metadata          ║
         ║  4. Save to feedback_data.json                    ║
         ║  5. Send confirmation email to user               ║
         ║  6. Send notification email to admin              ║
         ║  7. Return success response                       ║
         ║                                                   ║
         ║  GET /api/feedback Endpoint                       ║
         ║  1. Return all feedback submissions               ║
         ╚════════════════════════════════════════════════════╝
                    ↙        ↓        ↘
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ Save to JSON │  │ Send Emails  │  │ Log to DB    │
          └──────────────┘  └──────────────┘  └──────────────┘
              ↓                   ↙     ↘         (Future)
      feedback_data.json   User Email  Admin Email
      {
        id: 1732186200000,
        name: "John Doe",
        email: "john@example.com",
        feedback: "Great!",
        rating: 5,
        assessmentScore: 75,
        timestamp: "2025-11-21T10:30:00Z"
      }
```

---

## File Dependency Tree

```
index.html (Entry Point)
├── Link to: styles.css
│   └─ All styling, animations, layouts
├── Link to: script.js
│   ├─ Assessment logic
│   ├─ Form validation
│   └─ API calls to server
└── Contains:
    ├─ Hero section
    ├─ Assessment quiz
    ├─ Results display
    └─ Feedback form

server.js (Backend)
├── Imports: express
├── Imports: nodemailer
├── Imports: cors
├── Imports: dotenv (.env file)
├── Requires: package.json (dependencies)
├── Uses: .env (email configuration)
├── Creates: feedback_data.json
└── Provides:
    ├─ POST /api/feedback
    └─ GET /api/feedback
```

---

## Component Structure

```
INDEX.HTML
│
├─ HEADER (implicit)
│
├─ SECTION: Hero
│  └─ Content
│     ├─ Logo image
│     ├─ Logo text
│     ├─ Main heading
│     ├─ Subtitle
│     └─ CTA Button → scrolls to assessment
│
├─ SECTION: Assessment
│  ├─ Container
│  ├─ Heading: "Tell Us About Your Reading Journey"
│  └─ Question Cards (7 total = 6 questions + submit)
│     ├─ Question 1
│     │  ├─ h3 (question text)
│     │  └─ Options (4)
│     ├─ Question 2
│     │  ├─ h3 (question text)
│     │  └─ Options (5)
│     ├─ ... (3-6 similar)
│     ├─ Submit Button
│     └─ Result Card (hidden until submitted)
│        ├─ h3 (personalized title)
│        ├─ p (personalized message)
│        └─ Action Buttons
│
├─ SECTION: Feedback
│  ├─ Container
│  ├─ Heading: "Share Your Feedback"
│  ├─ Feedback Card
│  │  ├─ Alert (hidden by default)
│  │  └─ Form
│  │     ├─ Form Group: Name
│  │     │  ├─ Label
│  │     │  └─ Input (text)
│  │     ├─ Form Group: Email
│  │     │  ├─ Label
│  │     │  └─ Input (email)
│  │     ├─ Form Group: Rating
│  │     │  ├─ Label
│  │     │  └─ Select (1-5)
│  │     ├─ Form Group: Feedback
│  │     │  ├─ Label
│  │     │  └─ Textarea
│  │     ├─ Loading Spinner (hidden)
│  │     └─ Submit Button
│
└─ FOOTER (implicit)
```

---

## Data Flow: Assessment Score

```
User selects answer to question 1
    ↓ selectOption(element)
    ↓
Get question number: data-question="1"
Get score value: data-score="20"
Remove previous selection from all options
Add .selected class to clicked option
Store in answers[1] = { text: "...", score: 20 }
    ↓
Check if all 6 questions answered
    ↓
If yes: Enable submit button
    ↓
User clicks "See Your Results"
    ↓ showResult()
    ↓
Calculate: totalScore = sum of all answer scores
(0-120 range possible)
    ↓
┌─────────────────────────────┐
│ Generate Result Based Score:│
├─────────────────────────────┤
│ 71+:  Perfect Fit           │
│ 61-70: Could Help           │
│ 55-60: Maybe Interested     │
│ <55:   Not Interested       │
└─────────────────────────────┘
    ↓
Display personalized result with action buttons
Scroll to results section
Store totalScore for later use (when submitting feedback)
```

---

## Data Flow: Feedback Submission

```
User fills feedback form:
- Name: "John Doe"
- Email: "john@example.com"
- Rating: "5"
- Feedback: "Great experience!"
    ↓
Form listener captures 'submit' event
Prevent default form submission
    ↓
Validation (script.js):
- Check name: not empty
- Check email: email format valid
- Check feedback: not empty
- Check rating: selected
    ↓
If validation fails:
- Show error alert
- Stop execution
    ↓
If validation passes:
- Show loading spinner
- Disable submit button
    ↓
Create request body:
{
  name: "John Doe",
  email: "john@example.com",
  feedback: "Great experience!",
  rating: 5,
  assessmentScore: 75,
  timestamp: "2025-11-21T10:30:00Z"
}
    ↓
Fetch POST /api/feedback
    ↓
    ╔═══════════════════════════════════════╗
    ║     SERVER PROCESSING (server.js)     ║
    ║                                       ║
    ║ 1. Validate data again                ║
    ║ 2. Check email format                 ║
    ║ 3. Create feedback object:            ║
    ║    {                                  ║
    ║      id: 1732186200000,              ║
    ║      name: "John Doe",               ║
    ║      email: "...",                   ║
    ║      feedback: "...",                ║
    ║      rating: 5,                      ║
    ║      assessmentScore: 75,            ║
    ║      timestamp: "...",               ║
    ║      received_at: "..."              ║
    ║    }                                 ║
    ║ 4. Save to feedback_data.json        ║
    ║ 5. Create user email HTML            ║
    ║ 6. Send via Nodemailer (Gmail)       ║
    ║ 7. Create admin email HTML           ║
    ║ 8. Send via Nodemailer (Gmail)       ║
    ║ 9. Return 200 OK response            ║
    ╚═══════════════════════════════════════╝
    ↓
Response received in browser
Check response.ok
    ↓
If success (200):
- Hide spinner
- Show "Thank you!" alert
- Reset form fields
- Data saved in feedback_data.json
- Emails sent to user and admin
    ↓
If error (400/500):
- Hide spinner
- Show error alert
- User can retry
```

---

## Email Sending Process

```
Server receives feedback submission
    ↓
Create User Confirmation Email
│
├─ To: john@example.com
├─ Subject: "Thank you for your feedback - BUQD"
├─ HTML:
│  - Hello, John!
│  - Thank you message
│  - Show their rating (5/5)
│  - Encourage feedback
│  - Company signature
│
└─ Send via Nodemailer
    ↓
Wait for response from Gmail
    ↓
Create Admin Notification Email
│
├─ To: admin@buqd.com
├─ Subject: "New Feedback Received - John Doe"
├─ HTML:
│  - New submission alert
│  - Name: John Doe
│  - Email: john@example.com
│  - Rating: 5/5
│  - Assessment Score: 75
│  - Full feedback message
│  - Timestamp
│
└─ Send via Nodemailer
    ↓
Wait for response from Gmail
    ↓
Return success response (200 OK) to browser
    ↓
Browser shows success alert to user
User sees: "Thank you! Your feedback has been sent successfully."
```

---

## File Size & Organization

```
styles.css              ~500 lines
├─ Reset & globals
├─ Hero section
├─ Animations (@keyframes)
├─ Assessment section
├─ Feedback form section
├─ Form elements
├─ Alerts & messages
└─ Utilities

script.js              ~150 lines
├─ Assessment variables
├─ selectOption function
├─ showResult function
├─ trackChoice function
├─ Feedback form variables
├─ Form event listener
├─ showAlert function
└─ DOMContentLoaded listener

server.js              ~150 lines
├─ Imports & middleware
├─ Nodemailer configuration
├─ Storage functions
├─ POST /api/feedback endpoint
├─ GET /api/feedback endpoint
├─ Static file serving
└─ Server startup

index.html             ~200 lines
├─ Meta tags
├─ CSS link
├─ Hero section
├─ Assessment section (6 questions)
├─ Results section
├─ Feedback form section
└─ Script link
```

---

## Technology Stack

```
Frontend:
├─ HTML5 (Semantic markup)
├─ CSS3 (Animations, Flexbox, Grid)
└─ JavaScript (ES6+)

Backend:
├─ Node.js (Runtime)
├─ Express (Web framework)
├─ Nodemailer (Email service)
├─ CORS (Cross-origin requests)
└─ Dotenv (Environment variables)

Email:
├─ Gmail (Primary)
├─ Outlook (Alternative)
└─ Custom SMTP (Advanced)

Storage:
├─ JSON file (Current)
├─ MongoDB (Future)
└─ PostgreSQL (Future)

Deployment:
├─ Vercel (Easiest)
├─ Heroku (Classic)
├─ Railway (Modern)
└─ DigitalOcean (Full Control)
```

---

## Success Criteria ✅

All implementation goals met:

✅ **Feedback Storage**
   - Stores in feedback_data.json
   - Includes timestamps
   - Unique ID per submission
   - Easily upgradeable

✅ **Email Sending**
   - Confirmation to user
   - Notification to admin
   - HTML formatted
   - Error handling

✅ **Code Organization**
   - Styles in separate CSS file
   - Logic in separate JS file
   - Server logic isolated
   - Clean file structure

✅ **User Experience**
   - Form validation
   - Loading indicators
   - Success/error messages
   - Mobile responsive

✅ **Documentation**
   - Setup instructions
   - Code comments
   - API documentation
   - Troubleshooting guide

---

**Total Implementation: 12 files, ~1000+ lines of code**
**Status: PRODUCTION READY** 🚀
