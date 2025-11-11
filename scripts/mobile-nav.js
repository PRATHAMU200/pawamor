/**
 * Mobile Bottom Navigation Script
 * Handles show/hide on scroll and active state management
 */

(function () {
  "use strict";

  let lastScrollTop = 0;
  let scrollTimeout;
  const delta = 5; // Minimum scroll distance
  const navbarHeight = 60;

  function initMobileBottomNav() {
    const bottomNav = document.getElementById("mobileBottomNav");
    if (!bottomNav) return;

    // Set active state based on current page
    setActiveNavItem();

    // Handle scroll to show/hide navigation
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle click events
    const navItems = bottomNav.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Add ripple effect
        addRippleEffect(this, e);

        // Update active state
        navItems.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  function handleScroll() {
    const bottomNav = document.getElementById("mobileBottomNav");
    if (!bottomNav) return;

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Make sure scroll is more than delta
      if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

      // Scrolling down - hide nav
      if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        bottomNav.classList.add("hidden");
      }
      // Scrolling up - show nav
      else {
        bottomNav.classList.remove("hidden");
      }

      lastScrollTop = scrollTop;
    }, 10);
  }

  function setActiveNavItem() {
    const bottomNav = document.getElementById("mobileBottomNav");
    if (!bottomNav) return;

    const currentPath = window.location.pathname;
    const navItems = bottomNav.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      const href = item.getAttribute("href");

      // Check if current page matches nav item
      if (
        currentPath.includes(href) ||
        (href.includes("index.html") && currentPath === "/") ||
        (href === "../../index.html" &&
          (currentPath.endsWith("/") || currentPath.includes("index.html")))
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function addRippleEffect(element, event) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple-effect");

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileBottomNav);
  } else {
    initMobileBottomNav();
  }

  // Re-check active state on page show (for back button)
  window.addEventListener("pageshow", setActiveNavItem);
})();

// Add ripple effect styles dynamically
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);
