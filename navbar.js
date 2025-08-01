// Theme Toggle Functionality
const initTheme = () => {
    const themeToggleBtns = document.querySelectorAll('[data-theme-toggle]');
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the current theme
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    // Update toggle button icons
    themeToggleBtns.forEach(btn => {
        const iconDark = btn.querySelector('[data-icon-dark]');
        const iconLight = btn.querySelector('[data-icon-light]');
        
        if (currentTheme === 'dark') {
            iconDark?.classList.add('hidden');
            iconLight?.classList.remove('hidden');
        } else {
            iconLight?.classList.add('hidden');
            iconDark?.classList.remove('hidden');
        }
    });
};

// Set up event listeners for theme toggles
const setupThemeToggles = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            // Update localStorage
            localStorage.setItem('theme', newTheme);
            
            // Toggle the dark class
            document.documentElement.classList.toggle('dark', !isDark);
            
            // Update all toggle buttons
            document.querySelectorAll('[data-theme-toggle]').forEach(toggleBtn => {
                const iconDark = toggleBtn.querySelector('[data-icon-dark]');
                const iconLight = toggleBtn.querySelector('[data-icon-light]');
                
                if (isDark) {
                    iconDark?.classList.remove('hidden');
                    iconLight?.classList.add('hidden');
                } else {
                    iconDark?.classList.add('hidden');
                    iconLight?.classList.remove('hidden');
                }
            });
        });
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggles();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('border-primary-500', 'text-gray-900', 'dark:text-white');
                link.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-300');
            }
            if (link.classList.contains('nav-link-mobile')) {
                link.classList.add('bg-primary-50', 'border-primary-500', 'text-primary-700');
            }
        }
    });
    
    // Auth button functionality
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    document.querySelectorAll('[data-auth-button]').forEach(btn => {
        btn.classList.toggle('hidden', isLoggedIn);
    });
    document.querySelectorAll('[data-logout-button]').forEach(btn => {
        btn.classList.toggle('hidden', !isLoggedIn);
    });
    
    // Logout functionality
    document.querySelectorAll('[data-logout-button]').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.reload();
        });
    });
});