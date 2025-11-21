// Assessment Logic
const answers = {};
let totalScore = 0;

// IMPORTANT: Update this with your Calendly link
// Create a Calendly account and get your scheduling link
const CALENDLY_ONE_ON_ONE = 'https://calendly.com/your-username/one-on-one';

function selectOption(element) {
    const question = element.parentElement.getAttribute('data-question');
    const options = element.parentElement.querySelectorAll('.option');

    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    const score = parseInt(element.getAttribute('data-score'));
    answers[question] = {
        text: element.textContent,
        score: score
    };

    if (Object.keys(answers).length === 6) {
        document.getElementById('submitBtn').disabled = false;
    }
}

function showResult() {
    totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);

    const resultDiv = document.getElementById('result');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const actionButtons = document.getElementById('actionButtons');

    let title = "";
    let message = "";
    let buttons = "";

    if (totalScore >= 71) {
        title = "BUQD is Perfect for You! 🎯";
        message = "Based on your responses, you're experiencing the exact challenges BUQD solves. Whether you want to access more books affordably, earn from your existing collection, or connect with fellow readers, we've got you covered. Let's schedule a personal chat to discuss your specific needs!";
        buttons = `
            <button class="cta-button" onclick="showContactForm()">
                Schedule Your One-on-One
            </button>
        `;
    } else if (totalScore >= 61) {
        title = "BUQD Could Really Help You 📚";
        message = "Your reading habits and collection show that BUQD could make a real difference in how you access and share books. Join us for a Google Meet where we'll walk you through exactly how our platform works and answer all your questions.";
        buttons = `
            <button class="cta-button" onclick="alert('Thank you! Our team will reach out to you soon to share the demo link.')">
                Join Our Solution Demo
            </button>
        `;
    } else if (totalScore >= 55) {
        title = "Curious About BUQD? 💡";
        message = "BUQD might be a good fit for you. We're hosting group calls where readers like you learn how our platform can help you save money, earn from your books, and connect with other readers. Would you like to join us, or would you prefer to explore on your own for now?";
        buttons = `
            <button class="cta-button" onclick="trackChoice('group_call'); alert('Thank you! Our team will send you the group call link soon.')">
                Join a Group Call
            </button>
            <button class="secondary-btn" onclick="trackChoice('not_now'); alert('Thanks for your interest! Feel free to explore our site and reach out when you\\'re ready.')">
                Not Right Now
            </button>
        `;
    } else {
        title = "Thanks for Your Interest! 👋";
        message = "It looks like BUQD might not be the right fit for your current reading situation, and that's okay! If your circumstances change or you'd like to learn more in the future, we're here.";
        buttons = `
            <button class="secondary-btn" onclick="alert('Thanks! We\\'ll keep you updated on BUQD.')">
                Stay Updated
            </button>
        `;
    }

    resultTitle.textContent = title;
    resultText.textContent = message;
    actionButtons.innerHTML = buttons;

    resultDiv.classList.add('show');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function trackChoice(choice) {
    console.log(`User chose: ${choice} with score: ${totalScore}`);
}

// Function to show contact form for perfect matches
function showContactForm() {
    // Create a modal form
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const form = document.createElement('div');
    form.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;

    form.innerHTML = `
        <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem; color: #0E2025;">Get on the Calendar</h2>
        <p style="color: #666; margin-bottom: 1.5rem;">Please share your details so we can reach out to you and schedule your one-on-one call.</p>
        
        <div style="margin-bottom: 1rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #0E2025;">Full Name</label>
            <input type="text" id="contactName" placeholder="Your Name" style="width: 100%; padding: 0.75rem; border: 2px solid #ccc; border-radius: 10px; font-size: 1rem; font-family: Poppins;">
        </div>

        <div style="margin-bottom: 1rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #0E2025;">Email</label>
            <input type="email" id="contactEmail" placeholder="your@email.com" style="width: 100%; padding: 0.75rem; border: 2px solid #ccc; border-radius: 10px; font-size: 1rem; font-family: Poppins;">
        </div>

        <div style="margin-bottom: 2rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #0E2025;">Phone Number</label>
            <input type="tel" id="contactPhone" placeholder="+1 (555) 123-4567" style="width: 100%; padding: 0.75rem; border: 2px solid #ccc; border-radius: 10px; font-size: 1rem; font-family: Poppins;">
        </div>

        <div style="display: flex; gap: 1rem;">
            <button onclick="saveContactAndOpenCalendly()" style="flex: 1; background: #358D74; color: white; border: none; padding: 1rem; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: Poppins; font-size: 1rem;">
                Continue to Calendar
            </button>
            <button onclick="document.querySelector('[data-modal-close]').click()" style="flex: 1; background: #f0f0f0; color: #0E2025; border: none; padding: 1rem; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: Poppins; font-size: 1rem;">
                Cancel
            </button>
        </div>
    `;

    modal.appendChild(form);
    document.body.appendChild(modal);

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('data-modal-close', 'true');
    closeBtn.onclick = () => modal.remove();
    closeBtn.style.display = 'none';
    modal.appendChild(closeBtn);

    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Function to save contact info and open Calendly
async function saveContactAndOpenCalendly() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;

    // Validation
    if (!name || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }

    try {
        // Save contact info to feedback system
        await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                feedback: 'Perfect match - scheduled one-on-one call',
                rating: 5,
                assessmentScore: totalScore,
                timestamp: new Date().toISOString(),
                meetingType: 'one-on-one',
                leadStatus: 'contacted'
            })
        });

        // Close the modal
        document.body.lastChild.remove();

        // Open Calendly in popup
        window.open(CALENDLY_ONE_ON_ONE, 'calendly', 'width=800,height=700,toolbar=no,location=no');
        
        alert('Great! Please select a time that works for you. We look forward to talking with you!');
    } catch (error) {
        console.error('Error:', error);
        // Still open Calendly even if save fails
        window.open(CALENDLY_ONE_ON_ONE, 'calendly', 'width=800,height=700,toolbar=no,location=no');
    }
}

// Feedback Form Handling
const feedbackForm = document.getElementById('feedbackForm');
const feedbackAlert = document.getElementById('feedbackAlert');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;
        const rating = document.getElementById('rating').value;

        // Validation
        if (!name || !email || !feedback || !rating) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = feedbackForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        const spinner = feedbackForm.querySelector('.spinner');

        submitBtn.disabled = true;
        spinner.classList.add('show');

        try {
            // Send feedback to server
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    feedback,
                    rating,
                    assessmentScore: totalScore,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();

            if (response.ok) {
                showAlert('Thank you! Your feedback has been sent successfully.', 'success');
                feedbackForm.reset();
            } else {
                showAlert(data.message || 'Failed to send feedback. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('An error occurred. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            spinner.classList.remove('show');
        }
    });
}

function showAlert(message, type) {
    const alert = document.getElementById('feedbackAlert');
    if (!alert) return;

    alert.textContent = message;
    alert.className = `alert show ${type}`;

    setTimeout(() => {
        alert.classList.remove('show');
    }, 4000);
}

// Smooth scroll for CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('[onclick*="scrollIntoView"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
