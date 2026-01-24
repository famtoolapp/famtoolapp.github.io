/* =====================================================
   FamToolApp - Auth Action Page JavaScript
   Firebase Authentication Handler
   ===================================================== */

// Firebase imports are done via ES modules in HTML
// This file handles UI interactions only

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Password Toggle Functionality ---
    const togglePasswordBtn = document.getElementById('toggle-password-visibility');
    const newPasswordInput = document.getElementById('new-password');
    
    if (togglePasswordBtn && newPasswordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            // Toggle the type attribute
            const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            newPasswordInput.setAttribute('type', type);

            // Toggle the icon
            if (type === 'password') {
                // Show eye icon (password hidden)
                this.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
            } else {
                // Show eye-off icon (password visible)
                this.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
            }
        });
    }
    
});

/* =====================================================
   Firebase Authentication Functions
   These are called from the inline script in HTML
   because Firebase uses ES modules
   ===================================================== */

// Helper function to get URL parameters
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Export for global access if needed
window.getParameterByName = getParameterByName;
