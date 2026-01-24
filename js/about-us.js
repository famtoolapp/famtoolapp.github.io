/* =====================================================
   FamToolApp - About Us Page JavaScript
   Professional, Responsive & Mobile-First
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
        });
    }

    // --- Scroll Animation with Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle custom delay from data attribute
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all fade-in elements
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));
    
});
