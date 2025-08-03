// Theme Toggle Functionality
const initTheme = () => {
    const themeToggleBtns = document.querySelectorAll('[data-theme-toggle]');
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the current theme to the document
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    // Update all toggle button icons
    updateThemeToggleIcons(currentTheme);
};

// Update all theme toggle button icons
const updateThemeToggleIcons = (theme) => {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        const iconDark = btn.querySelector('[data-icon-dark]');
        const iconLight = btn.querySelector('[data-icon-light]');
        
        if (theme === 'dark') {
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
            
            // Toggle the dark class on the document element
            document.documentElement.classList.toggle('dark', !isDark);
            
            // Update all toggle buttons
            updateThemeToggleIcons(newTheme);
        });
    });
};

// Mobile menu functionality
const setupMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Update icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
};

// Active link highlighting
const highlightActiveLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('border-primary-500', 'text-gray-900', 'dark:text-white');
                link.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-300');
            }
            if (link.classList.contains('nav-link-mobile')) {
                link.classList.add('bg-primary-50', 'dark:bg-gray-700', 'border-primary-500', 'text-primary-700', 'dark:text-primary-300');
            }
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggles();
    setupMobileMenu();
    highlightActiveLink();
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Only if user hasn't set a preference
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        updateThemeToggleIcons(newTheme);
    }
});