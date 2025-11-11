// ================================
// GSAP ANIMATIONS
// ================================

(function () {
  "use strict";

  // Wait for GSAP to load
  function initAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP not loaded yet");
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    animateHero();

    // Scroll reveal animations
    animateOnScroll();

    // Floating elements
    animateFloatingIcons();

    // Counter animations
    animateCounters();

    // Card animations
    animateCards();

    // Parallax effects
    initParallax();
  }

  // Hero Section Animations
  function animateHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate title
    timeline.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
    });

    // Animate subtitle
    timeline.to(
      ".hero-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.5"
    );

    // Animate CTA buttons
    timeline.to(
      ".hero-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.5"
    );

    // Animate stats
    timeline.to(
      ".hero-stats",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.5"
    );

    // Animate scroll indicator
    timeline.to(
      ".scroll-indicator",
      {
        opacity: 1,
        duration: 0.5,
      },
      "-=0.3"
    );
  }

  // Animate floating icons
  function animateFloatingIcons() {
    const icons = document.querySelectorAll(".floating-icon");

    icons.forEach((icon, index) => {
      gsap.to(icon, {
        y: "+=30",
        duration: 3 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.2,
      });

      gsap.to(icon, {
        x: "+=20",
        duration: 4 + index * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });

      gsap.to(icon, {
        rotation: "+=15",
        duration: 5 + index * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.1,
      });
    });
  }

  // Counter animations
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2;

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            textContent: target,
            duration: duration,
            ease: "power1.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              counter.textContent = Math.ceil(
                counter.textContent
              ).toLocaleString();
            },
          });
        },
      });
    });
  }

  // Scroll reveal animations
  function animateOnScroll() {
    // Section headers
    const headers = document.querySelectorAll(".section-header");
    headers.forEach((header) => {
      // Set initial state
      gsap.set(header, { opacity: 1 });

      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    });

    // Section CTAs
    const ctas = document.querySelectorAll(".section-cta");
    ctas.forEach((cta) => {
      gsap.set(cta, { opacity: 1 });

      gsap.from(cta, {
        scrollTrigger: {
          trigger: cta,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      });
    });
  }

  // Card animations with stagger
  function animateCards() {
    // Article cards
    const articleCards = document.querySelectorAll(".article-card");
    if (articleCards.length > 0) {
      articleCards.forEach((card, index) => {
        // Ensure cards are visible by default
        gsap.set(card, { opacity: 1, y: 0 });

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
          opacity: 0,
          y: 20,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          clearProps: "all",
        });
      });
    }

    // Story cards
    const storyCards = document.querySelectorAll(".story-card");
    if (storyCards.length > 0) {
      storyCards.forEach((card, index) => {
        // Ensure cards are visible by default
        gsap.set(card, { opacity: 1, y: 0 });

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
          opacity: 0,
          y: 20,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          clearProps: "all",
        });
      });
    }
  }

  // Parallax effects
  function initParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: (i, target) =>
          -ScrollTrigger.maxScroll(window) * target.dataset.speed || 100,
        ease: "none",
      });
    });
  }

  // Newsletter section animation
  function animateNewsletter() {
    const newsletter = document.querySelector(".newsletter");
    if (!newsletter) return;

    gsap.from(newsletter, {
      scrollTrigger: {
        trigger: newsletter,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
    });
  }

  // Footer animation
  function animateFooter() {
    const footerSections = document.querySelectorAll(".footer-section");

    gsap.from(footerSections, {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }

  // Hover animations for cards
  function initCardHoverEffects() {
    const cards = document.querySelectorAll(".article-card, .story-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        gsap.to(this, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // Button hover effects
  function initButtonEffects() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(this, {
          "--x": x + "px",
          "--y": y + "px",
          duration: 0.3,
        });
      });
    });
  }

  // Smooth scroll to section
  function initSmoothScroll() {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const nextSection = document.querySelector(".featured-articles");
        if (nextSection) {
          gsap.to(window, {
            scrollTo: {
              y: nextSection,
              offsetY: 80,
            },
            duration: 1,
            ease: "power3.inOut",
          });
        }
      });
    }
  }

  // Page transition effect
  function createPageTransition() {
    const links = document.querySelectorAll(
      'a[href^="pages/"], a[href="index.html"]'
    );

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Skip if it's an anchor link
        if (href.includes("#")) return;

        e.preventDefault();

        // Create transition overlay
        const overlay = document.createElement("div");
        overlay.className = "page-transition";
        document.body.appendChild(overlay);

        gsap.to(overlay, {
          y: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            window.location.href = href;
          },
        });
      });
    });
  }

  // Text reveal animation
  function animateTextReveal() {
    const titles = document.querySelectorAll(".section-title, .hero-title");

    titles.forEach((title) => {
      const text = title.textContent;
      title.textContent = "";

      const words = text.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.display = "inline-block";
        span.style.opacity = "0";
        title.appendChild(span);
      });

      ScrollTrigger.create({
        trigger: title,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(title.children, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });
    });
  }

  // Refresh ScrollTrigger on theme change
  window.addEventListener("themeChanged", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  });

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(initAnimations, 100);
      initCardHoverEffects();
      initButtonEffects();
      initSmoothScroll();
      animateNewsletter();
      animateFooter();
    });
  } else {
    setTimeout(initAnimations, 100);
    initCardHoverEffects();
    initButtonEffects();
    initSmoothScroll();
    animateNewsletter();
    animateFooter();
  }

  // Export animation functions
  window.PetPalsAnimations = {
    init: initAnimations,
    refreshScrollTrigger: () => ScrollTrigger.refresh(),
  };
})();
