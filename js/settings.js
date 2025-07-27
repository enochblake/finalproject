// Settings Manager
class SettingsManager {
    constructor() {
        this.settings = {
            general: {
                siteName: 'CampusHub',
                siteDescription: 'Campus Events & Clubs Hub',
                adminEmail: 'admin@campushub.edu',
                timezone: 'America/New_York',
                language: 'en'
            },
            notifications: {
                emailNotifications: true,
                pushNotifications: false,
                smsNotifications: false,
                eventReminders: true,
                newUserRegistrations: true,
                clubApplications: true
            },
            security: {
                requireEmailVerification: true,
                enableTwoFactor: false,
                sessionTimeout: 30,
                passwordMinLength: 8,
                allowPublicRegistration: true
            },
            features: {
                enableClubChat: true,
                enableEventRSVP: true,
                enableUserProfiles: true,
                enableFileUploads: true,
                maxFileSize: 10,
                allowedFileTypes: ['jpg', 'png', 'pdf', 'doc', 'docx']
            }
        };
    }

    render(container) {
        container.innerHTML = this.getHTML();
        this.setupEventListeners();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
                    <p class="text-gray-600">Configure system preferences and options</p>
                </div>

                <!-- Settings Tabs -->
                <div class="mb-6">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8">
                            <button class="settings-tab active py-2 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600" data-tab="general">
                                General
                            </button>
                            <button class="settings-tab py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="notifications">
                                Notifications
                            </button>
                            <button class="settings-tab py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="security">
                                Security
                            </button>
                            <button class="settings-tab py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300" data-tab="features">
                                Features
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- General Settings -->
                <div class="settings-panel" id="general-panel">
                    <div class="card rounded-xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                        <form class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                    <input type="text" value="${this.settings.general.siteName}" class="form-input">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                                    <input type="email" value="${this.settings.general.adminEmail}" class="form-input">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <select class="form-input">
                                        <option value="America/New_York" ${this.settings.general.timezone === 'America/New_York' ? 'selected' : ''}>Eastern Time</option>
                                        <option value="America/Chicago" ${this.settings.general.timezone === 'America/Chicago' ? 'selected' : ''}>Central Time</option>
                                        <option value="America/Denver" ${this.settings.general.timezone === 'America/Denver' ? 'selected' : ''}>Mountain Time</option>
                                        <option value="America/Los_Angeles" ${this.settings.general.timezone === 'America/Los_Angeles' ? 'selected' : ''}>Pacific Time</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                    <select class="form-input">
                                        <option value="en" ${this.settings.general.language === 'en' ? 'selected' : ''}>English</option>
                                        <option value="es" ${this.settings.general.language === 'es' ? 'selected' : ''}>Spanish</option>
                                        <option value="fr" ${this.settings.general.language === 'fr' ? 'selected' : ''}>French</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                                <textarea rows="3" class="form-input">${this.settings.general.siteDescription}</textarea>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Notifications Settings -->
                <div class="settings-panel hidden" id="notifications-panel">
                    <div class="card rounded-xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-md font-medium text-gray-900 mb-4">Notification Methods</h4>
                                <div class="space-y-4">
                                    ${this.getToggleHTML('Email Notifications', 'emailNotifications', this.settings.notifications.emailNotifications)}
                                    ${this.getToggleHTML('Push Notifications', 'pushNotifications', this.settings.notifications.pushNotifications)}
                                    ${this.getToggleHTML('SMS Notifications', 'smsNotifications', this.settings.notifications.smsNotifications)}
                                </div>
                            </div>
                            <div>
                                <h4 class="text-md font-medium text-gray-900 mb-4">Notification Types</h4>
                                <div class="space-y-4">
                                    ${this.getToggleHTML('Event Reminders', 'eventReminders', this.settings.notifications.eventReminders)}
                                    ${this.getToggleHTML('New User Registrations', 'newUserRegistrations', this.settings.notifications.newUserRegistrations)}
                                    ${this.getToggleHTML('Club Applications', 'clubApplications', this.settings.notifications.clubApplications)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Security Settings -->
                <div class="settings-panel hidden" id="security-panel">
                    <div class="card rounded-xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                        <div class="space-y-6">
                            <div class="space-y-4">
                                ${this.getToggleHTML('Require Email Verification', 'requireEmailVerification', this.settings.security.requireEmailVerification)}
                                ${this.getToggleHTML('Enable Two-Factor Authentication', 'enableTwoFactor', this.settings.security.enableTwoFactor)}
                                ${this.getToggleHTML('Allow Public Registration', 'allowPublicRegistration', this.settings.security.allowPublicRegistration)}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                    <input type="number" value="${this.settings.security.sessionTimeout}" class="form-input">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                                    <input type="number" value="${this.settings.security.passwordMinLength}" class="form-input">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Features Settings -->
                <div class="settings-panel hidden" id="features-panel">
                    <div class="card rounded-xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-6">Feature Settings</h3>
                        <div class="space-y-6">
                            <div class="space-y-4">
                                ${this.getToggleHTML('Enable Club Chat', 'enableClubChat', this.settings.features.enableClubChat)}
                                ${this.getToggleHTML('Enable Event RSVP', 'enableEventRSVP', this.settings.features.enableEventRSVP)}
                                ${this.getToggleHTML('Enable User Profiles', 'enableUserProfiles', this.settings.features.enableUserProfiles)}
                                ${this.getToggleHTML('Enable File Uploads', 'enableFileUploads', this.settings.features.enableFileUploads)}
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                                    <input type="number" value="${this.settings.features.maxFileSize}" class="form-input">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
                                    <input type="text" value="${this.settings.features.allowedFileTypes.join(', ')}" class="form-input" placeholder="jpg, png, pdf">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="mt-6 flex justify-end">
                    <button onclick="SettingsManager.saveSettings()" class="btn-primary">
                        <i class="fas fa-save mr-2"></i>Save Settings
                    </button>
                </div>
            </div>
        `;
    }

    getToggleHTML(label, key, value) {
        return `
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">${label}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" ${value ? 'checked' : ''} class="sr-only peer" data-setting="${key}">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
            </div>
        `;
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });

        // Toggle switches
        document.querySelectorAll('input[type="checkbox"][data-setting]').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const setting = e.target.getAttribute('data-setting');
                // Update settings object here
                console.log(`Setting ${setting} changed to:`, e.target.checked);
            });
        });
    }

    switchTab(tabName) {
        // Update tab appearance
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active', 'border-indigo-500', 'text-indigo-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        });

        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        activeTab.classList.add('active', 'border-indigo-500', 'text-indigo-600');
        activeTab.classList.remove('border-transparent', 'text-gray-500');

        // Show/hide panels
        document.querySelectorAll('.settings-panel').forEach(panel => {
            panel.classList.add('hidden');
        });

        document.getElementById(`${tabName}-panel`).classList.remove('hidden');
    }

    static saveSettings() {
        if (window.app) {
            window.app.showToast('Settings saved successfully!', 'success');
        }
    }
}

window.SettingsManager = new SettingsManager();