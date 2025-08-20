// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        if (!target || target === '#') return;
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar background effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
});

// ==========================================
// RATE US FORM API INTEGRATION
// ==========================================

// ==========================================
// OPTION 1: EMAILJS (Recommended for beginners)
// ==========================================
/*
 * EmailJS Setup Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables:
 *    - from_name
 *    - from_email
 *    - message
 *    - overall_rating
 *    - quality_rating
 *    - response_rating
 *    - service
 * 4. Get your Service ID, Template ID, and User ID
 */

// Initialize EmailJS (replace with your actual credentials)
emailjs.init('zh06HMfFUbe9fol_D'); // Uncomment and replace with your EmailJS user ID

// Handle rate us form submission
document.addEventListener('DOMContentLoaded', () => {
    const rateUsForm = document.getElementById('rateUsForm');
    if (rateUsForm) {
        rateUsForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const ratings = {
                overall: document.querySelectorAll('#overallRating .star.active').length,
                quality: document.querySelectorAll('#qualityRating .star.active').length,
                response: document.querySelectorAll('#responseRating .star.active').length
            };
            
            const templateParams = {
                name: formData.get('name'),
                email: formData.get('email'),
                service: formData.get('service'),
                feedback: formData.get('feedback'),
                overall_rating: ratings.overall,
                quality_rating: ratings.quality,
                response_rating: ratings.response,
                to_email: 'aditya2005321@gmail.com' // Replace with your email
            };
            
            try {
                // Send via EmailJS
                await emailjs.send('service_v9cfurs', 'template_8rtw6cf', templateParams);
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('rateUsForm').style.display = 'none';
            } catch (error) {
                alert('Error sending feedback: ' + error.text);
            }
        });
    }
});

// ==========================================
// OPTION 2: CUSTOM REST API
// ==========================================
/*
 * Custom API Setup Instructions:
 * 1. Create your API endpoint at your backend
 * 2. Endpoint should accept POST requests with JSON body
 * 3. Expected JSON structure:
 *    {
 *      "name": "string",
 *      "email": "string",
 *      "service": "string",
 *      "feedback": "string",
 *      "overall_rating": number,
 *      "quality_rating": number,
 *      "response_rating": number
 *    }
 */

async function submitFeedbackAPI(feedbackData) {
    try {
        const response = await fetch('https://your-api-endpoint.com/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // If needed
            },
            body: JSON.stringify(feedbackData)
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usage example:
// const rateUsForm = document.getElementById('rateUsForm');
// if (rateUsForm) {
//     rateUsForm.addEventListener('submit', async function(e) {
//         e.preventDefault();
//         const formData = new FormData(this);
//         const feedbackData = {
//             name: formData.get('name'),
//             email: formData.get('email'),
//             service: formData.get('service'),
//             feedback: formData.get('feedback'),
//             overall_rating: document.querySelectorAll('#overallRating .star.active').length,
//             quality_rating: document.querySelectorAll('#qualityRating .star.active').length,
//             response_rating: document.querySelectorAll('#responseRating .star.active').length
//         };
//         
//         try {
//             const result = await submitFeedbackAPI(feedbackData);
//             document.getElementById('successMessage').style.display = 'block';
//             document.getElementById('rateUsForm').style.display = 'none';
//         } catch (error) {
//             alert('Error submitting feedback: ' + error.message);
//         }
//     });
// }

// ==========================================
// OPTION 3: FIREBASE (Alternative)
// ==========================================
/*
 * Firebase Setup Instructions:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Add Firebase to your web app
 * 3. Enable Firestore database
 * 4. Configure Firebase in your project
 */

// Firebase configuration (replace with your actual config)
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_PROJECT.firebaseapp.com",
//     databaseURL: "https://YOUR_PROJECT.firebaseio.com",
//     projectId: "YOUR_PROJECT",
//     storageBucket: "YOUR_PROJECT.appspot.com",
//     messagingSenderId: "YOUR_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// Usage example:
// const rateUsForm = document.getElementById('rateUsForm');
// if (rateUsForm) {
//     rateUsForm.addEventListener('submit', async function(e) {
//         e.preventDefault();
//         const formData = new FormData(this);
//         const feedbackData = {
//             name: formData.get('name'),
//             email: formData.get('email'),
//             service: formData.get('service'),
//             feedback: formData.get('feedback'),
//             ratings: {
//                 overall: document.querySelectorAll('#overallRating .star.active').length,
//                 quality: document.querySelectorAll('#qualityRating .star.active').length,
//                 response: document.querySelectorAll('#responseRating .star.active').length
//             },
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         };
//         
//         try {
//             await db.collection('feedback').add(feedbackData);
//             document.getElementById('successMessage').style.display = 'block';
//             document.getElementById('rateUsForm').style.display = 'none';
//         } catch (error) {
//             alert('Error submitting feedback: ' + error.message);
//         }
//     });
// }

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Function to get star ratings
function getStarRating(containerId) {
    return document.querySelectorAll(`#${containerId} .star.active`).length;
}

// Function to validate form
function validateForm() {
    const overallRating = getStarRating('overallRating');
    const qualityRating = getStarRating('qualityRating');
    const responseRating = getStarRating('responseRating');
    
    if (overallRating === 0 || qualityRating === 0 || responseRating === 0) {
        alert('Please provide ratings for all categories.');
        return false;
    }
    return true;
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', () => {
    const rateUsForm = document.getElementById('rateUsForm');
    if (rateUsForm) {
        rateUsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) return;
            
            // Add your chosen API implementation here
            // Uncomment the option you want to use from above
        });
    }
});
