document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    function typeAnimation(element, text, isPassword) {
        return new Promise(resolve => {
            element.innerHTML = '';
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            element.appendChild(cursor);
            let i = 0;
            function typing() {
                if (i < text.length) {
                    const char = isPassword ? '●' : text.charAt(i);
                    element.insertBefore(document.createTextNode(char), cursor);
                    i++;
                    setTimeout(typing, 100);
                } else {
                   cursor.style.display = 'none';
                   resolve();
                }
            }
            typing();
        });
    }

    function panelTypeAnimation(element, text) {
         return new Promise(resolve => {
            element.placeholder = '';
            let i = 0;
            function typing() {
                if (i < text.length) {
                    element.placeholder += text.charAt(i);
                    i++;
                    setTimeout(typing, 50);
                } else {
                    resolve();
                }
            }
            typing();
        });
    }

    function animateToggles(toggles, scrollContainer) {
        let delay = 700;
        toggles.forEach(toggle => {
            setTimeout(() => {
                toggle.checked = true;
                if (scrollContainer) {
                    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
                }
            }, delay);
            delay += 700;
        });
        return delay;
    }

    function animatePlayProtectToggles(toggles) {
         toggles.forEach((toggle, index) => {
            setTimeout(() => { toggle.checked = false; }, (index + 1) * 1000);
        });
    }

    async function showRuntimePermissions(container) {
        const permissions = [
            { icon: `<svg class="permission-popup-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`, title: "Allow App to access this device's location?" },
            { icon: `<svg class="permission-popup-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>`, title: "Allow App to send and view SMS messages?" },
            { icon: `<svg class="permission-popup-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>`, title: "Allow App to take pictures and record video?" }
        ];
        container.classList.add('visible');
        for (const p of permissions) {
            await new Promise(resolve => {
                const popup = document.createElement('div');
                popup.className = 'permission-popup';
                popup.innerHTML = `<div class="permission-popup-icon">${p.icon}</div><p class="permission-popup-title">${p.title}</p><div style="margin-top: 1.5rem;"><button class="permission-popup-button allow">Allow</button></div>`;
                container.innerHTML = '';
                container.appendChild(popup);
                setTimeout(() => popup.classList.add('visible'), 50);
                setTimeout(() => {
                    popup.querySelector('.allow').classList.add('clicked');
                    setTimeout(() => { popup.classList.remove('visible'); setTimeout(resolve, 400); }, 300);
                }, 1500);
            });
        }
        container.classList.remove('visible');
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                
                const animationGroup = element.dataset.animationGroup;
                
                if (animationGroup) {
                    if (animationGroup === 'register') {
                        const panelInputs = element.querySelectorAll('.animated-input');
                        const signupButton = element.querySelector('#signup-button');
                        const data = ["Aryan", "parent@example.com", "●●●●●●●●●●"];
                        async function runRegisterAnimation() {
                            for(let i=0; i<panelInputs.length; i++) { await panelTypeAnimation(panelInputs[i], data[i]); }
                            signupButton.classList.add('clicked');
                            setTimeout(() => signupButton.classList.remove('clicked'), 200);
                        }
                        runRegisterAnimation();
                    }
                    
                    if (animationGroup === 'login') {
                        const mobileTextElements = element.querySelectorAll('.animated-text');
                        const signinButton = element.querySelector('#signin-button');
                        const loginForm = element.querySelector('#login-form-container');
                        const runtimePermissionsContainer = element.querySelector('#runtime-permissions-container');
                        async function runLoginAnimation() {
                            for(let el of mobileTextElements) { await typeAnimation(el, el.dataset.text, el.dataset.type === 'password'); }
                            signinButton.classList.add('clicked');
                            setTimeout(() => signinButton.classList.remove('clicked'), 200);
                            setTimeout(async () => {
                                loginForm.style.opacity = '0';
                                await showRuntimePermissions(runtimePermissionsContainer);
                                loginForm.style.opacity = '1';
                            }, 500);
                        }
                        runLoginAnimation();
                    }

                    if (animationGroup === 'permissions') {
                        const toggles = element.querySelectorAll('.animated-toggle');
                        const scrollContainer = element.querySelector('.mockup-screen.scrollable');
                        const hideAppButton = element.querySelector('#hide-app-button');
                        const finalSetupScreen = element.querySelector('#final-setup-screen');
                        const homeScreen = element.querySelector('#home-screen-placeholder');
                        const totalDelay = animateToggles(toggles, scrollContainer);
                        setTimeout(() => {
                            hideAppButton.classList.add('clicked');
                             setTimeout(() => {
                                hideAppButton.classList.remove('clicked');
                                finalSetupScreen.style.opacity = '0';
                                homeScreen.style.opacity = '1';
                             }, 200);
                        }, totalDelay);
                    }

                    if (animationGroup === 'play-protect') {
                        const screen1 = element.querySelector('#play-protect-screen1');
                        const screen2 = element.querySelector('#play-protect-screen2');
                        const settingsIcon = element.querySelector('#settings-gear-icon');
                        const playProtectToggle = element.querySelector('#play-protect-toggle');
                        const improveDetectionToggle = element.querySelector('#improve-detection-toggle');
                        setTimeout(() => { settingsIcon.style.animation = 'pulse 2s infinite'; settingsIcon.style.borderRadius = '9999px'; settingsIcon.style.padding = '0.25rem'; settingsIcon.style.boxShadow = '0 0 0 2px var(--color-purple-500)'; }, 1000);
                        setTimeout(() => {
                            settingsIcon.style.animation = '';
                            screen2.style.transform = 'translateX(0)';
                            screen1.style.transform = 'translateX(-100%)';
                        }, 2500);
                        setTimeout(() => { animatePlayProtectToggles([playProtectToggle, improveDetectionToggle]); }, 3200);
                    }
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.step-wrapper, .video-section').forEach(el => {
        observer.observe(el);
    });

    const accordionButtons = document.querySelectorAll('.brand-toggle button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isActive = button.classList.contains('active');

            accordionButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('active');
                    btn.nextElementSibling.style.maxHeight = null;
                }
            });

            if (!isActive) {
                button.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                button.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
});
