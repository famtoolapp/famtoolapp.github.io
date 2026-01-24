/* ===== Contact Us Page JavaScript ===== */

document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
        });
    });
    
    // --- Fade In Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach(el => observer.observe(el));

    // --- Contact Form Submission Handler ---
    var form = document.getElementById("contactForm");
    var status = document.getElementById("form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        
        if (!event.target.checkValidity()) {
            status.innerHTML = "Please fill out all required fields correctly.";
            status.className = "form-status error";
            return;
        }

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "<strong>Thank you!</strong><br>Your message has been sent successfully. We'll get back to you within 24 hours.";
                status.className = "form-status success";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                    }
                    status.className = "form-status error";
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.className = "form-status error";
        });
    }
    
    form.addEventListener("submit", handleSubmit);
});
