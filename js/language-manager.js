// Global Language Management System for DR.IT.Studio
class GlobalLanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.storageKey = 'dritstudio_language';
        this.supportedLanguages = ['en', 'ru', 'uk', 'es', 'fr', 'de', 'zh'];
        this.languageMap = {
            'en': '🇺🇸 EN',
            'ru': '🇷🇺 RU', 
            'uk': '🇺🇦 UK',
            'es': '🇪🇸 ES',
            'fr': '🇫🇷 FR',
            'de': '🇩🇪 DE',
            'zh': '🇨🇳 ZH'
        };
        this.init();
    }

    init() {
        this.loadSavedLanguage();
        this.setupEventListeners();
        this.applyLanguage();
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem(this.storageKey);
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.split('-')[0];
            this.currentLanguage = this.supportedLanguages.includes(browserLang) ? browserLang : 'en';
        }
    }

    setupEventListeners() {
        // Setup dropdown toggle
        const dropdownButton = document.querySelector('.language-current');
        if (dropdownButton) {
            dropdownButton.addEventListener('click', () => this.toggleDropdown());
        }

        // Setup language options
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                if (lang) {
                    this.selectLanguage(lang);
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdown = document.getElementById('language-options');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    closeDropdown() {
        const dropdown = document.getElementById('language-options');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }

    selectLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) return;

        this.currentLanguage = lang;
        this.saveLanguage();
        this.updateUI();
        this.applyLanguage();
        this.closeDropdown();
    }

    saveLanguage() {
        localStorage.setItem(this.storageKey, this.currentLanguage);
    }

    updateUI() {
        // Update current language display
        const currentLangElement = document.getElementById('current-lang');
        if (currentLangElement) {
            currentLangElement.textContent = this.languageMap[this.currentLanguage];
        }

        // Update active state in dropdown
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    applyLanguage() {
        // Apply language to all elements with data attributes
        document.querySelectorAll(`[data-${this.currentLanguage}]`).forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }

    // Static method to initialize on any page
    static initialize() {
        if (typeof window !== 'undefined') {
            window.globalLangManager = new GlobalLanguageManager();
        }
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GlobalLanguageManager.initialize);
} else {
    GlobalLanguageManager.initialize();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalLanguageManager;
}
