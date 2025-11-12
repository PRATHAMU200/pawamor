// Form Handler for Newsletter and Contact Forms
// This file handles all form submissions to Firebase Firestore

// ==========================================
// NEWSLETTER FORM HANDLER
// ==========================================

function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const email = emailInput.value.trim();

  // Validate email
  if (!email || !isValidEmail(email)) {
    showMessage(form, "Please enter a valid email address", "error");
    return;
  }

  // Disable button and show loading
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

  // Get Firebase database
  const db = window.firebaseDB;

  if (!db) {
    showMessage(
      form,
      "Database connection error. Please try again later.",
      "error"
    );
    resetButton(submitButton, '<i class="fas fa-paper-plane"></i> Subscribe');
    return;
  }

  // Create subscription data
  const subscriptionData = {
    email: email,
    subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
    source: "homepage",
    userAgent: navigator.userAgent,
    language: navigator.language,
  };

  // Save to Firestore
  db.collection("newsletter_subscriptions")
    .add(subscriptionData)
    .then((docRef) => {
      console.log("Newsletter subscription saved with ID:", docRef.id);
      showMessage(
        form,
        "🎉 You are successfully registered to subscription letter!",
        "success"
      );
      form.reset();

      // Reset button after 2 seconds
      setTimeout(() => {
        resetButton(
          submitButton,
          'Subscribe <i class="fas fa-paper-plane"></i>'
        );
      }, 2000);

      // Track with Google Analytics if available
      if (typeof gtag !== "undefined") {
        gtag("event", "newsletter_subscription", {
          event_category: "engagement",
          event_label: "homepage_newsletter",
        });
      }
    })
    .catch((error) => {
      console.error("Error saving newsletter subscription:", error);
      showMessage(
        form,
        "Oops! Something went wrong. Please try again.",
        "error"
      );
      resetButton(submitButton, 'Subscribe <i class="fas fa-paper-plane"></i>');
    });
}

// ==========================================
// CONTACT FORM HANDLER
// ==========================================

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Get form values
  const formData = {
    name: form.querySelector("#name")?.value.trim(),
    email: form.querySelector("#email")?.value.trim(),
    subject: form.querySelector("#subject")?.value.trim(),
    message: form.querySelector("#message")?.value.trim(),
  };

  // Validate fields
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    showMessage(form, "Please fill in all required fields", "error");
    return;
  }

  if (!isValidEmail(formData.email)) {
    showMessage(form, "Please enter a valid email address", "error");
    return;
  }

  if (formData.message.length < 10) {
    showMessage(form, "Message must be at least 10 characters long", "error");
    return;
  }

  // Disable button and show loading
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Get Firebase database
  const db = window.firebaseDB;

  if (!db) {
    showMessage(
      form,
      "Database connection error. Please try again later.",
      "error"
    );
    resetButton(
      submitButton,
      '<i class="fas fa-paper-plane"></i> Send Message'
    );
    return;
  }

  // Create submission data
  const contactData = {
    ...formData,
    submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
    status: "new",
    userAgent: navigator.userAgent,
    language: navigator.language,
    referrer: document.referrer || "direct",
  };

  // Save to Firestore
  db.collection("contact_submissions")
    .add(contactData)
    .then((docRef) => {
      console.log("Contact form saved with ID:", docRef.id);
      showMessage(
        form,
        "✅ Message sent successfully! We'll respond within 24 hours.",
        "success"
      );
      form.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        resetButton(
          submitButton,
          '<i class="fas fa-paper-plane"></i> Send Message'
        );
      }, 3000);

      // Track with Google Analytics if available
      if (typeof gtag !== "undefined") {
        gtag("event", "contact_form_submission", {
          event_category: "engagement",
          event_label: "contact_page",
        });
      }
    })
    .catch((error) => {
      console.error("Error saving contact form:", error);
      showMessage(
        form,
        "Oops! Something went wrong. Please try again.",
        "error"
      );
      resetButton(
        submitButton,
        '<i class="fas fa-paper-plane"></i> Send Message'
      );
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(form, message, type) {
  // Remove any existing message
  const existingMessage = form.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.innerHTML = message;

  // Add styles
  messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        ${
          type === "success"
            ? "background: linear-gradient(135deg, #66bb6a, #4caf50); color: white;"
            : "background: linear-gradient(135deg, #ef5350, #e53935); color: white;"
        }
    `;

  // Insert after form
  form.appendChild(messageDiv);

  // Remove message after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

function resetButton(button, originalHTML) {
  button.disabled = false;
  button.innerHTML = originalHTML;
}

// ==========================================
// INITIALIZE FORMS ON PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Form handlers initialized");

  // Newsletter forms (can be multiple on different pages)
  const newsletterForms = document.querySelectorAll(
    'form[id*="newsletter"], form[id*="Newsletter"]'
  );
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", handleNewsletterSubmit);
    console.log("✅ Newsletter form connected");
  });

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
    console.log("✅ Contact form connected");
  }

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-20px);
                opacity: 0;
            }
        }
        
        .form-message {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .form-message::before {
            content: '${type === "success" ? "✓" : "⚠"}';
            font-weight: bold;
            font-size: 1.2rem;
        }
    `;
  document.head.appendChild(style);
});

// Export functions for manual use if needed
window.pawamor = {
  submitNewsletter: handleNewsletterSubmit,
  submitContact: handleContactSubmit,
};
