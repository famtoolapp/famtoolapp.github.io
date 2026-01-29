document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    // Fade-in animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const delay = entry.target.getAttribute('data-delay');
                if(delay) {
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));
});
