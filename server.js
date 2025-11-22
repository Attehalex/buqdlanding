const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files with proper caching headers
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'application/javascript');
        }
        if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    }
}));

// Configure Email Transporter
let transporter;

if (process.env.EMAIL_SERVICE === 'protonmail') {
    // ProtonMail configuration
    transporter = nodemailer.createTransport({
        host: 'smtp.protonmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
} else {
    // Default Gmail configuration
    transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
}

// Storage for feedback (in production, use a database)
const feedbackFile = path.join(__dirname, 'feedback_data.json');

function readFeedbackData() {
    try {
        if (fs.existsSync(feedbackFile)) {
            return JSON.parse(fs.readFileSync(feedbackFile, 'utf8'));
        }
    } catch (error) {
        console.error('Error reading feedback data:', error);
    }
    return [];
}

function writeFeedbackData(data) {
    try {
        fs.writeFileSync(feedbackFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing feedback data:', error);
    }
}

// API Endpoint: Submit Feedback
app.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, feedback, rating, assessmentScore, timestamp } = req.body;

        // Validation
        if (!name || !email || !feedback || !rating) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Create feedback object
        const feedbackData = {
            id: Date.now(),
            name,
            email,
            feedback,
            rating,
            assessmentScore,
            timestamp,
            received_at: new Date().toISOString()
        };

        // Save to local storage
        const allFeedback = readFeedbackData();
        allFeedback.push(feedbackData);
        writeFeedbackData(allFeedback);

        // Send confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for your feedback - BUQD',
            html: `
                <h2>Thank You for Your Feedback!</h2>
                <p>Hi ${name},</p>
                <p>We've received your feedback and really appreciate you taking the time to share your thoughts with us.</p>
                <p><strong>Your Rating:</strong> ${rating}/5</p>
                <p>We're committed to improving BUQD based on feedback from users like you. If you have any further questions, feel free to reach out!</p>
                <br>
                <p>Best regards,<br>The BUQD Team</p>
            `
        };

        await transporter.sendMail(userMailOptions);

        // Send admin notification
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: `New Feedback Received - ${name}`,
            html: `
                <h2>New Feedback Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Rating:</strong> ${rating}/5</p>
                <p><strong>Assessment Score:</strong> ${assessmentScore}</p>
                <p><strong>Feedback:</strong></p>
                <p>${feedback.replace(/\n/g, '<br>')}</p>
                <p><strong>Received at:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        await transporter.sendMail(adminMailOptions);

        // Respond to client
        res.status(200).json({
            message: 'Feedback submitted successfully',
            id: feedbackData.id
        });

    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({ message: 'Failed to process feedback. Please try again.' });
    }
});

// API Endpoint: Get All Feedback (Admin)
app.get('/api/feedback', (req, res) => {
    try {
        // In production, add authentication here
        const feedback = readFeedbackData();
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        res.status(500).json({ message: 'Failed to retrieve feedback' });
    }
});

// Serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Make sure your .env file is configured with email credentials');
});
