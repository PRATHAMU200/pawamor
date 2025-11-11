/**
 * Horizontal Scroll Carousels with Swipe Gestures
 * Mobile-optimized carousel with snap points
 */

(function() {
    'use strict';
    
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel-scroll, .horizontal-scroll');
        
        carousels.forEach(carousel => {
            initCarousel(carousel);
        });
    }
    
    function initCarousel(carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let lastX = 0;
        let lastTime = Date.now();
        
        // Mouse/Touch events
        carousel.addEventListener('mousedown', startDragging);
        carousel.addEventListener('touchstart', startDragging, { passive: true });
        
        carousel.addEventListener('mousemove', dragging);
        carousel.addEventListener('touchmove', dragging, { passive: true });
        
        carousel.addEventListener('mouseup', stopDragging);
        carousel.addEventListener('mouseleave', stopDragging);
        carousel.addEventListener('touchend', stopDragging);
        
        // Add indicators if configured
        if (carousel.dataset.indicators === 'true') {
            addScrollIndicators(carousel);
        }
        
        // Smooth snap scrolling
        carousel.addEventListener('scroll', () => {
            updateScrollIndicators(carousel);
        }, { passive: true });
        
        function startDragging(e) {
            isDown = true;
            carousel.classList.add('dragging');
            startX = getPositionX(e) - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            lastX = getPositionX(e);
            lastTime = Date.now();
            velocity = 0;
            
            // Cancel any momentum scrolling
            cancelMomentumTracking();
        }
        
        function dragging(e) {
            if (!isDown) return;
            e.preventDefault();
            
            const x = getPositionX(e) - carousel.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            carousel.scrollLeft = scrollLeft - walk;
            
            // Calculate velocity for momentum
            const now = Date.now();
            const dt = now - lastTime;
            const dx = getPositionX(e) - lastX;
            velocity = dx / dt;
            
            lastX = getPositionX(e);
            lastTime = now;
        }
        
        function stopDragging() {
            if (!isDown) return;
            isDown = false;
            carousel.classList.remove('dragging');
            
            // Apply momentum scrolling
            beginMomentumTracking();
        }
        
        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        }
        
        let momentumID;
        
        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }
        
        function cancelMomentumTracking() {
            if (momentumID) {
                cancelAnimationFrame(momentumID);
            }
        }
        
        function momentumLoop() {
            carousel.scrollLeft -= velocity * 10;
            velocity *= 0.95; // Friction
            
            if (Math.abs(velocity) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            } else {
                // Snap to nearest item
                snapToNearestItem(carousel);
            }
        }
    }
    
    function snapToNearestItem(carousel) {
        const items = carousel.querySelectorAll('.carousel-item, .article-card, .story-card');
        if (items.length === 0) return;
        
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;
        
        let closestItem = items[0];
        let closestDistance = Infinity;
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(carouselCenter - itemCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });
        
        // Smooth scroll to closest item
        const itemLeft = closestItem.offsetLeft;
        const carouselScrollLeft = carousel.scrollLeft;
        const itemOffset = itemLeft - carouselScrollLeft;
        
        carousel.scrollTo({
            left: carouselScrollLeft + itemOffset - (carousel.offsetWidth - closestItem.offsetWidth) / 2,
            behavior: 'smooth'
        });
    }
    
    function addScrollIndicators(carousel) {
        const items = carousel.querySelectorAll('.carousel-item, .article-card, .story-card');
        if (items.length <= 1) return;
        
        const indicatorContainer = document.createElement('div');
        indicatorContainer.className = 'swipe-indicator';
        
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'swipe-dot';
            if (index === 0) dot.classList.add('active');
            indicatorContainer.appendChild(dot);
        });
        
        carousel.parentElement.appendChild(indicatorContainer);
    }
    
    function updateScrollIndicators(carousel) {
        const container = carousel.parentElement;
        const indicatorContainer = container.querySelector('.swipe-indicator');
        if (!indicatorContainer) return;
        
        const items = carousel.querySelectorAll('.carousel-item, .article-card, .story-card');
        const dots = indicatorContainer.querySelectorAll('.swipe-dot');
        
        if (items.length === 0 || dots.length === 0) return;
        
        const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
        const activeIndex = Math.round(scrollPercentage * (items.length - 1));
        
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto-convert grids to horizontal scroll on mobile
    function convertGridsToCarousel() {
        if (window.innerWidth > 768) return;
        
        const grids = document.querySelectorAll('.articles-grid, .stories-grid');
        
        grids.forEach(grid => {
            if (!grid.classList.contains('horizontal-scroll')) {
                grid.classList.add('horizontal-scroll');
                grid.dataset.indicators = 'true';
                initCarousel(grid);
                addScrollIndicators(grid);
            }
        });
    }
    
    // Keyboard navigation for accessibility
    function initKeyboardNavigation() {
        const carousels = document.querySelectorAll('.carousel-scroll, .horizontal-scroll');
        
        carousels.forEach(carousel => {
            carousel.addEventListener('keydown', (e) => {
                const items = carousel.querySelectorAll('.carousel-item, .article-card, .story-card');
                if (items.length === 0) return;
                
                const itemWidth = items[0].offsetWidth;
                
                if (e.key === 'ArrowLeft') {
                    carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                } else if (e.key === 'ArrowRight') {
                    carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
                }
            });
        });
    }
    
    // Initialize
    function init() {
        initCarousels();
        convertGridsToCarousel();
        initKeyboardNavigation();
        
        // Re-check on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                convertGridsToCarousel();
            }, 250);
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

// Add dragging cursor styles
const carouselStyles = document.createElement('style');
carouselStyles.textContent = `
    .carousel-scroll.dragging,
    .horizontal-scroll.dragging {
        cursor: grabbing;
        scroll-behavior: auto !important;
        user-select: none;
    }
    
    .carousel-scroll,
    .horizontal-scroll {
        cursor: grab;
    }
    
    .carousel-scroll::-webkit-scrollbar,
    .horizontal-scroll::-webkit-scrollbar {
        display: none;
    }
    
    .carousel-scroll,
    .horizontal-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
document.head.appendChild(carouselStyles);
