// ================================
// THEME TOGGLE SYSTEM
// ================================

(function () {
  "use strict";

  // Theme constants
  const THEME_KEY = "petpals-theme";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  // DOM elements
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Initialize theme
  function initTheme() {
    // Add preload class to prevent transition on page load
    document.body.classList.add("preload");

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem(THEME_KEY) || THEME_LIGHT;
    setTheme(savedTheme, false);

    // Remove preload class after a brief delay
    setTimeout(() => {
      document.body.classList.remove("preload");
    }, 100);
  }

  // Set theme
  function setTheme(theme, save = true) {
    html.setAttribute("data-theme", theme);

    if (save) {
      localStorage.setItem(THEME_KEY, theme);
    }

    // Update aria-label for accessibility
    if (themeToggle) {
      const label =
        theme === THEME_DARK ? "Switch to light mode" : "Switch to dark mode";
      themeToggle.setAttribute("aria-label", label);
    }

    // Dispatch custom event for other scripts
    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: { theme } })
    );
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

    // Add animation class
    document.body.style.transition = "background-color 0.3s ease";

    setTheme(newTheme);

    // Create particles effect on toggle
    createToggleEffect();
  }

  // Create visual effect on theme toggle
  function createToggleEffect() {
    if (!themeToggle) return;

    const rect = themeToggle.getBoundingClientRect();
    const particles = 12;

    for (let i = 0; i < particles; i++) {
      createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }

  // Create particle element
  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const angle = Math.PI * 2 * Math.random();
    const velocity = 20 + Math.random() * 30;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: var(--color-brand);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;

    document.body.appendChild(particle);

    // Animate particle
    let posX = x;
    let posY = y;
    let opacity = 1;

    const animate = () => {
      posX += vx * 0.1;
      posY += vy * 0.1;
      opacity -= 0.02;

      particle.style.left = posX + "px";
      particle.style.top = posY + "px";
      particle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    requestAnimationFrame(animate);
  }

  // Event listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);

    // Keyboard support
    themeToggle.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // System theme preference detection
  function detectSystemTheme() {
    if (!localStorage.getItem(THEME_KEY)) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? THEME_DARK : THEME_LIGHT);
    }
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });

  // Initialize on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }

  // Export theme functions for use in other scripts
  window.PetPalsTheme = {
    toggle: toggleTheme,
    set: setTheme,
    get: () => html.getAttribute("data-theme"),
    detectSystem: detectSystemTheme,
  };
})();
