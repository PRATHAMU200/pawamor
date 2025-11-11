// ================================
// MAIN JAVASCRIPT
// ================================

(function () {
  "use strict";

  // Initialize all features
  function init() {
    initNavigation();
    initBackToTop();
    initNewsletterForm();
    initScrollEffects();
    initMobileMenu();
    initLazyLoading();
  }

  // ================================
  // NAVIGATION
  // ================================
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      // Hide/show navbar on scroll
      if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScroll) {
          navbar.classList.add("hidden");
        } else {
          navbar.classList.remove("hidden");
        }
      }

      lastScroll = currentScroll;

      // Update active nav link based on scroll position
      updateActiveNavLink();
    });

    // Set active nav link
    setActiveNavLink();
  }

  function setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const linkPage = href.split("/").pop();

      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    // Only update if we're on the homepage
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname.endsWith("/")
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "index.html") {
          link.classList.add("active");
        }
      });
    }
  }

  // ================================
  // MOBILE MENU
  // ================================
  function initMobileMenu() {
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active")
          ? "hidden"
          : "";
      });

      // Close menu when clicking nav links
      const navLinks = navMenu.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = "";
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    }
  }

  // ================================
  // BACK TO TOP BUTTON
  // ================================
  function initBackToTop() {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ================================
  // NEWSLETTER FORM
  // ================================
  function initNewsletterForm() {
    const form = document.getElementById("newsletterForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector("button");
      const email = input.value;

      // Disable form
      button.disabled = true;
      const originalText = button.innerHTML;
      button.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

      // Simulate API call (replace with actual EmailJS or backend call)
      try {
        await simulateSubscription(email);

        // Success
        showNotification("Thank you for subscribing! 🎉", "success");
        input.value = "";
      } catch (error) {
        showNotification(
          "Oops! Something went wrong. Please try again.",
          "error"
        );
      } finally {
        button.disabled = false;
        button.innerHTML = originalText;
      }
    });
  }

  function simulateSubscription(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        if (email && email.includes("@")) {
          resolve();
        } else {
          reject();
        }
      }, 1500);
    });
  }

  // ================================
  // NOTIFICATION SYSTEM
  // ================================
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "exclamation-circle"
                }"></i>
                <span>${message}</span>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-bg);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // ================================
  // SCROLL EFFECTS
  // ================================
  function initScrollEffects() {
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // ================================
  // LAZY LOADING IMAGES
  // ================================
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // ================================
  // SEARCH FUNCTIONALITY
  // ================================
  function initSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();

      if (query.length < 2) {
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
        return;
      }

      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !searchInput.contains(e.target) &&
        !searchResults.contains(e.target)
      ) {
        searchResults.style.display = "none";
      }
    });
  }

  function performSearch(query) {
    // This would be replaced with actual search logic
    // For now, it's a placeholder
    console.log("Searching for:", query);
  }

  // ================================
  // FILTER FUNCTIONALITY
  // ================================
  function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterItems = document.querySelectorAll(".filter-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter items
        filterItems.forEach((item) => {
          if (filter === "all" || item.dataset.category === filter) {
            item.style.display = "block";
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // ================================
  // FORM VALIDATION
  // ================================
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("error");
      } else if (input.type === "email" && !validateEmail(input.value)) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    return isValid;
  }

  // ================================
  // READING TIME CALCULATOR
  // ================================
  function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }

  // ================================
  // UTILITY FUNCTIONS
  // ================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // ================================
  // ERROR HANDLING
  // ================================
  window.addEventListener("error", (e) => {
    console.error("An error occurred:", e.error);
  });

  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
  });

  // ================================
  // PERFORMANCE OPTIMIZATION
  // ================================

  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty("--transition-speed", "0.15s");
  }

  // ================================
  // INITIALIZE
  // ================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export utility functions
  window.PetPalsUtils = {
    showNotification,
    validateEmail,
    validateForm,
    calculateReadingTime,
    debounce,
    throttle,
  };
})();
