// Assessment Logic
const answers = {};
let totalScore = 0;

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
        message = "Based on your responses, you're experiencing the exact challenges BUQD solves. Whether you want to access more books affordably, earn from your existing collection, or connect with fellow readers, we've got you covered. Let's schedule a personal chat to discuss your specific needs.";
        buttons = `
            <button class="cta-button" onclick="window.open('https://forms.gle/your-one-on-one-form', '_blank', 'noopener')">
                Schedule a One-on-One Chat
            </button>
        `;
    } else if (totalScore >= 61) {
        title = "BUQD Could Really Help You 📚";
        message = "Your reading habits and collection show that BUQD could make a real difference in how you access and share books. Join us for a Google Meet where we'll walk you through exactly how our platform works and answer all your questions.";
        buttons = `
            <button class="cta-button" onclick="window.open('https://meet.google.com/your-meet-link', '_blank', 'noopener')">
                Join Our Solution Demo
            </button>
        `;
    } else if (totalScore >= 55) {
        title = "Curious About BUQD? 💡";
        message = "BUQD might be a good fit for you. We're hosting group calls where readers like you learn how our platform can help you save money, earn from your books, and connect with other readers. Would you like to join us, or would you prefer to explore on your own for now?";
        buttons = `
            <button class="cta-button" onclick="trackChoice('group_call'); window.open('https://calendly.com/your-group-call', '_blank', 'noopener')">
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
