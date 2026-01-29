document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    // FAQ accordion functionality
    const faqContainer = document.getElementById('faq-container');
    faqContainer.addEventListener('click', function(e) {
        const questionButton = e.target.closest('.faq-question');
        if (!questionButton) return;

        const faqItem = questionButton.parentElement;
        
        if (faqItem.classList.contains('open')) {
            faqItem.classList.remove('open');
        } else {
            faqContainer.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });
            faqItem.classList.add('open');
        }
    });

    // FAQ search functionality
    const searchInput = document.getElementById('faq-search');
    const searchButton = document.getElementById('faq-search-btn');
    const faqItems = faqContainer.querySelectorAll('.faq-item');
    const noResultsMessage = document.getElementById('no-results-message');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        let visibleItems = 0;

        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });

        if (visibleItems === 0 && searchTerm.length > 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    }
    
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
});
