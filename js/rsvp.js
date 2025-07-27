// RSVP Manager
class RSVPManager {
    constructor() {
        this.rsvps = [
            {
                id: 1,
                eventName: 'Annual Science Fair',
                userName: 'John Smith',
                userEmail: 'john.smith@campushub.edu',
                status: 'confirmed',
                submittedAt: '2024-01-18T10:30:00Z',
                emailSent: true,
                emailSentAt: '2024-01-18T10:35:00Z'
            },
            {
                id: 2,
                eventName: 'Music Festival',
                userName: 'Emily Davis',
                userEmail: 'emily.davis@campushub.edu',
                status: 'pending',
                submittedAt: '2024-01-19T14:20:00Z',
                emailSent: false,
                emailSentAt: null
            }
        ];

        this.emailLogs = [
            {
                id: 1,
                type: 'rsvp_confirmation',
                recipient: 'john.smith@campushub.edu',
                subject: 'RSVP Confirmation - Annual Science Fair',
                status: 'delivered',
                sentAt: '2024-01-18T10:35:00Z',
                eventName: 'Annual Science Fair'
            },
            {
                id: 2,
                type: 'event_reminder',
                recipient: 'all_attendees@campushub.edu',
                subject: 'Reminder: Music Festival Tomorrow',
                status: 'delivered',
                sentAt: '2024-01-19T16:00:00Z',
                eventName: 'Music Festival'
            }
        ];
    }

    render(container) {
        container.innerHTML = this.getHTML();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">RSVP & Email Management</h2>
                    <p class="text-gray-600">Track event responses and email communications</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-blue-100 text-sm">Total RSVPs</p>
                                <h3 class="text-3xl font-bold">${this.rsvps.length}</h3>
                            </div>
                            <i class="fas fa-envelope text-2xl text-blue-200"></i>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-green-100 text-sm">Confirmed</p>
                                <h3 class="text-3xl font-bold">${this.rsvps.filter(r => r.status === 'confirmed').length}</h3>
                            </div>
                            <i class="fas fa-check-circle text-2xl text-green-200"></i>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-yellow-100 text-sm">Pending</p>
                                <h3 class="text-3xl font-bold">${this.rsvps.filter(r => r.status === 'pending').length}</h3>
                            </div>
                            <i class="fas fa-clock text-2xl text-yellow-200"></i>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-purple-100 text-sm">Emails Sent</p>
                                <h3 class="text-3xl font-bold">${this.emailLogs.length}</h3>
                            </div>
                            <i class="fas fa-paper-plane text-2xl text-purple-200"></i>
                        </div>
                    </div>
                </div>

                <!-- RSVP List -->
                <div class="card rounded-xl shadow-sm overflow-hidden mb-6">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Recent RSVPs</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Submitted</th>
                                    <th>Email Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.rsvps.map(rsvp => `
                                    <tr>
                                        <td class="font-medium text-gray-900">${rsvp.eventName}</td>
                                        <td>
                                            <div class="text-gray-900">${rsvp.userName}</div>
                                            <div class="text-sm text-gray-500">${rsvp.userEmail}</div>
                                        </td>
                                        <td>
                                            <span class="status-badge ${rsvp.status}">${rsvp.status}</span>
                                        </td>
                                        <td class="text-gray-600">${this.formatDateTime(rsvp.submittedAt)}</td>
                                        <td>
                                            ${rsvp.emailSent ? `
                                                <div class="flex items-center text-green-600">
                                                    <i class="fas fa-check-circle mr-1"></i>
                                                    <span class="text-sm">Sent</span>
                                                </div>
                                            ` : `
                                                <div class="flex items-center text-gray-500">
                                                    <i class="fas fa-clock mr-1"></i>
                                                    <span class="text-sm">Pending</span>
                                                </div>
                                            `}
                                        </td>
                                        <td>
                                            <div class="flex space-x-2">
                                                <button class="text-indigo-600 hover:text-indigo-800" title="View Details">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                ${!rsvp.emailSent ? `
                                                    <button class="text-green-600 hover:text-green-800" title="Send Email">
                                                        <i class="fas fa-paper-plane"></i>
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Email Logs -->
                <div class="card rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Email Logs</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Recipient</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Sent At</th>
                                    <th>Event</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.emailLogs.map(log => `
                                    <tr>
                                        <td>
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                ${log.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td class="text-gray-900">${log.recipient}</td>
                                        <td class="text-gray-900">${log.subject}</td>
                                        <td>
                                            <span class="status-badge ${log.status === 'delivered' ? 'active' : 'pending'}">
                                                ${log.status}
                                            </span>
                                        </td>
                                        <td class="text-gray-600">${this.formatDateTime(log.sentAt)}</td>
                                        <td class="text-gray-900">${log.eventName}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

window.RSVPManager = new RSVPManager();