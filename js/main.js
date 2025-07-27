import { initAuth } from './auth.js';
import { initDashboard } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication
    initAuth();
    
    // Check user role and initialize dashboard if admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'admin') {
        document.getElementById('public-content').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        initDashboard();
    } else {
        document.getElementById('public-content').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }

    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Theme toggle
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
});