smtp.sendMail(email)
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // ignore links that are just "#"
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

// -----------------------------
// Contact form using EmailJS
// -----------------------------
/*
  This contact handler uses EmailJS (https://www.emailjs.com/) to send emails
  directly from the browser without exposing your SMTP password.

  Steps to set up (quick):
  1. Sign up at EmailJS and create an Email Service (e.g. Gmail, Outlook).
  2. Create an Email Template and include the variables used below
     (from_name, from_email, message). You may also configure the recipient
     in the EmailJS template dashboard.
  3. Copy your EmailJS "Service ID", "Template ID" and "User ID".
  4. Replace the placeholders below: YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID.

  Where to add your recipient email:
  - Prefer to set the recipient in the EmailJS template (in EmailJS dashboard).
  - Alternatively, you can add a `to_email` key to templateParams below and
    use it in the template; see the marked line: "// <-- ADD YOUR EMAIL HERE".

  Note: Remember not to commit your actual user/service/template IDs to a public repo.
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    // Initialize EmailJS - REPLACE with your user ID below
    // Example: emailjs.init('user_ABC123xyz');
    // ----> Add your EmailJS user id here:
    // emailjs.init('YOUR_USER_ID');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = (form.querySelector('input[name="name"]') || {}).value || '';
        const from_email = (form.querySelector('input[name="_replyto"]') || {}).value || '';
        const message = (form.querySelector('textarea[name="message"]') || {}).value || '';

        if (!name || !from_email || !message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        // Replace these IDs with your EmailJS values
        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        // If you didn't call emailjs.init above, you can pass your user id here as the 4th arg to send()
        const USER_ID = 'YOUR_USER_ID';

        const templateParams = {
            from_name: name,
            from_email: from_email,
            message: message,
            // to_email: 'your@yourdomain.com' // <-- ADD YOUR EMAIL HERE (optional; better to set in EmailJS template)
        };

        if (typeof emailjs === 'undefined') {
            alert('EmailJS SDK not found. Make sure you included the EmailJS script in your HTML.');
            return;
        }

        // If you called emailjs.init(USER_ID) above you can omit the last argument below
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams /*, USER_ID */)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent — thank you!');
                form.reset();
            }, function (err) {
                console.error('FAILED...', err);
                alert('Sorry — something went wrong. Please try again later.');
            });
    });
});