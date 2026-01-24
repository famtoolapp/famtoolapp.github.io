/* ===== Download Page JavaScript ===== */

document.addEventListener('DOMContentLoaded', function() {
    const consentCheckbox = document.getElementById('consent-checkbox');
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const captchaSection = document.getElementById('captcha-section');
    const downloadButton = document.getElementById('download-button');
    const captchaCodeEl = document.getElementById('captcha-code');
    const captchaInput = document.getElementById('captcha-input');
    const captchaRefreshBtn = document.getElementById('captcha-refresh');
    const captchaErrorEl = document.getElementById('captcha-error');

    let currentCaptcha = '';
    
    // --- APK FILE DOWNLOAD URL ---
    const downloadUrl = 'child/child/FamToolApp-10.1100011.apk';

    function generateCaptcha() {
        const chars = '0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptcha = result;
        captchaCodeEl.textContent = currentCaptcha;
        captchaInput.value = '';
        captchaErrorEl.textContent = '';
    }
    
    function checkCheckboxes() {
        if (consentCheckbox.checked && agreementCheckbox.checked) {
            captchaSection.style.display = 'block';
            downloadButton.style.display = 'block';
            if (!currentCaptcha) {
                generateCaptcha();
            }
        } else {
            captchaSection.style.display = 'none';
            downloadButton.style.display = 'none';
        }
    }

    consentCheckbox.addEventListener('change', checkCheckboxes);
    agreementCheckbox.addEventListener('change', checkCheckboxes);
    captchaRefreshBtn.addEventListener('click', generateCaptcha);

    downloadButton.addEventListener('click', function() {
        if (captchaInput.value === currentCaptcha) {
            captchaErrorEl.textContent = 'Verification successful! Starting download...';
            captchaErrorEl.style.color = '#4ade80';

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = downloadUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                consentCheckbox.checked = false;
                agreementCheckbox.checked = false;
                checkCheckboxes();
            }, 3000);

        } else {
            captchaErrorEl.textContent = 'Incorrect code. Please try again.';
            captchaErrorEl.style.color = '#f87171';
            generateCaptcha();
        }
    });
});
