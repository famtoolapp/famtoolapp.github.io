document.addEventListener('DOMContentLoaded', () => {
    const categoryButtonsContainer = document.querySelector('.category-buttons');
    const dataModal = document.getElementById('data-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDataDisplayArea = document.getElementById('modal-data-display-area');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const comingSoonTitle = document.getElementById('coming-soon-title');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const dashboard = document.getElementById('dashboard');
    const userList = document.getElementById('user-list');
    const mainContentTitle = document.getElementById('main-content-title');
    const demoInfoModal = document.getElementById('demo-info-modal');
    const demoInfoText = document.getElementById('demo-info-text');

    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => { modalElement.classList.add('visible'); }, 10);
    };

    const closeModal = (modalElement) => {
        if (!modalElement) return;
        modalElement.classList.remove('visible');
        setTimeout(() => { modalElement.style.display = 'none'; }, 300);
    };

    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('modal-overlay') || target.closest('.modal-close-btn') || target.closest('.ok-btn')) {
            // Do not close if clicking inside an ad area (though this is less critical now)
            if(e.target.closest('.modal-ad-container')) return;
            
            const modalToClose = target.closest('.modal-overlay');
            closeModal(modalToClose);
        }
    });
    
    modalDataDisplayArea.addEventListener('click', (e) => {
        const fileItem = e.target.closest('.file-item');
        if (fileItem) {
            demoInfoText.innerHTML = "In the real app, this action would let you explore or download the selected file/folder from your child's device.";
            openModal(demoInfoModal);
        }
    });

    toggleSidebarBtn.addEventListener('click', () => dashboard.classList.toggle('sidebar-hidden'));
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    });

    userList.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.user-list-item');
        if (!clickedItem) return;

        document.querySelectorAll('.user-list-item').forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
        mainContentTitle.textContent = clickedItem.dataset.name;

         if (window.innerWidth <= 992 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
        }
    });

    categoryButtonsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.category-btn');
        if (!button) return;

        const category = button.dataset.category;
        const featureName = button.dataset.featureName;
        
        if (sidebar.classList.contains('open')) {
             sidebar.classList.remove('open');
             overlay.style.display = 'none';
        }

        if (category === 'coming-soon') {
            comingSoonTitle.textContent = `${featureName} - Coming Soon`;
            openModal(comingSoonModal);
        } else {
            modalTitle.textContent = getSafeCategoryName(category);
            displayDemoData(category);
            openModal(dataModal);
            
            // NOTE: The ad scripts are already in the DOM.
            // If they need to be re-initialized, you might need ad-provider-specific JS calls here.
            // For now, we assume they load when the modal becomes visible.
        }
    });

    const getSafeCategoryName = (category) => {
        const nameMap = {
            'keylogger': 'Keystroke', 'location': 'Location', 'photo': 'Photos', 'sms': 'SMS', 
            'notifications': 'Notifications', 'devicestatus': 'Device Status', 'calllogs': 'Call Logs',
            'video': 'Videos', 'audio': 'Audio Recordings', 'health': 'App Health',
            'toggleAppVisibility': 'Hide/Show App', 'screenshot': 'Screenshots', 
            'screenrecording': 'Screen Recordings', 'filemanager': 'File Manager'
        };
        return nameMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
    };

    const displayDemoData = (category) => {
        let contentHTML = '';
        switch(category) {
            case 'devicestatus':
                contentHTML = `
                    <div class="data-card">
                        <div class="data-card-header">
                            <div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                            <div class="data-card-title">Current Device Status</div>
                        </div>
                        <div class="data-card-body">
                            <div class="status-item" style="flex-direction: column; align-items: flex-start; gap: 0.5rem; padding-bottom: 1.5rem;">
                                <div style="width:100%; display:flex; justify-content: space-between;">
                                    <span class="status-item-label">Battery</span><span class="status-item-value">84%</span>
                                </div>
                                <div class="battery-level"><div class="battery-level-fill" style="width: 84%;"></div></div>
                            </div>
                            <div class="status-grid">
                                <div class="status-item"><span class="status-item-label">Internet</span><span class="status-item-value on">On</span></div>
                                <div class="status-item"><span class="status-item-label">Network Type</span><span class="status-item-value">WIFI</span></div>
                                <div class="status-item"><span class="status-item-label">SIM Operator</span><span class="status-item-value">Airtel</span></div>
                                <div class="status-item"><span class="status-item-label">SIM 1</span><span class="status-item-value">9876543210</span></div>
                                <div class="status-item"><span class="status-item-label">SIM 2</span><span class="status-item-value">Not Available</span></div>
                            </div>
                        </div>
                        <div class="data-card-footer">Last updated: Just now</div>
                    </div>`;
                break;
            
            case 'health':
                 const createHealthItem = (label, isEnabled) => {
                    const icon = isEnabled ? '✅' : '❌';
                    return `<div class="status-item">
                                <span style="color: ${isEnabled ? 'var(--accent-green)' : 'var(--accent-red)'};">${icon}</span>
                                <span>${label}</span>
                            </div>`;
                };
                contentHTML = `<div class="data-card">
                            <div class="data-card-body">
                                <div style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">
                                    <p><strong>App Version:</strong> 3.1.2</p>
                                    <p><strong>Last Checked:</strong> Today, 04:30 PM</p>
                                    <p><strong>Last Heartbeat:</strong> A few seconds ago</p>
                                </div>
                                <h4 style="margin-bottom: 1.5rem; color: #fff; font-size: 1.2rem;">App Health Status</h4>
                                <div class="status-grid">
                                    ${createHealthItem('Accessibility Service', true)}
                                    ${createHealthItem('Notification Service', true)}
                                    ${createHealthItem('Camera Permission', true)}
                                    ${createHealthItem('Microphone Permission', false)}
                                    ${createHealthItem('Location Permission', true)}
                                    ${createHealthItem('SMS Permission', true)}
                                    ${createHealthItem('Call Log Permission', true)}
                                    ${createHealthItem('Draw Over Apps', true)}
                                    ${createHealthItem('Ignoring Battery Optimizations', true)}
                                </div>
                            </div>
                        </div>`;
                break;

            case 'location':
                contentHTML = `
                    <div class="data-card location-card">
                        <div class="data-card-body">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-9-6-9-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                <div><strong>Address:</strong><br>Patel Heritage, Service Rd, Sector 11, Kharghar, Navi Mumbai, Maharashtra 410210, India</div>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <div><strong>Time:</strong><br>Today, 04:15 PM</div>
                            </div>
                            <a href="https://maps.google.com/?q=19.0375,73.0729" target="_blank" class="map-link"><span>View on Google Maps</span></a>
                        </div>
                    </div>`;
                break;
            
            case 'photo':
                contentHTML = `
                    <div class="data-header">
                        <div class="header-actions">
                            <button class="action-btn" disabled><span>Capture Front Photo</span></button>
                            <button class="action-btn" disabled><span>Capture Back Photo</span></button>
                        </div>
                    </div>
                    <div class="data-grid">
                        <div class="data-card photo-card">
                            <img src="images/vv.jpg" alt="Demo photo 1" style="width:100%; height: 200px; object-fit: cover; border-radius: 8px;">
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 02:30 PM</div>
                        </div>
                        <div class="data-card photo-card">
                            <img src="images/vvv.jpg" alt="Demo photo 2" style="width:100%; height: 200px; object-fit: cover; border-radius: 8px;">
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 11:10 AM</div>
                        </div>
                    </div>`;
                break;

            case 'video':
                contentHTML = `
                    <div class="data-header">
                        <div class="header-actions">
                            <button class="action-btn" disabled><span>Record Front Video (30s)</span></button>
                            <button class="action-btn" disabled><span>Record Back Video (30s)</span></button>
                        </div>
                    </div>
                    <div class="data-grid">
                        <div class="data-card video-card">
                            <video controls style="width:100%; border-radius: 8px;" preload="metadata">
                                <source src="video/parent app login-sinup.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Yesterday, 06:45 PM</div>
                        </div>
                        <div class="data-card video-card">
                            <video controls style="width:100%; border-radius: 8px;" preload="metadata">
                                <source src="video/parent app login-sinup.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 09:12 AM</div>
                        </div>
                    </div>`;
                break;

            case 'audio':
                 contentHTML = `
                    <div class="data-header">
                        <div class="header-actions">
                            <button class="action-btn" disabled><span>Record Audio (30s)</span></button>
                        </div>
                    </div>
                    <div class="data-list">
                        <div class="data-card audio-card">
                            <div class="data-card-body">
                                 <audio controls style="width:100%;" preload="metadata">
                                    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div class="data-card-footer">Today, 09:05 AM</div>
                        </div>
                    </div>`;
                break;
            
            case 'keylogger':
                contentHTML = `
                    <div class="data-list">
                        <div class="data-card"><div class="data-card-header"><div class="data-card-title">YouTube</div></div><div class="data-card-body"><strong>funny cat videos</strong></div><div class="data-card-footer">Today, 04:45 PM</div></div>
                        <div class="data-card"><div class="data-card-header"><div class="data-card-title">Instagram</div></div><div class="data-card-body"><strong>Replying to @user_name's story</strong></div><div class="data-card-footer">Today, 04:40 PM</div></div>
                        <div class="data-card"><div class="data-card-header"><div class="data-card-title">Google Maps</div></div><div class="data-card-body"><strong>restaurants near me</strong></div><div class="data-card-footer">Today, 03:20 PM</div></div>
                        <div class="data-card"><div class="data-card-header"><div class="data-card-title">Chrome</div></div><div class="data-card-body"><strong>how to learn coding fast</strong></div><div class="data-card-footer">Today, 02:10 PM</div></div>
                        <div class="data-card"><div class="data-card-header"><div class="data-card-title">WhatsApp</div></div><div class="data-card-body"><strong>Okay, see you then!</strong></div><div class="data-card-footer">Today, 01:30 PM</div></div>
                    </div>`;
                break;

            case 'sms':
                contentHTML = `<div class="data-list">
                        <div class="data-card">
                            <div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="data-card-title">From: DM-FLPKRT</div></div>
                            <div class="data-card-body">Your Flipkart order for Shoes has been shipped.</div>
                            <div class="data-card-footer">Today, 01:05 PM</div>
                        </div>
                        <div class="data-card">
                            <div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="data-card-title">To: Dad</div></div>
                            <div class="data-card-body">Okay, I will reach home by 8 PM.</div>
                            <div class="data-card-footer">Today, 11:40 AM</div>
                        </div>
                    </div>`;
                break;

            case 'calllogs':
                contentHTML = `<div class="data-list">
                        <div class="data-card"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div><div class="data-card-title">Incoming Call</div></div><div class="data-card-body"><strong>Number:</strong> Mom<br><strong>Duration:</strong> 180s</div><div class="data-card-footer">Today, 02:15 PM</div></div>
                        <div class="data-card"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></div><div class="data-card-title">Outgoing Call</div></div><div class="data-card-body"><strong>Number:</strong> +918765432109<br><strong>Duration:</strong> 240s</div><div class="data-card-footer">Today, 01:00 PM</div></div>
                    </div>`;
                break;
            
            case 'notifications':
                contentHTML = `<div class="data-grid">
                    <div class="data-card"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M19.78 4.22a10.4 10.4 0 0 0-14.9 0 10.4 10.4 0 0 0 0 14.9l-1.38 5.02 5.13-1.35a10.4 10.4 0 0 0 14.9 0 10.4 10.4 0 0 0 0-14.9zM12 20.9a8.8 8.8 0 0 1-4.5-1.2L4 21l1.3-3.5a8.8 8.8 0 1 1 6.7 3.4zM16.4 13.6c-.2-.1-.8-.4-1-.4s-.3-.1-.4.1-.4.4-.5.5-.2.1-.4 0c-.2-.1-1-1-1.8-1.8-.7-.6-1.1-1.4-.9-1.6s.2-.3.3-.4c.1-.1.2-.2.3-.3.1-.1 0-.2 0-.3s-1-2.3-1.3-3.2c-.3-.8-.6-1-.8-1s-.4-.1-.6-.1h-.3c-.2 0-.5.1-.7.3-.2.2-.8.8-1 2s-1.2 2.3-.9 3.3c.3 1 1.1 2.4 2.5 3.8 1.4 1.4 2.8 2.2 4.3 2.7 1.5.5 2.8.4 3.8.3.9-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9s-.3-.3-.5-.4z"/></svg></div><div class="data-card-title">WhatsApp</div></div><div class="data-card-body">Friend: Are we still on for the movie?</div><div class="data-card-footer">Today, 03:20 PM</div></div>
                    <div class="data-card"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="url(#insta-gradient)"><defs><radialGradient id="insta-gradient"><stop offset="0%" stop-color="#feda75"/><stop offset="25%" stop-color="#fa7e1e"/><stop offset="50%" stop-color="#d62976"/><stop offset="75%" stop-color="#962fbf"/><stop offset="100%" stop-color="#4f5bd5"/></radialGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689-.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg></div><div class="data-card-title">Instagram</div></div><div class="data-card-body">@user123 liked your photo.</div><div class="data-card-footer">Today, 01:05 PM</div></div>
                </div>`;
                break;
            
            case 'toggleAppVisibility':
                contentHTML = `<div class="data-card" style="text-align:center;">
                                <p style="font-size:1.1rem; line-height: 1.6;">In the real app, this button sends a command to hide or show the app icon on your child's phone.</p>
                                <p style="margin-top: 1rem; color: var(--text-secondary);">The current demo status is 'Hidden'.</p>
                              </div>`;
                break;
            
            case 'screenshot':
                contentHTML = `
                    <div class="data-header">
                        <div class="header-actions">
                            <button class="action-btn" disabled><span>Take Screenshot</span></button>
                        </div>
                    </div>
                    <div class="data-grid">
                        <div class="data-card photo-card">
                            <img src="images/sc1.png" alt="" style="width:100%; height: auto; object-fit: cover; border-radius: 8px;">
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 04:50 PM</div>
                        </div>
                        <div class="data-card photo-card">
                            <img src="images/sc2.png" alt="Demo Screenshot 2" style="width:100%; height: auto; object-fit: cover; border-radius: 8px;">
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 03:15 PM</div>
                        </div>
                        
                    </div>`;
                break;

            case 'screenrecording':
                contentHTML = `
                    <div class="data-header">
                        <div class="header-actions">
                            <button class="action-btn" disabled><span>Record Screen (30s)</span></button>
                        </div>
                    </div>
                    <div class="data-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); justify-content: center;">
                        <div class="data-card video-card">
                            <video controls style="width: 100%; height: auto; aspect-ratio: 9/16; object-fit: cover; border-radius: 8px;" preload="metadata">
                                <source src="video/child mobile insttal.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Today, 10:20 AM</div>
                        </div>
                        <div class="data-card video-card">
                            <video controls style="width: 100%; height: auto; aspect-ratio: 9/16; object-fit: cover; border-radius: 8px;" preload="metadata">
                                <source src="video/child mobile insttal.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="data-card-footer" style="text-align: left; padding: 1rem 0 0 0;">Yesterday, 05:55 PM</div>
                        </div>
                    </div>`;
                break;

            case 'filemanager':
                contentHTML = `<div class="data-list">
                        <div class="data-card file-item"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></div><div class="data-card-title">Downloads</div></div><div class="data-card-body">Contains 15 files</div></div>
                        <div class="data-card file-item"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div><div class="data-card-title">DCIM (Camera)</div></div><div class="data-card-body">Contains 120 photos, 15 videos</div></div>
                        <div class="data-card file-item"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366" stroke-width="2"><path d="M19.78 4.22a10.4 10.4 0 0 0-14.9 0 10.4 10.4 0 0 0 0 14.9l-1.38 5.02 5.13-1.35a10.4 10.4 0 0 0 14.9 0 10.4 10.4 0 0 0 0-14.9zM12 20.9a8.8 8.8 0 0 1-4.5-1.2L4 21l1.3-3.5a8.8 8.8 0 1 1 6.7 3.4zM16.4 13.6c-.2-.1-.8-.4-1-.4s-.3-.1-.4.1-.4.4-.5.5-.2.1-.4 0c-.2-.1-1-1-1.8-1.8-.7-.6-1.1-1.4-.9-1.6s.2-.3.3-.4c.1-.1.2-.2.3-.3.1-.1 0-.2 0-.3s-1-2.3-1.3-3.2c-.3-.8-.6-1-.8-1s-.4-.1-.6-.1h-.3c-.2 0-.5.1-.7.3-.2.2-.8.8-1 2s-1.2 2.3-.9 3.3c.3 1 1.1 2.4 2.5 3.8 1.4 1.4 2.8 2.2 4.3 2.7 1.5.5 2.8.4 3.8.3.9-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9s-.3-.3-.5-.4z"/></svg></div><div class="data-card-title">WhatsApp Media</div></div><div class="data-card-body">Contains 54 images, 8 videos</div></div>
                        <div class="data-card file-item"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div><div class="data-card-title">Documents</div></div><div class="data-card-body">homework.pdf, project_report.docx</div></div>
                        <div class="data-card file-item"><div class="data-card-header"><div class="data-card-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffab40" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line></svg></div><div class="data-card-title">SD Card</div></div><div class="data-card-body">12 GB free of 32 GB</div></div>
                    </div>`;
                break;

            default:
                contentHTML = '<p>No demo data available for this category.</p>';
        }

        modalDataDisplayArea.innerHTML = contentHTML;
    };
});
