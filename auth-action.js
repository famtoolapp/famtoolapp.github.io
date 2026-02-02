import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZ-E4_1bI4YN-1pt6xyMNXq1tOAvx0GY0",
    authDomain: "home-demo12-d5814.firebaseapp.com",
    databaseURL: "https://home-demo12-d5814-default-rtdb.firebaseio.com",
    projectId: "home-demo12-d5814",
    storageBucket: "home-demo12-d5814.appspot.com",
    messagingSenderId: "433464727867",
    appId: "1:433464727867:web:731cc791eb8d48c5d9bf1e",
    measurementId: "G-NHHB06Z9HT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const titleElement = document.getElementById('message-title');
const bodyElement = document.getElementById('message-body');
const redirectButton = document.getElementById('redirect-button');
const passwordResetForm = document.getElementById('password-reset-form');
const newPasswordInput = document.getElementById('new-password');
const submitPasswordResetBtn = document.getElementById('submit-password-reset');
// ===== START: CODE CHANGE / कोड में बदलाव यहाँ से शुरू =====
const togglePasswordBtn = document.getElementById('toggle-password-visibility');
// ===== END: CODE CHANGE / कोड में बदलाव यहाँ समाप्त =====

// Function to get URL parameters
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const mode = getParameterByName('mode');
const actionCode = getParameterByName('oobCode');

if (actionCode) {
    handleAction(mode, actionCode);
} else {
    titleElement.innerText = "Invalid Link";
    bodyElement.innerText = "The link is missing required information. Please try again.";
}

function handleAction(mode, code) {
    switch (mode) {
        case 'verifyEmail':
            handleVerifyEmail(code);
            break;
        case 'resetPassword':
            handlePasswordReset(code);
            break;
        default:
            titleElement.innerText = "Unknown Action";
            bodyElement.innerText = "The link is invalid or has expired.";
    }
}

function handleVerifyEmail(code) {
    applyActionCode(auth, code)
        .then(() => {
            titleElement.innerText = "Email Verified!";
            bodyElement.innerText = "Thank you! Your email address has been successfully verified. You can now log in to your account.";
            redirectButton.style.display = 'inline-block';
        })
        .catch((error) => {
            titleElement.innerText = "Verification Failed";
            bodyElement.innerText = "The link is invalid or has expired. Please try verifying your email again.";
            console.error(error);
        });
}

function handlePasswordReset(code) {
    verifyPasswordResetCode(auth, code)
        .then((email) => {
            titleElement.innerText = "Reset Your Password";
            bodyElement.innerText = `Create a new password for ${email}.`;
            passwordResetForm.style.display = 'block';

            submitPasswordResetBtn.onclick = () => {
                const newPassword = newPasswordInput.value;
                if(newPassword.length < 6) {
                    bodyElement.innerText = "Password should be at least 6 characters long.";
                    return;
                }

                confirmPasswordReset(auth, code, newPassword)
                    .then(() => {
                        titleElement.innerText = "Password Reset Successfully!";
                        bodyElement.innerText = "You can now log in with your new password.";
                        passwordResetForm.style.display = 'none';
                        redirectButton.style.display = 'inline-block';
                    })
                    .catch((error) => {
                        titleElement.innerText = "Error Resetting Password";
                        bodyElement.innerText = "Something went wrong. Please try resetting your password again.";
                        console.error(error);
                    });
            };
        })
        .catch((error) => {
            titleElement.innerText = "Invalid Link";
            bodyElement.innerText = "The password reset link is invalid or has expired. Please request a new one.";
            console.error(error);
        });
}

// ===== START: CODE CHANGE / कोड में बदलाव यहाँ से शुरू =====
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function () {
        // Toggle the type attribute
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);

        // Toggle the icon
        if (type === 'password') {
            // Show eye icon
            this.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        } else {
            // Show eye-off icon
            this.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
        }
    });
}
// ===== END: CODE CHANGE / कोड में बदलाव यहाँ समाप्त =====
