/* =====================================================
   FamToolApp - Index Page JavaScript
   Professional, Responsive & Mobile-First
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
            });
        });
    }
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // --- Animated Counter Function ---
    const animateCounter = (counter) => {
        const finalNumber = parseInt(counter.getAttribute('data-final-number'));
        let start = 0;
        const duration = 2000;
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            counter.innerText = Math.floor(progress * finalNumber).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };
    
    // --- Intersection Observer for Fade-in Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters within the visible element
                const counters = entry.target.querySelectorAll('.animated-counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('is-animated')) {
                        animateCounter(counter);
                        counter.classList.add('is-animated');
                    }
                });
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all fade-in elements
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach(el => observer.observe(el));
    
});
