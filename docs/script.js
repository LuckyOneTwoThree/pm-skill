let currentLanguage = 'zh';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        const lang = element.getAttribute('data-lang');
        if (lang === currentLanguage) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
    
    const button = document.getElementById('langSwitch');
    button.innerHTML = `<span id="currentLang">${currentLanguage === 'zh' ? 'EN' : '中'}</span>`;
    
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en-US';
    
    localStorage.setItem('preferredLanguage', currentLanguage);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        toggleLanguage();
    }
});
