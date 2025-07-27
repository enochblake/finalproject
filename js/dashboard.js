// Dashboard Manager
class DashboardManager {
    constructor() {
        this.data = {
            stats: {
                totalEvents: 142,
                activeClubs: 36,
                registeredUsers: 2847,
                rsvpsSent: 1924
            },
            recentActivities: [
                {
                    icon: 'fas fa-calendar-plus',
                    iconBg: 'bg-indigo-100',
                    iconColor: 'text-indigo-600',
                    title: 'New event created',
                    detail: '"Tech Conference 2024" by Computer Science Club',
                    time: '2 hours ago',
                    action: 'View'
                },
                {
                    icon: 'fas fa-user-plus',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    title: 'New club approved',
                    detail: '"Photography Society" by Jane Smith',
                    time: '5 hours ago',
                    action: 'View'
                },
                {
                    icon: 'fas fa-comment-dots',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    title: 'New chat message flagged',
                    detail: 'In "Debate Club" chat room',
                    time: 'Yesterday',
                    action: 'Review'
                },
                {
                    icon: 'fas fa-exclamation-triangle',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    title: 'Event capacity reached',
                    detail: '"Annual Science Fair" is now full',
                    time: '2 days ago',
                    action: 'Manage'
                }
            ],
            upcomingEvents: [
                {
                    name: 'Annual Science Fair',
                    venue: 'Main Auditorium',
                    date: 'May 15, 2024',
                    time: '10:00 AM - 4:00 PM',
                    club: 'Science Club',
                    rsvps: 247,
                    capacity: 300,
                    status: 'Active'
                },
                {
                    name: 'Music Festival',
                    venue: 'Quadrangle',
                    date: 'May 17, 2024',
                    time: '6:00 PM - 10:00 PM',
                    club: 'Music Club',
                    rsvps: 189,
                    capacity: 500,
                    status: 'Active'
                },
                {
                    name: 'Debate Competition',
                    venue: 'Lecture Hall B',
                    date: 'May 18, 2024',
                    time: '3:00 PM - 6:00 PM',
                    club: 'Debate Club',
                    rsvps: 56,
                    capacity: 100,
                    status: 'Pending'
                },
                {
                    name: 'Art Exhibition',
                    venue: 'Gallery Hall',
                    date: 'May 20, 2024',
                    time: '2:00 PM - 8:00 PM',
                    club: 'Art Club',
                    rsvps: 78,
                    capacity: 150,
                    status: 'Active'
                }
            ]
        };

        this.charts = {};
    }

    render(container) {
        container.innerHTML = this.getHTML();
        this.initializeCharts();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    ${this.getStatsCardsHTML()}
                </div>
                
                <!-- Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    ${this.getChartsHTML()}
                </div>
                
                <!-- Recent Activity & Upcoming Events -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    ${this.getRecentActivityHTML()}
                    ${this.getQuickActionsHTML()}
                </div>
                
                <!-- Upcoming Events Table -->
                ${this.getUpcomingEventsHTML()}
            </div>
        `;
    }

    getStatsCardsHTML() {
        const stats = [
            {
                title: 'Total Events',
                value: this.data.stats.totalEvents,
                change: '+12% from last month',
                changeType: 'positive',
                icon: 'fas fa-calendar',
                id: 'totalEvents'
            },
            {
                title: 'Active Clubs',
                value: this.data.stats.activeClubs,
                change: '+3 new this month',
                changeType: 'positive',
                icon: 'fas fa-users',
                id: 'activeClubs'
            },
            {
                title: 'Registered Users',
                value: this.data.stats.registeredUsers.toLocaleString(),
                change: '+124 new signups',
                changeType: 'positive',
                icon: 'fas fa-user-graduate',
                id: 'registeredUsers'
            },
            {
                title: 'RSVPs Sent',
                value: this.data.stats.rsvpsSent.toLocaleString(),
                change: '+312 this week',
                changeType: 'positive',
                icon: 'fas fa-envelope-open-text',
                id: 'rsvpsSent'
            }
        ];

        return stats.map(stat => `
            <div class="stat-card rounded-2xl shadow-lg p-6 text-white relative overflow-hidden transform hover:scale-105 transition-transform duration-200">
                <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-white/80 text-sm">${stat.title}</p>
                            <h3 class="text-3xl font-bold" id="${stat.id}">${stat.value}</h3>
                            <p class="text-sm text-green-300 mt-1">
                                <i class="fas fa-arrow-up mr-1"></i>
                                ${stat.change}
                            </p>
                        </div>
                        <div class="bg-white/20 p-3 rounded-xl">
                            <i class="${stat.icon} text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getChartsHTML() {
        return `
            <div class="card rounded-2xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Event Attendance Trends</h3>
                    <select class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="attendanceTimeframe">
                        <option value="7">Last 7 Days</option>
                        <option value="30" selected>Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="attendanceChart"></canvas>
                </div>
            </div>
            
            <div class="card rounded-2xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Club Membership Distribution</h3>
                    <select class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="membershipView">
                        <option value="category" selected>By Category</option>
                        <option value="size">By Size</option>
                        <option value="activity">By Activity</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="membershipChart"></canvas>
                </div>
            </div>
        `;
    }

    getRecentActivityHTML() {
        return `
            <div class="card rounded-2xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Recent Activity</h3>
                    <button class="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors" onclick="DashboardManager.viewAllActivities()">
                        View All
                    </button>
                </div>
                
                <div class="space-y-4" id="recentActivity">
                    ${this.data.recentActivities.map(activity => `
                        <div class="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer" onclick="DashboardManager.handleActivityClick('${activity.title}')">
                            <div class="${activity.iconBg} p-2 rounded-lg">
                                <i class="${activity.icon} ${activity.iconColor}"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-medium text-gray-800">${activity.title}</p>
                                <p class="text-sm text-gray-500">${activity.detail}</p>
                                <p class="text-xs text-gray-400 mt-1">${activity.time}</p>
                            </div>
                            <button class="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                                ${activity.action}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getQuickActionsHTML() {
        return `
            <div class="card rounded-2xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Quick Actions</h3>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="DashboardManager.createEvent()" class="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105">
                        <i class="fas fa-plus-circle text-2xl mb-2"></i>
                        <p class="font-medium">Create Event</p>
                    </button>
                    
                    <button onclick="DashboardManager.approveClub()" class="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105">
                        <i class="fas fa-check-circle text-2xl mb-2"></i>
                        <p class="font-medium">Approve Club</p>
                    </button>
                    
                    <button onclick="DashboardManager.sendAnnouncement()" class="p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105">
                        <i class="fas fa-bullhorn text-2xl mb-2"></i>
                        <p class="font-medium">Send Alert</p>
                    </button>
                    
                    <button onclick="DashboardManager.viewReports()" class="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105">
                        <i class="fas fa-chart-bar text-2xl mb-2"></i>
                        <p class="font-medium">View Reports</p>
                    </button>
                </div>
            </div>
        `;
    }

    getUpcomingEventsHTML() {
        return `
            <div class="card rounded-2xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Upcoming Events (Next 7 Days)</h3>
                    <button class="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors" onclick="DashboardManager.viewAllEvents()">
                        View All Events
                    </button>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Club</th>
                                <th>RSVPs</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="eventsTable">
                            ${this.data.upcomingEvents.map(event => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div class="font-medium text-gray-800">${event.name}</div>
                                        <div class="text-sm text-gray-500">${event.venue}</div>
                                    </td>
                                    <td>
                                        <div class="text-gray-800">${event.date}</div>
                                        <div class="text-sm text-gray-500">${event.time}</div>
                                    </td>
                                    <td>
                                        <div class="flex items-center">
                                            <img src="https://via.placeholder.com/40" alt="${event.club}" class="h-6 w-6 rounded-full mr-2">
                                            <span class="text-gray-800">${event.club}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex items-center">
                                            <span class="font-medium text-gray-800">${event.rsvps}</span>
                                            <span class="ml-1 text-sm text-gray-500">/ ${event.capacity}</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div class="bg-indigo-600 h-1.5 rounded-full" style="width: ${(event.rsvps / event.capacity) * 100}%"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="status-badge ${event.status.toLowerCase()}">${event.status}</span>
                                    </td>
                                    <td>
                                        <button onclick="DashboardManager.editEvent('${event.name}')" class="text-indigo-600 hover:text-indigo-800 mr-3 transition-colors">Edit</button>
                                        <button onclick="DashboardManager.viewEvent('${event.name}')" class="text-indigo-600 hover:text-indigo-800 transition-colors">View</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    initializeCharts() {
        this.initAttendanceChart();
        this.initMembershipChart();
    }

    initAttendanceChart() {
        const ctx = document.getElementById('attendanceChart');
        if (!ctx) return;

        this.charts.attendance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Event Attendance',
                    data: [120, 190, 170, 220],
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Attendance: ${context.parsed.y} people`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        ticks: { color: '#6b7280' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#6b7280' }
                    }
                }
            }
        });
    }

    initMembershipChart() {
        const ctx = document.getElementById('membershipChart');
        if (!ctx) return;

        this.charts.membership = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Science', 'Arts', 'Sports', 'Tech', 'Cultural'],
                datasets: [{
                    data: [320, 180, 240, 420, 290],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(129, 140, 248, 0.8)',
                        'rgba(167, 139, 250, 0.8)',
                        'rgba(196, 181, 253, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(99, 102, 241, 1)',
                        'rgba(129, 140, 248, 1)',
                        'rgba(167, 139, 250, 1)',
                        'rgba(196, 181, 253, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            color: '#374151'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed * 100) / total).toFixed(1);
                                return `${context.label}: ${context.parsed} members (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    setupEventListeners() {
        // Chart timeframe changes
        const attendanceSelect = document.getElementById('attendanceTimeframe');
        if (attendanceSelect) {
            attendanceSelect.addEventListener('change', (e) => {
                this.updateAttendanceChart(e.target.value);
            });
        }

        const membershipSelect = document.getElementById('membershipView');
        if (membershipSelect) {
            membershipSelect.addEventListener('change', (e) => {
                this.updateMembershipChart(e.target.value);
            });
        }
    }

    updateAttendanceChart(timeframe) {
        if (!this.charts.attendance) return;

        let labels, data;
        switch (timeframe) {
            case '7':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = [45, 52, 38, 67, 73, 89, 65];
                break;
            case '30':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                data = [120, 190, 170, 220];
                break;
            case '90':
                labels = ['Month 1', 'Month 2', 'Month 3'];
                data = [580, 720, 650];
                break;
        }

        this.charts.attendance.data.labels = labels;
        this.charts.attendance.data.datasets[0].data = data;
        this.charts.attendance.update();
    }

    updateMembershipChart(view) {
        if (!this.charts.membership) return;

        let labels, data;
        switch (view) {
            case 'category':
                labels = ['Science', 'Arts', 'Sports', 'Tech', 'Cultural'];
                data = [320, 180, 240, 420, 290];
                break;
            case 'size':
                labels = ['Small (0-20)', 'Medium (21-50)', 'Large (51-100)', 'XLarge (100+)'];
                data = [450, 380, 320, 300];
                break;
            case 'activity':
                labels = ['Very Active', 'Active', 'Moderate', 'Low', 'Inactive'];
                data = [280, 350, 420, 200, 200];
                break;
        }

        this.charts.membership.data.labels = labels;
        this.charts.membership.data.datasets[0].data = data;
        this.charts.membership.update();
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateStats();
        }, 30000); // Update every 30 seconds
    }

    updateStats() {
        // Simulate real-time stat updates
        this.data.stats.totalEvents += Math.floor(Math.random() * 3);
        this.data.stats.registeredUsers += Math.floor(Math.random() * 10);
        this.data.stats.rsvpsSent += Math.floor(Math.random() * 20);

        // Update the DOM
        const totalEventsEl = document.getElementById('totalEvents');
        const registeredUsersEl = document.getElementById('registeredUsers');
        const rsvpsSentEl = document.getElementById('rsvpsSent');

        if (totalEventsEl) totalEventsEl.textContent = this.data.stats.totalEvents;
        if (registeredUsersEl) registeredUsersEl.textContent = this.data.stats.registeredUsers.toLocaleString();
        if (rsvpsSentEl) rsvpsSentEl.textContent = this.data.stats.rsvpsSent.toLocaleString();
    }

    refreshData() {
        this.updateStats();
        if (window.app) {
            window.app.showToast('Dashboard data refreshed', 'success');
        }
    }

    // Static methods for button actions
    static createEvent() {
        if (window.app) {
            window.app.showModal(`
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                        <input type="text" class="form-input" placeholder="Enter event name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input type="date" class="form-input">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                        <input type="text" class="form-input" placeholder="Enter venue">
                    </div>
                    <div class="flex space-x-4">
                        <button type="button" onclick="app.closeModal()" class="btn-secondary flex-1">Cancel</button>
                        <button type="submit" class="btn-primary flex-1">Create Event</button>
                    </div>
                </form>
            `, { title: 'Create New Event', maxWidth: '500px' });
        }
    }

    static approveClub() {
        if (window.app) {
            window.app.navigateToPage('clubs');
            window.app.showToast('Redirected to Club Management', 'info');
        }
    }

    static sendAnnouncement() {
        if (window.app) {
            window.app.navigateToPage('announcements');
            window.app.showToast('Redirected to Announcements', 'info');
        }
    }

    static viewReports() {
        if (window.app) {
            window.app.showToast('Reports feature coming soon!', 'info');
        }
    }

    static viewAllActivities() {
        if (window.app) {
            window.app.showToast('Viewing all activities...', 'info');
        }
    }

    static viewAllEvents() {
        if (window.app) {
            window.app.navigateToPage('events');
        }
    }

    static handleActivityClick(title) {
        if (window.app) {
            window.app.showToast(`Viewing activity: ${title}`, 'info');
        }
    }

    static editEvent(eventName) {
        if (window.app) {
            window.app.showToast(`Editing event: ${eventName}`, 'info');
        }
    }

    static viewEvent(eventName) {
        if (window.app) {
            window.app.showToast(`Viewing event: ${eventName}`, 'info');
        }
    }
}

// Initialize Dashboard Manager
window.DashboardManager = new DashboardManager();