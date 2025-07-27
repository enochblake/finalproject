// Events Manager
class EventsManager {
    constructor() {
        this.events = [
            {
                id: 1,
                name: 'Annual Science Fair',
                description: 'Showcase of innovative science projects by students from all departments',
                venue: 'Main Auditorium',
                date: '2024-05-15',
                time: '10:00',
                endTime: '16:00',
                capacity: 300,
                registrations: 247,
                club: 'Science Club',
                clubId: 1,
                status: 'active',
                category: 'Academic',
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
                tags: ['science', 'exhibition', 'academic'],
                createdBy: 'Dr. Smith',
                createdAt: '2024-04-01',
                lastModified: '2024-04-15'
            },
            {
                id: 2,
                name: 'Music Festival',
                description: 'Annual celebration of music featuring various genres and performances',
                venue: 'Quadrangle',
                date: '2024-05-17',
                time: '18:00',
                endTime: '22:00',
                capacity: 500,
                registrations: 189,
                club: 'Music Club',
                clubId: 2,
                status: 'active',
                category: 'Cultural',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
                tags: ['music', 'festival', 'cultural'],
                createdBy: 'Prof. Johnson',
                createdAt: '2024-03-20',
                lastModified: '2024-04-10'
            },
            {
                id: 3,
                name: 'Debate Competition',
                description: 'Inter-college debate competition on contemporary social issues',
                venue: 'Lecture Hall B',
                date: '2024-05-18',
                time: '15:00',
                endTime: '18:00',
                capacity: 100,
                registrations: 56,
                club: 'Debate Club',
                clubId: 3,
                status: 'pending',
                category: 'Academic',
                image: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=400',
                tags: ['debate', 'competition', 'academic'],
                createdBy: 'Ms. Davis',
                createdAt: '2024-04-05',
                lastModified: '2024-04-05'
            },
            {
                id: 4,
                name: 'Art Exhibition',
                description: 'Student artwork display featuring paintings, sculptures, and digital art',
                venue: 'Gallery Hall',
                date: '2024-05-20',
                time: '14:00',
                endTime: '20:00',
                capacity: 150,
                registrations: 78,
                club: 'Art Club',
                clubId: 4,
                status: 'active',
                category: 'Cultural',
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
                tags: ['art', 'exhibition', 'cultural'],
                createdBy: 'Mr. Wilson',
                createdAt: '2024-03-25',
                lastModified: '2024-04-12'
            },
            {
                id: 5,
                name: 'Tech Workshop',
                description: 'Hands-on workshop on latest web development technologies',
                venue: 'Computer Lab',
                date: '2024-05-22',
                time: '09:00',
                endTime: '17:00',
                capacity: 50,
                registrations: 45,
                club: 'Computer Science Club',
                clubId: 5,
                status: 'active',
                category: 'Technical',
                image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
                tags: ['tech', 'workshop', 'programming'],
                createdBy: 'Dr. Anderson',
                createdAt: '2024-04-08',
                lastModified: '2024-04-18'
            }
        ];

        this.filters = {
            status: 'all',
            category: 'all',
            club: 'all',
            search: ''
        };

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.selectedEvents = [];
    }

    render(container) {
        container.innerHTML = this.getHTML();
        this.setupEventListeners();
        this.renderEventsList();
        this.updatePendingCount();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <!-- Header with Actions -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Event Management</h2>
                        <p class="text-gray-600">Create, manage, and monitor campus events</p>
                    </div>
                    <div class="flex space-x-3 mt-4 sm:mt-0">
                        <button onclick="EventsManager.exportEvents()" class="btn-secondary">
                            <i class="fas fa-download mr-2"></i>Export
                        </button>
                        <button onclick="EventsManager.showCreateModal()" class="btn-primary">
                            <i class="fas fa-plus mr-2"></i>Create Event
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    ${this.getStatsHTML()}
                </div>

                <!-- Filters and Search -->
                <div class="card rounded-xl shadow-sm p-6 mb-6">
                    <div class="search-filter-bar">
                        <div class="relative flex-1">
                            <input type="text" id="eventSearch" placeholder="Search events..." class="search-input">
                            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <select id="statusFilter" class="filter-select">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select id="categoryFilter" class="filter-select">
                            <option value="all">All Categories</option>
                            <option value="Academic">Academic</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Technical">Technical</option>
                            <option value="Sports">Sports</option>
                            <option value="Social">Social</option>
                        </select>
                        <select id="clubFilter" class="filter-select">
                            <option value="all">All Clubs</option>
                            <option value="Science Club">Science Club</option>
                            <option value="Music Club">Music Club</option>
                            <option value="Debate Club">Debate Club</option>
                            <option value="Art Club">Art Club</option>
                            <option value="Computer Science Club">Computer Science Club</option>
                        </select>
                    </div>
                </div>

                <!-- Events Table -->
                <div class="card rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">Events List</h3>
                            <div class="flex items-center space-x-3">
                                <div class="flex items-center space-x-2" id="bulkActions" style="display: none;">
                                    <span class="text-sm text-gray-600" id="selectedCount">0 selected</span>
                                    <button onclick="EventsManager.bulkApprove()" class="btn-success text-sm">Approve</button>
                                    <button onclick="EventsManager.bulkReject()" class="btn-danger text-sm">Reject</button>
                                </div>
                                <select id="itemsPerPage" class="filter-select text-sm">
                                    <option value="10">10 per page</option>
                                    <option value="25">25 per page</option>
                                    <option value="50">50 per page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="w-8">
                                        <input type="checkbox" id="selectAll" class="rounded border-gray-300">
                                    </th>
                                    <th>Event</th>
                                    <th>Date & Time</th>
                                    <th>Club</th>
                                    <th>Registrations</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="eventsTableBody">
                                <!-- Events will be rendered here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="pagination" id="eventsPagination">
                        <!-- Pagination will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    getStatsHTML() {
        const totalEvents = this.events.length;
        const activeEvents = this.events.filter(e => e.status === 'active').length;
        const pendingEvents = this.events.filter(e => e.status === 'pending').length;
        const totalRegistrations = this.events.reduce((sum, e) => sum + e.registrations, 0);

        return `
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-blue-100 text-sm">Total Events</p>
                        <h3 class="text-3xl font-bold">${totalEvents}</h3>
                    </div>
                    <i class="fas fa-calendar text-2xl text-blue-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-green-100 text-sm">Active Events</p>
                        <h3 class="text-3xl font-bold">${activeEvents}</h3>
                    </div>
                    <i class="fas fa-check-circle text-2xl text-green-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-yellow-100 text-sm">Pending Approval</p>
                        <h3 class="text-3xl font-bold">${pendingEvents}</h3>
                    </div>
                    <i class="fas fa-clock text-2xl text-yellow-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-purple-100 text-sm">Total Registrations</p>
                        <h3 class="text-3xl font-bold">${totalRegistrations.toLocaleString()}</h3>
                    </div>
                    <i class="fas fa-users text-2xl text-purple-200"></i>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('eventSearch');
        searchInput?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Filters
        ['statusFilter', 'categoryFilter', 'clubFilter'].forEach(filterId => {
            const filter = document.getElementById(filterId);
            filter?.addEventListener('change', (e) => {
                this.filters[filterId.replace('Filter', '')] = e.target.value;
                this.applyFilters();
            });
        });

        // Items per page
        const itemsPerPageSelect = document.getElementById('itemsPerPage');
        itemsPerPageSelect?.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEventsList();
        });

        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        selectAllCheckbox?.addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });
    }

    applyFilters() {
        this.currentPage = 1;
        this.renderEventsList();
    }

    getFilteredEvents() {
        return this.events.filter(event => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const matchesSearch = 
                    event.name.toLowerCase().includes(searchTerm) ||
                    event.description.toLowerCase().includes(searchTerm) ||
                    event.club.toLowerCase().includes(searchTerm) ||
                    event.venue.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // Status filter
            if (this.filters.status !== 'all' && event.status !== this.filters.status) {
                return false;
            }

            // Category filter
            if (this.filters.category !== 'all' && event.category !== this.filters.category) {
                return false;
            }

            // Club filter
            if (this.filters.club !== 'all' && event.club !== this.filters.club) {
                return false;
            }

            return true;
        });
    }

    renderEventsList() {
        const filteredEvents = this.getFilteredEvents();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

        const tbody = document.getElementById('eventsTableBody');
        if (!tbody) return;

        tbody.innerHTML = paginatedEvents.map(event => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <input type="checkbox" class="event-checkbox rounded border-gray-300" 
                           value="${event.id}" onchange="EventsManager.toggleEventSelection(${event.id})">
                </td>
                <td>
                    <div class="flex items-center space-x-3">
                        <img src="${event.image}" alt="${event.name}" class="h-12 w-12 rounded-lg object-cover">
                        <div>
                            <div class="font-medium text-gray-900">${event.name}</div>
                            <div class="text-sm text-gray-500">${event.venue}</div>
                            <div class="flex items-center space-x-1 mt-1">
                                ${event.tags.map(tag => `<span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="text-gray-900">${this.formatDate(event.date)}</div>
                    <div class="text-sm text-gray-500">${event.time} - ${event.endTime}</div>
                </td>
                <td>
                    <div class="flex items-center space-x-2">
                        <div class="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-users text-indigo-600 text-sm"></i>
                        </div>
                        <span class="text-gray-900">${event.club}</span>
                    </div>
                </td>
                <td>
                    <div class="flex items-center space-x-2">
                        <span class="font-medium text-gray-900">${event.registrations}</span>
                        <span class="text-gray-500">/ ${event.capacity}</span>
                    </div>
                    <div class="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(event.registrations / event.capacity) * 100}%"></div>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${event.status}">${this.capitalize(event.status)}</span>
                </td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button onclick="EventsManager.viewEvent(${event.id})" 
                                class="text-indigo-600 hover:text-indigo-800 transition-colors" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="EventsManager.editEvent(${event.id})" 
                                class="text-green-600 hover:text-green-800 transition-colors" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${event.status === 'pending' ? `
                            <button onclick="EventsManager.approveEvent(${event.id})" 
                                    class="text-blue-600 hover:text-blue-800 transition-colors" title="Approve">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="EventsManager.rejectEvent(${event.id})" 
                                    class="text-red-600 hover:text-red-800 transition-colors" title="Reject">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                        <button onclick="EventsManager.deleteEvent(${event.id})" 
                                class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        this.renderPagination(filteredEvents.length);
    }

    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.getElementById('eventsPagination');
        if (!pagination) return;

        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

        pagination.innerHTML = `
            <div class="pagination-info">
                Showing ${startItem} to ${endItem} of ${totalItems} events
            </div>
            <div class="pagination-nav">
                ${this.getPaginationButtons(totalPages)}
            </div>
        `;
    }

    getPaginationButtons(totalPages) {
        let buttons = '';

        // Previous button
        buttons += `
            <button onclick="EventsManager.changePage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                buttons += `
                    <button onclick="EventsManager.changePage(${i})" 
                            class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${i === this.currentPage ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                buttons += `<span class="px-3 py-2">...</span>`;
            }
        }

        // Next button
        buttons += `
            <button onclick="EventsManager.changePage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                Next
            </button>
        `;

        return buttons;
    }

    updatePendingCount() {
        const pendingCount = this.events.filter(e => e.status === 'pending').length;
        const badge = document.getElementById('pendingEventsCount');
        if (badge) {
            badge.textContent = pendingCount;
            badge.style.display = pendingCount > 0 ? 'inline' : 'none';
        }
    }

    // Utility methods
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Static methods for event actions
    static changePage(page) {
        if (window.EventsManager) {
            window.EventsManager.currentPage = page;
            window.EventsManager.renderEventsList();
        }
    }

    static toggleEventSelection(eventId) {
        if (!window.EventsManager) return;

        const index = window.EventsManager.selectedEvents.indexOf(eventId);
        if (index > -1) {
            window.EventsManager.selectedEvents.splice(index, 1);
        } else {
            window.EventsManager.selectedEvents.push(eventId);
        }

        window.EventsManager.updateBulkActions();
    }

    toggleSelectAll(checked) {
        const checkboxes = document.querySelectorAll('.event-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            const eventId = parseInt(checkbox.value);
            if (checked && !this.selectedEvents.includes(eventId)) {
                this.selectedEvents.push(eventId);
            } else if (!checked) {
                const index = this.selectedEvents.indexOf(eventId);
                if (index > -1) {
                    this.selectedEvents.splice(index, 1);
                }
            }
        });

        this.updateBulkActions();
    }

    updateBulkActions() {
        const bulkActions = document.getElementById('bulkActions');
        const selectedCount = document.getElementById('selectedCount');
        
        if (bulkActions && selectedCount) {
            if (this.selectedEvents.length > 0) {
                bulkActions.style.display = 'flex';
                selectedCount.textContent = `${this.selectedEvents.length} selected`;
            } else {
                bulkActions.style.display = 'none';
            }
        }
    }

    static showCreateModal() {
        if (window.app) {
            window.app.showModal(`
                <form onsubmit="EventsManager.createEvent(event)" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                            <input type="text" name="name" required class="form-input" placeholder="Enter event name">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select name="category" required class="form-input">
                                <option value="">Select category</option>
                                <option value="Academic">Academic</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Technical">Technical</option>
                                <option value="Sports">Sports</option>
                                <option value="Social">Social</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input type="date" name="date" required class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                            <input type="time" name="time" required class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                            <input type="time" name="endTime" required class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                            <input type="text" name="venue" required class="form-input" placeholder="Enter venue">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                            <input type="number" name="capacity" required class="form-input" placeholder="Maximum attendees">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Club</label>
                            <select name="club" required class="form-input">
                                <option value="">Select club</option>
                                <option value="Science Club">Science Club</option>
                                <option value="Music Club">Music Club</option>
                                <option value="Debate Club">Debate Club</option>
                                <option value="Art Club">Art Club</option>
                                <option value="Computer Science Club">Computer Science Club</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" rows="4" class="form-input" placeholder="Event description"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                        <input type="text" name="tags" class="form-input" placeholder="e.g., science, exhibition, academic">
                    </div>
                    <div class="flex space-x-4">
                        <button type="button" onclick="app.closeModal()" class="btn-secondary flex-1">Cancel</button>
                        <button type="submit" class="btn-primary flex-1">Create Event</button>
                    </div>
                </form>
            `, { title: 'Create New Event', maxWidth: '800px' });
        }
    }

    static createEvent(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const newEvent = {
            id: Date.now(),
            name: formData.get('name'),
            description: formData.get('description'),
            venue: formData.get('venue'),
            date: formData.get('date'),
            time: formData.get('time'),
            endTime: formData.get('endTime'),
            capacity: parseInt(formData.get('capacity')),
            registrations: 0,
            club: formData.get('club'),
            clubId: Math.floor(Math.random() * 10) + 1,
            status: 'pending',
            category: formData.get('category'),
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            createdBy: 'Admin',
            createdAt: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0]
        };

        if (window.EventsManager) {
            window.EventsManager.events.unshift(newEvent);
            window.EventsManager.renderEventsList();
            window.EventsManager.updatePendingCount();
        }

        if (window.app) {
            window.app.closeModal();
            window.app.showToast('Event created successfully!', 'success');
        }
    }

    static viewEvent(eventId) {
        if (window.EventsManager) {
            const event = window.EventsManager.events.find(e => e.id === eventId);
            if (event && window.app) {
                window.app.showModal(`
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <img src="${event.image}" alt="${event.name}" class="h-24 w-24 rounded-lg object-cover">
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${event.name}</h3>
                                <p class="text-gray-600 mb-4">${event.description}</p>
                                <div class="flex items-center space-x-4 text-sm text-gray-500">
                                    <span><i class="fas fa-calendar mr-1"></i>${window.EventsManager.formatDate(event.date)}</span>
                                    <span><i class="fas fa-clock mr-1"></i>${event.time} - ${event.endTime}</span>
                                    <span><i class="fas fa-map-marker-alt mr-1"></i>${event.venue}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Event Details</h4>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">Club:</span> ${event.club}</div>
                                    <div><span class="font-medium">Category:</span> ${event.category}</div>
                                    <div><span class="font-medium">Status:</span> <span class="status-badge ${event.status}">${window.EventsManager.capitalize(event.status)}</span></div>
                                    <div><span class="font-medium">Created by:</span> ${event.createdBy}</div>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Registration Stats</h4>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">Capacity:</span> ${event.capacity}</div>
                                    <div><span class="font-medium">Registered:</span> ${event.registrations}</div>
                                    <div><span class="font-medium">Available:</span> ${event.capacity - event.registrations}</div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(event.registrations / event.capacity) * 100}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        ${event.tags.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Tags</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${event.tags.map(tag => `<span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="flex justify-end space-x-4">
                            <button onclick="app.closeModal()" class="btn-secondary">Close</button>
                            <button onclick="EventsManager.editEvent(${event.id}); app.closeModal();" class="btn-primary">Edit Event</button>
                        </div>
                    </div>
                `, { title: event.name, maxWidth: '700px' });
            }
        }
    }

    static editEvent(eventId) {
        if (window.app) {
            window.app.showToast('Edit functionality coming soon!', 'info');
        }
    }

    static approveEvent(eventId) {
        if (window.EventsManager) {
            const event = window.EventsManager.events.find(e => e.id === eventId);
            if (event) {
                event.status = 'active';
                event.lastModified = new Date().toISOString().split('T')[0];
                window.EventsManager.renderEventsList();
                window.EventsManager.updatePendingCount();
                
                if (window.app) {
                    window.app.showToast(`Event "${event.name}" approved successfully!`, 'success');
                }
            }
        }
    }

    static rejectEvent(eventId) {
        if (window.EventsManager) {
            const event = window.EventsManager.events.find(e => e.id === eventId);
            if (event) {
                event.status = 'cancelled';
                event.lastModified = new Date().toISOString().split('T')[0];
                window.EventsManager.renderEventsList();
                window.EventsManager.updatePendingCount();
                
                if (window.app) {
                    window.app.showToast(`Event "${event.name}" rejected.`, 'warning');
                }
            }
        }
    }

    static deleteEvent(eventId) {
        if (window.EventsManager && window.app) {
            const event = window.EventsManager.events.find(e => e.id === eventId);
            if (event) {
                if (confirm(`Are you sure you want to delete "${event.name}"? This action cannot be undone.`)) {
                    const index = window.EventsManager.events.findIndex(e => e.id === eventId);
                    window.EventsManager.events.splice(index, 1);
                    window.EventsManager.renderEventsList();
                    window.EventsManager.updatePendingCount();
                    window.app.showToast(`Event "${event.name}" deleted successfully.`, 'success');
                }
            }
        }
    }

    static bulkApprove() {
        if (window.EventsManager && window.EventsManager.selectedEvents.length > 0) {
            window.EventsManager.selectedEvents.forEach(eventId => {
                EventsManager.approveEvent(eventId);
            });
            window.EventsManager.selectedEvents = [];
            window.EventsManager.updateBulkActions();
        }
    }

    static bulkReject() {
        if (window.EventsManager && window.EventsManager.selectedEvents.length > 0) {
            window.EventsManager.selectedEvents.forEach(eventId => {
                EventsManager.rejectEvent(eventId);
            });
            window.EventsManager.selectedEvents = [];
            window.EventsManager.updateBulkActions();
        }
    }

    static exportEvents() {
        if (window.app) {
            window.app.showToast('Exporting events data...', 'info');
        }
    }
}

// Initialize Events Manager
window.EventsManager = new EventsManager();