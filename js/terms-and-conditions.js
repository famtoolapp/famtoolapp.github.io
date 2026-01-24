document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    const sections = document.querySelectorAll('.policy-section-content');
    const navLinks = document.querySelectorAll('.policy-nav a');

    if (window.innerWidth >= 1024) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { 
            rootMargin: "-40% 0px -60% 0px"
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});
