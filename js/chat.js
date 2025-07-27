// Chat Manager
class ChatManager {
    constructor() {
        this.chatRooms = [
            {
                id: 1,
                name: 'Science Club General',
                club: 'Science Club',
                members: 45,
                lastActivity: '2024-01-20T14:30:00Z',
                flaggedMessages: 2,
                status: 'active',
                moderators: ['Dr. Sarah Wilson']
            },
            {
                id: 2,
                name: 'Debate Club Discussion',
                club: 'Debate Club',
                members: 28,
                lastActivity: '2024-01-20T13:15:00Z',
                flaggedMessages: 0,
                status: 'active',
                moderators: ['Ms. Lisa Martinez']
            }
        ];

        this.flaggedMessages = [
            {
                id: 1,
                chatRoom: 'Science Club General',
                user: 'John Doe',
                message: 'This content was flagged for review',
                timestamp: '2024-01-20T14:25:00Z',
                reason: 'inappropriate',
                status: 'pending'
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
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Club Chat Monitor</h2>
                    <p class="text-gray-600">Monitor and moderate club chat rooms</p>
                </div>

                <!-- Chat Rooms Overview -->
                <div class="card rounded-xl shadow-sm p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Active Chat Rooms</h3>
                    <div class="space-y-4">
                        ${this.chatRooms.map(room => `
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-medium text-gray-900">${room.name}</h4>
                                        <span class="status-badge ${room.status}">${room.status}</span>
                                        ${room.flaggedMessages > 0 ? `
                                            <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                ${room.flaggedMessages} flagged
                                            </span>
                                        ` : ''}
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                        <span><i class="fas fa-users mr-1"></i>${room.members} members</span>
                                        <span><i class="fas fa-clock mr-1"></i>Last activity: ${this.getTimeAgo(room.lastActivity)}</span>
                                        <span><i class="fas fa-user-shield mr-1"></i>Moderated by: ${room.moderators.join(', ')}</span>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="btn-secondary text-sm">View Chat</button>
                                    <button class="btn-primary text-sm">Moderate</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Flagged Messages -->
                <div class="card rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Flagged Messages</h3>
                    ${this.flaggedMessages.length > 0 ? `
                        <div class="space-y-4">
                            ${this.flaggedMessages.map(message => `
                                <div class="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center space-x-3 mb-2">
                                                <span class="font-medium text-gray-900">${message.user}</span>
                                                <span class="text-sm text-gray-500">in ${message.chatRoom}</span>
                                                <span class="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">${message.reason}</span>
                                            </div>
                                            <p class="text-gray-700 mb-2">"${message.message}"</p>
                                            <p class="text-sm text-gray-500">${this.formatDateTime(message.timestamp)}</p>
                                        </div>
                                        <div class="flex space-x-2">
                                            <button class="btn-success text-sm">Approve</button>
                                            <button class="btn-danger text-sm">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-check-circle text-4xl mb-3"></i>
                            <p>No flagged messages at this time</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`;
        } else if (diffMinutes < 1440) {
            return `${Math.floor(diffMinutes / 60)} hours ago`;
        } else {
            return `${Math.floor(diffMinutes / 1440)} days ago`;
        }
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

window.ChatManager = new ChatManager();