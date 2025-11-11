/**
 * Smooth Horizontal Scroll Carousels (Social Media Style)
 * Only enabled on homepage for featured sections
 */

(function () {
  "use strict";

  function initCarousels() {
    // Only run on mobile devices
    if (window.innerWidth > 768) return;

    // Only run on homepage (not on blog or stories pages)
    const isHomepage =
      !document.body.classList.contains("page-blog") &&
      !document.body.classList.contains("page-stories");

    if (!isHomepage) return;

    const carousels = document.querySelectorAll(
      ".carousel-wrapper .articles-grid, .carousel-wrapper .stories-grid"
    );

    carousels.forEach((carousel) => {
      initCarousel(carousel);
      addProgressBar(carousel);
    });
  }

  function initCarousel(carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Set cursor styles
    carousel.style.cursor = "grab";

    // Mouse/Touch events for direct scrolling
    carousel.addEventListener("mousedown", startDragging);
    carousel.addEventListener("touchstart", startDragging, { passive: true });

    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging, { passive: true });

    carousel.addEventListener("mouseup", stopDragging);
    carousel.addEventListener("mouseleave", stopDragging);
    carousel.addEventListener("touchend", stopDragging, { passive: true });

    // Update progress bar on scroll
    carousel.addEventListener(
      "scroll",
      () => {
        updateProgressBar(carousel);
      },
      { passive: true }
    );

    function startDragging(e) {
      isDown = true;
      carousel.style.cursor = "grabbing";
      carousel.style.userSelect = "none";

      startX = getPositionX(e);
      scrollLeft = carousel.scrollLeft;
    }

    function dragging(e) {
      if (!isDown) return;

      const x = getPositionX(e);
      const walk = startX - x; // Direct 1:1 mapping - no multiplier
      carousel.scrollLeft = scrollLeft + walk;
    }

    function stopDragging() {
      isDown = false;
      carousel.style.cursor = "grab";
      carousel.style.userSelect = "";
    }

    function getPositionX(e) {
      return e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    }
  }

  function addProgressBar(carousel) {
    // Check if progress bar already exists
    if (carousel.parentElement.querySelector(".scroll-progress-bar")) return;

    const progressBarContainer = document.createElement("div");
    progressBarContainer.className = "scroll-progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "scroll-progress-fill";

    progressBarContainer.appendChild(progressFill);
    carousel.parentElement.appendChild(progressBarContainer);

    // Initial update
    updateProgressBar(carousel);
  }

  function updateProgressBar(carousel) {
    const progressFill = carousel.parentElement.querySelector(
      ".scroll-progress-fill"
    );
    if (!progressFill) return;

    const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    const scrolled = carousel.scrollLeft;

    if (scrollWidth > 0) {
      const progress = (scrolled / scrollWidth) * 100;
      progressFill.style.width = Math.min(Math.max(progress, 0), 100) + "%";
    } else {
      progressFill.style.width = "100%";
    }
  }

  // Initialize
  function init() {
    initCarousels();

    // Re-check on resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-initialize if window size changes
        if (window.innerWidth <= 768) {
          initCarousels();
        }
      }, 250);
    });
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
