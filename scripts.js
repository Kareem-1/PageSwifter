/* 
  ============================================================================
  scripts.js
  ============================================================================
  This file contains:
    1. Form Validation + EmailJS submission
    2. Smooth Scrolling
    3. Intersection Observer for fade-in animations
    4. Optional Typing Effect for Hero subheadline
  ============================================================================
*/

/* ---------------------------------------------------------------------------
   1. FORM VALIDATION + EMAILJS
   --------------------------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const detailsField = document.getElementById('details');
    
    // Simple validation checks
    if (!nameField.value.trim()) {
      alert('Please enter your name.');
      nameField.focus();
      event.preventDefault();
      return;
    }
    
    if (!emailField.value.trim()) {
      alert('Please enter your email.');
      emailField.focus();
      event.preventDefault();
      return;
    }
    
    if (!detailsField.value.trim()) {
      alert('Please enter project details.');
      detailsField.focus();
      event.preventDefault();
      return;
    }

    // All checks passed, prevent the default form submission
    // so we can handle sending via EmailJS
    event.preventDefault();
    
    // Call function to send the email using EmailJS
    sendEmail(nameField.value, emailField.value, detailsField.value);
  });
}

/**
 * Sends an email using EmailJS with the user's form data.
 * @param {string} name - The user's name
 * @param {string} email - The user's email
 * @param {string} details - The user's project details
 */
function sendEmail(name, email, details) {
  // Initialize EmailJS with your Public Key
  // (You only need to do this once in your app)
  emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual Public Key

  // Prepare the template parameters (keys must match your EmailJS template)
  const templateParams = {
    from_name: name,        // or the field name you set in your template
    reply_to: email,        // ensures you can reply to their email
    message: details,       // the main message (project details)
    to_email: 'kmkg2001@gmail.com' // just in case you want to pass it in the template
  };

  // Send the email
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('Thank you! Your message has been sent successfully.');
      // Optionally, you can reset the form here:
      contactForm.reset();
    }, function(error) {
      console.error('FAILED...', error);
      alert('Oops! Something went wrong, please try again later.');
    });
}

/* ---------------------------------------------------------------------------
   2. SMOOTH SCROLLING
   --------------------------------------------------------------------------- 
   Smoothly scrolls to page sections when navigation links are clicked.
   Note: Modern browsers support scroll-behavior: smooth in CSS, but this
   JS ensures better compatibility and can handle older browsers too.
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // If the link is purely a hash (i.e., on-page navigation)
    if (this.getAttribute('href').length > 1) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

/* ---------------------------------------------------------------------------
   3. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
   ---------------------------------------------------------------------------
   - Elements with class 'fade-in' will fade in once they enter the viewport.
   - Make sure to add 'fade-in' in HTML and the corresponding CSS rules:
       .fade-in {
         opacity: 0;
         transform: translateY(20px);
         transition: opacity 0.8s ease, transform 0.8s ease;
       }
       .fade-in.appear {
         opacity: 1;
         transform: translateY(0);
       }
*/
const fadeEls = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

fadeEls.forEach(el => {
  appearOnScroll.observe(el);
});

/* ---------------------------------------------------------------------------
   4. OPTIONAL TYPING EFFECT
   ---------------------------------------------------------------------------
   - To use this, create an empty element in your HTML, for example:
       <p id="typedSubheadline"></p>
     Then call typeEffect() on that element ID with the desired text.
   - Adjust typing speed if you like.
*/
function typeEffect(element, text, speed = 50) {
  let index = 0;
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Example usage: If your hero subheadline is empty in HTML:
//    <p id="typedSubheadline"></p>
//
// You can uncomment this call to have the text typed out:
const subHeadline = document.getElementById('typedSubheadline');
if (subHeadline) {
  typeEffect(subHeadline, "Built for Startups and Growing Businesses.", 60);
}
