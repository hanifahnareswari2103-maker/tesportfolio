// =========================================================================
// Portfolio Script - Mobile Navigation, Theme Toggle, Smooth Scrolling
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =====================================================================
    // 1. MOBILE NAVIGATION TOGGLE
    // =====================================================================
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const navClose = document.querySelector('.nav__close');

    /**
     * Toggle mobile menu visibility by adding/removing .open class
     * Also updates aria-expanded for accessibility
     */
    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        // update hamburger visual state and accessibility
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(!!isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
    };

    /**
     * Close mobile menu and reset aria-expanded
     */
    const closeMobileMenu = () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open mobile menu');
    };

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when any navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close button inside the menu (explicit X)
    if (navClose) navClose.addEventListener('click', closeMobileMenu);

    // Close menu when clicking outside (optional UX enhancement)
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.hamburger') && !event.target.closest('.nav__menu')) {
            closeMobileMenu();
        }
    });

    // =====================================================================
    // 4. SCROLL ANIMATIONS (IntersectionObserver)
    // =====================================================================

    const animateItems = document.querySelectorAll('.project-card');
    const observerOpts = { root: null, rootMargin: '0px', threshold: 0.12 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOpts);

    animateItems.forEach(item => observer.observe(item));

    // =====================================================================
    // 2. DARK MODE / LIGHT MODE TOGGLE
    // =====================================================================

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const THEME_KEY = 'portfolio-theme';
    const LIGHT_THEME_CLASS = 'light-theme';

    /**
     * Initialize theme based on localStorage or system preference
     */
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Use saved theme, fallback to system preference
        const isLight = savedTheme ? savedTheme === 'light' : !prefersDark;
        
        if (isLight) {
            document.body.classList.add(LIGHT_THEME_CLASS);
            updateThemeIcon(true);
        } else {
            document.body.classList.remove(LIGHT_THEME_CLASS);
            updateThemeIcon(false);
        }
    };

    /**
     * Update the theme icon (sun/moon) based on current theme
     * @param {boolean} isLight - True if light theme is active
     */
    const updateThemeIcon = (isLight) => {
        themeIcon.classList.remove('fa-sun', 'fa-moon');
        themeIcon.classList.add(isLight ? 'fa-sun' : 'fa-moon');
    };

    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = () => {
        const isLight = document.body.classList.toggle(LIGHT_THEME_CLASS);
        updateThemeIcon(isLight);
        
        // Save preference to localStorage
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    };

    // Initialize theme on page load
    initializeTheme();

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', toggleTheme);

    // =====================================================================
    // 3. SMOOTH SCROLLING & HEADER EFFECTS
    // =====================================================================

    const header = document.querySelector('.header');
    const SCROLL_THRESHOLD = 50;

    /**
     * Handle smooth scrolling for anchor links
     * Browser's native smooth-scroll CSS handles the animation
     * This ensures compatibility and clean code
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            // Get target element
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Scroll to target if it exists
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /**
     * Apply header shadow/style change on scroll
     * Adds visual feedback when user scrolls down
     */
    window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
