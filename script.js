//smooth scrolingl
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//navbar scroll effect
window.addEventListener('scroll', ()=> {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)' :
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
);
//contact form submission

const form = document.querySelector('form');
function sendEmail() {
import smtp from 'smtp.js';


const email = {

  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Test email',
  text: 'This is a test email sent from the browser'

}


smtp.sendMail(email)
  .then(info =&gt; console.log(info))
  .catch(err =&gt; console.error(err)) }