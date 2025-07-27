// Clubs Manager
class ClubsManager {
    constructor() {
        this.clubs = [
            {
                id: 1,
                name: 'Science Club',
                description: 'Dedicated to promoting scientific research and innovation among students',
                category: 'Academic',
                president: 'John Smith',
                advisor: 'Dr. Sarah Wilson',
                email: 'science@campushub.edu',
                founded: '2020-01-15',
                members: 65,
                maxMembers: 100,
                status: 'active',
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
                activities: ['Science Fair', 'Research Projects', 'Lab Workshops'],
                meetingSchedule: 'Thursdays 4:00 PM',
                location: 'Science Building Room 201',
                budget: 5000,
                expenses: 3200,
                events: 8,
                rating: 4.7
            },
            {
                id: 2,
                name: 'Music Club',
                description: 'Bringing together music enthusiasts to create and perform',
                category: 'Cultural',
                president: 'Emily Johnson',
                advisor: 'Prof. Michael Davis',
                email: 'music@campushub.edu',
                founded: '2019-09-20',
                members: 42,
                maxMembers: 80,
                status: 'active',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
                activities: ['Concerts', 'Music Workshops', 'Instrument Training'],
                meetingSchedule: 'Tuesdays 6:00 PM',
                location: 'Music Hall',
                budget: 7500,
                expenses: 4800,
                events: 12,
                rating: 4.9
            },
            {
                id: 3,
                name: 'Debate Club',
                description: 'Developing critical thinking and public speaking skills',
                category: 'Academic',
                president: 'David Brown',
                advisor: 'Ms. Lisa Martinez',
                email: 'debate@campushub.edu',
                founded: '2021-03-10',
                members: 28,
                maxMembers: 50,
                status: 'pending',
                image: 'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=400',
                activities: ['Debate Competitions', 'Public Speaking', 'Critical Analysis'],
                meetingSchedule: 'Fridays 3:00 PM',
                location: 'Library Conference Room',
                budget: 3000,
                expenses: 1500,
                events: 4,
                rating: 4.3
            },
            {
                id: 4,
                name: 'Art Club',
                description: 'Fostering creativity and artistic expression',
                category: 'Cultural',
                president: 'Maria Garcia',
                advisor: 'Mr. James Wilson',
                email: 'art@campushub.edu',
                founded: '2020-11-05',
                members: 35,
                maxMembers: 60,
                status: 'active',
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
                activities: ['Art Exhibitions', 'Painting Workshops', 'Sculpture Classes'],
                meetingSchedule: 'Saturdays 2:00 PM',
                location: 'Art Studio',
                budget: 4500,
                expenses: 2800,
                events: 6,
                rating: 4.6
            },
            {
                id: 5,
                name: 'Computer Science Club',
                description: 'Advancing programming skills and technology innovation',
                category: 'Technical',
                president: 'Alex Chen',
                advisor: 'Dr. Robert Anderson',
                email: 'cs@campushub.edu',
                founded: '2019-08-12',
                members: 78,
                maxMembers: 120,
                status: 'active',
                image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
                activities: ['Coding Competitions', 'Tech Workshops', 'Hackathons'],
                meetingSchedule: 'Wednesdays 5:00 PM',
                location: 'Computer Lab A',
                budget: 8000,
                expenses: 5200,
                events: 15,
                rating: 4.8
            },
            {
                id: 6,
                name: 'Photography Society',
                description: 'Capturing moments and developing photographic skills',
                category: 'Cultural',
                president: 'Jane Smith',
                advisor: 'Ms. Amanda Green',
                email: 'photo@campushub.edu',
                founded: '2022-01-20',
                members: 22,
                maxMembers: 40,
                status: 'suspended',
                image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400',
                activities: ['Photo Walks', 'Portfolio Reviews', 'Exhibition Planning'],
                meetingSchedule: 'Sundays 10:00 AM',
                location: 'Media Center',
                budget: 2500,
                expenses: 800,
                events: 3,
                rating: 4.1
            }
        ];

        this.filters = {
            status: 'all',
            category: 'all',
            search: ''
        };

        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.viewMode = 'grid'; // 'grid' or 'table'
    }

    render(container) {
        container.innerHTML = this.getHTML();
        this.setupEventListeners();
        this.renderClubsList();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <!-- Header with Actions -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Club Management</h2>
                        <p class="text-gray-600">Manage club registrations, activities, and membership</p>
                    </div>
                    <div class="flex space-x-3 mt-4 sm:mt-0">
                        <button onclick="ClubsManager.exportClubs()" class="btn-secondary">
                            <i class="fas fa-download mr-2"></i>Export
                        </button>
                        <button onclick="ClubsManager.showCreateModal()" class="btn-primary">
                            <i class="fas fa-plus mr-2"></i>Register Club
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    ${this.getStatsHTML()}
                </div>

                <!-- Filters and View Controls -->
                <div class="card rounded-xl shadow-sm p-6 mb-6">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div class="search-filter-bar flex-1">
                            <div class="relative flex-1">
                                <input type="text" id="clubSearch" placeholder="Search clubs..." class="search-input">
                                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                            <select id="statusFilter" class="filter-select">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <select id="categoryFilter" class="filter-select">
                                <option value="all">All Categories</option>
                                <option value="Academic">Academic</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Technical">Technical</option>
                                <option value="Sports">Sports</option>
                                <option value="Social">Social</option>
                            </select>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="flex bg-gray-100 rounded-lg p-1">
                                <button id="gridViewBtn" class="px-3 py-2 rounded-md transition-colors ${this.viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'}">
                                    <i class="fas fa-th"></i>
                                </button>
                                <button id="tableViewBtn" class="px-3 py-2 rounded-md transition-colors ${this.viewMode === 'table' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'}">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                            <select id="itemsPerPage" class="filter-select text-sm">
                                <option value="12">12 per page</option>
                                <option value="24">24 per page</option>
                                <option value="48">48 per page</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Clubs List -->
                <div id="clubsContainer">
                    <!-- Clubs will be rendered here -->
                </div>

                <!-- Pagination -->
                <div class="pagination mt-6" id="clubsPagination">
                    <!-- Pagination will be rendered here -->
                </div>
            </div>
        `;
    }

    getStatsHTML() {
        const totalClubs = this.clubs.length;
        const activeClubs = this.clubs.filter(c => c.status === 'active').length;
        const pendingClubs = this.clubs.filter(c => c.status === 'pending').length;
        const totalMembers = this.clubs.reduce((sum, c) => sum + c.members, 0);

        return `
            <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-indigo-100 text-sm">Total Clubs</p>
                        <h3 class="text-3xl font-bold">${totalClubs}</h3>
                    </div>
                    <i class="fas fa-users text-2xl text-indigo-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-green-100 text-sm">Active Clubs</p>
                        <h3 class="text-3xl font-bold">${activeClubs}</h3>
                    </div>
                    <i class="fas fa-check-circle text-2xl text-green-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-yellow-100 text-sm">Pending Approval</p>
                        <h3 class="text-3xl font-bold">${pendingClubs}</h3>
                    </div>
                    <i class="fas fa-clock text-2xl text-yellow-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-purple-100 text-sm">Total Members</p>
                        <h3 class="text-3xl font-bold">${totalMembers}</h3>
                    </div>
                    <i class="fas fa-user-friends text-2xl text-purple-200"></i>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('clubSearch');
        searchInput?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Filters
        ['statusFilter', 'categoryFilter'].forEach(filterId => {
            const filter = document.getElementById(filterId);
            filter?.addEventListener('change', (e) => {
                this.filters[filterId.replace('Filter', '')] = e.target.value;
                this.applyFilters();
            });
        });

        // View mode toggles
        document.getElementById('gridViewBtn')?.addEventListener('click', () => {
            this.viewMode = 'grid';
            this.updateViewMode();
            this.renderClubsList();
        });

        document.getElementById('tableViewBtn')?.addEventListener('click', () => {
            this.viewMode = 'table';
            this.updateViewMode();
            this.renderClubsList();
        });

        // Items per page
        const itemsPerPageSelect = document.getElementById('itemsPerPage');
        itemsPerPageSelect?.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderClubsList();
        });
    }

    updateViewMode() {
        const gridBtn = document.getElementById('gridViewBtn');
        const tableBtn = document.getElementById('tableViewBtn');
        
        if (this.viewMode === 'grid') {
            gridBtn?.classList.add('bg-white', 'shadow-sm', 'text-indigo-600');
            gridBtn?.classList.remove('text-gray-600', 'hover:text-gray-900');
            tableBtn?.classList.remove('bg-white', 'shadow-sm', 'text-indigo-600');
            tableBtn?.classList.add('text-gray-600', 'hover:text-gray-900');
        } else {
            tableBtn?.classList.add('bg-white', 'shadow-sm', 'text-indigo-600');
            tableBtn?.classList.remove('text-gray-600', 'hover:text-gray-900');
            gridBtn?.classList.remove('bg-white', 'shadow-sm', 'text-indigo-600');
            gridBtn?.classList.add('text-gray-600', 'hover:text-gray-900');
        }
    }

    applyFilters() {
        this.currentPage = 1;
        this.renderClubsList();
    }

    getFilteredClubs() {
        return this.clubs.filter(club => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const matchesSearch = 
                    club.name.toLowerCase().includes(searchTerm) ||
                    club.description.toLowerCase().includes(searchTerm) ||
                    club.president.toLowerCase().includes(searchTerm) ||
                    club.advisor.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // Status filter
            if (this.filters.status !== 'all' && club.status !== this.filters.status) {
                return false;
            }

            // Category filter
            if (this.filters.category !== 'all' && club.category !== this.filters.category) {
                return false;
            }

            return true;
        });
    }

    renderClubsList() {
        const filteredClubs = this.getFilteredClubs();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedClubs = filteredClubs.slice(startIndex, endIndex);

        const container = document.getElementById('clubsContainer');
        if (!container) return;

        if (this.viewMode === 'grid') {
            container.innerHTML = this.renderGridView(paginatedClubs);
        } else {
            container.innerHTML = this.renderTableView(paginatedClubs);
        }

        this.renderPagination(filteredClubs.length);
    }

    renderGridView(clubs) {
        if (clubs.length === 0) {
            return `
                <div class="card rounded-xl shadow-sm p-12 text-center">
                    <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No clubs found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${clubs.map(club => `
                    <div class="card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="relative">
                            <img src="${club.image}" alt="${club.name}" class="w-full h-48 object-cover">
                            <div class="absolute top-4 right-4">
                                <span class="status-badge ${club.status}">${this.capitalize(club.status)}</span>
                            </div>
                            <div class="absolute top-4 left-4">
                                <span class="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full">${club.category}</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="text-lg font-bold text-gray-900">${club.name}</h3>
                                <div class="flex items-center text-yellow-500">
                                    <i class="fas fa-star text-sm mr-1"></i>
                                    <span class="text-sm">${club.rating}</span>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${club.description}</p>
                            
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center text-sm text-gray-500">
                                    <i class="fas fa-user-tie w-4 mr-2"></i>
                                    <span>${club.president}</span>
                                </div>
                                <div class="flex items-center text-sm text-gray-500">
                                    <i class="fas fa-users w-4 mr-2"></i>
                                    <span>${club.members} / ${club.maxMembers} members</span>
                                </div>
                                <div class="flex items-center text-sm text-gray-500">
                                    <i class="fas fa-calendar w-4 mr-2"></i>
                                    <span>${club.meetingSchedule}</span>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Membership</span>
                                    <span>${Math.round((club.members / club.maxMembers) * 100)}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(club.members / club.maxMembers) * 100}%"></div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex space-x-2">
                                    <button onclick="ClubsManager.viewClub(${club.id})" 
                                            class="text-indigo-600 hover:text-indigo-800 transition-colors" title="View Details">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="ClubsManager.editClub(${club.id})" 
                                            class="text-green-600 hover:text-green-800 transition-colors" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    ${club.status === 'pending' ? `
                                        <button onclick="ClubsManager.approveClub(${club.id})" 
                                                class="text-blue-600 hover:text-blue-800 transition-colors" title="Approve">
                                            <i class="fas fa-check"></i>
                                        </button>
                                    ` : ''}
                                    ${club.status === 'suspended' ? `
                                        <button onclick="ClubsManager.reactivateClub(${club.id})" 
                                                class="text-green-600 hover:text-green-800 transition-colors" title="Reactivate">
                                            <i class="fas fa-play"></i>
                                        </button>
                                    ` : club.status === 'active' ? `
                                        <button onclick="ClubsManager.suspendClub(${club.id})" 
                                                class="text-yellow-600 hover:text-yellow-800 transition-colors" title="Suspend">
                                            <i class="fas fa-pause"></i>
                                        </button>
                                    ` : ''}
                                </div>
                                <span class="text-sm text-gray-500">${club.events} events</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderTableView(clubs) {
        if (clubs.length === 0) {
            return `
                <div class="card rounded-xl shadow-sm p-12 text-center">
                    <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No clubs found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            `;
        }

        return `
            <div class="card rounded-xl shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Club</th>
                                <th>President</th>
                                <th>Members</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clubs.map(club => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <img src="${club.image}" alt="${club.name}" class="h-12 w-12 rounded-lg object-cover">
                                            <div>
                                                <div class="font-medium text-gray-900">${club.name}</div>
                                                <div class="text-sm text-gray-500">${club.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-gray-900">${club.president}</div>
                                        <div class="text-sm text-gray-500">${club.advisor}</div>
                                    </td>
                                    <td>
                                        <div class="flex items-center space-x-2">
                                            <span class="font-medium text-gray-900">${club.members}</span>
                                            <span class="text-gray-500">/ ${club.maxMembers}</span>
                                        </div>
                                        <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                            <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(club.members / club.maxMembers) * 100}%"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-gray-900">$${club.budget.toLocaleString()}</div>
                                        <div class="text-sm text-gray-500">Used: $${club.expenses.toLocaleString()}</div>
                                    </td>
                                    <td>
                                        <span class="status-badge ${club.status}">${this.capitalize(club.status)}</span>
                                    </td>
                                    <td>
                                        <div class="flex items-center text-yellow-500">
                                            <i class="fas fa-star text-sm mr-1"></i>
                                            <span class="text-sm text-gray-900">${club.rating}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex items-center space-x-2">
                                            <button onclick="ClubsManager.viewClub(${club.id})" 
                                                    class="text-indigo-600 hover:text-indigo-800 transition-colors" title="View Details">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button onclick="ClubsManager.editClub(${club.id})" 
                                                    class="text-green-600 hover:text-green-800 transition-colors" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            ${club.status === 'pending' ? `
                                                <button onclick="ClubsManager.approveClub(${club.id})" 
                                                        class="text-blue-600 hover:text-blue-800 transition-colors" title="Approve">
                                                    <i class="fas fa-check"></i>
                                                </button>
                                            ` : ''}
                                            ${club.status === 'suspended' ? `
                                                <button onclick="ClubsManager.reactivateClub(${club.id})" 
                                                        class="text-green-600 hover:text-green-800 transition-colors" title="Reactivate">
                                                    <i class="fas fa-play"></i>
                                                </button>
                                            ` : club.status === 'active' ? `
                                                <button onclick="ClubsManager.suspendClub(${club.id})" 
                                                        class="text-yellow-600 hover:text-yellow-800 transition-colors" title="Suspend">
                                                    <i class="fas fa-pause"></i>
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
        `;
    }

    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.getElementById('clubsPagination');
        if (!pagination) return;

        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

        pagination.innerHTML = `
            <div class="pagination-info">
                Showing ${startItem} to ${endItem} of ${totalItems} clubs
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
            <button onclick="ClubsManager.changePage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                buttons += `
                    <button onclick="ClubsManager.changePage(${i})" 
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
            <button onclick="ClubsManager.changePage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                Next
            </button>
        `;

        return buttons;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Static methods for club actions
    static changePage(page) {
        if (window.ClubsManager) {
            window.ClubsManager.currentPage = page;
            window.ClubsManager.renderClubsList();
        }
    }

    static showCreateModal() {
        if (window.app) {
            window.app.showModal(`
                <form onsubmit="ClubsManager.createClub(event)" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                            <input type="text" name="name" required class="form-input" placeholder="Enter club name">
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
                            <label class="block text-sm font-medium text-gray-700 mb-2">President Name</label>
                            <input type="text" name="president" required class="form-input" placeholder="Club president">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Faculty Advisor</label>
                            <input type="text" name="advisor" required class="form-input" placeholder="Faculty advisor">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" name="email" required class="form-input" placeholder="club@campushub.edu">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                            <input type="number" name="maxMembers" required class="form-input" placeholder="Maximum members">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Meeting Schedule</label>
                            <input type="text" name="meetingSchedule" required class="form-input" placeholder="e.g., Fridays 3:00 PM">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input type="text" name="location" required class="form-input" placeholder="Meeting location">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" rows="4" required class="form-input" placeholder="Club description and mission"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Activities (comma-separated)</label>
                        <input type="text" name="activities" class="form-input" placeholder="e.g., Workshops, Competitions, Events">
                    </div>
                    <div class="flex space-x-4">
                        <button type="button" onclick="app.closeModal()" class="btn-secondary flex-1">Cancel</button>
                        <button type="submit" class="btn-primary flex-1">Register Club</button>
                    </div>
                </form>
            `, { title: 'Register New Club', maxWidth: '800px' });
        }
    }

    static createClub(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const newClub = {
            id: Date.now(),
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            president: formData.get('president'),
            advisor: formData.get('advisor'),
            email: formData.get('email'),
            founded: new Date().toISOString().split('T')[0],
            members: 1, // President starts as first member
            maxMembers: parseInt(formData.get('maxMembers')),
            status: 'pending',
            image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400',
            activities: formData.get('activities').split(',').map(activity => activity.trim()).filter(activity => activity),
            meetingSchedule: formData.get('meetingSchedule'),
            location: formData.get('location'),
            budget: 0,
            expenses: 0,
            events: 0,
            rating: 0
        };

        if (window.ClubsManager) {
            window.ClubsManager.clubs.unshift(newClub);
            window.ClubsManager.renderClubsList();
        }

        if (window.app) {
            window.app.closeModal();
            window.app.showToast('Club registration submitted for approval!', 'success');
        }
    }

    static viewClub(clubId) {
        if (window.ClubsManager) {
            const club = window.ClubsManager.clubs.find(c => c.id === clubId);
            if (club && window.app) {
                window.app.showModal(`
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <img src="${club.image}" alt="${club.name}" class="h-24 w-24 rounded-lg object-cover">
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="text-xl font-bold text-gray-900">${club.name}</h3>
                                    <div class="flex items-center space-x-3">
                                        <span class="status-badge ${club.status}">${window.ClubsManager.capitalize(club.status)}</span>
                                        <div class="flex items-center text-yellow-500">
                                            <i class="fas fa-star mr-1"></i>
                                            <span>${club.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-gray-600 mb-4">${club.description}</p>
                                <div class="flex items-center space-x-4 text-sm text-gray-500">
                                    <span><i class="fas fa-tag mr-1"></i>${club.category}</span>
                                    <span><i class="fas fa-calendar mr-1"></i>Founded ${new Date(club.founded).getFullYear()}</span>
                                    <span><i class="fas fa-envelope mr-1"></i>${club.email}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-3">Leadership</h4>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">President:</span> ${club.president}</div>
                                    <div><span class="font-medium">Faculty Advisor:</span> ${club.advisor}</div>
                                    <div><span class="font-medium">Meeting:</span> ${club.meetingSchedule}</div>
                                    <div><span class="font-medium">Location:</span> ${club.location}</div>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-3">Statistics</h4>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">Members:</span> ${club.members} / ${club.maxMembers}</div>
                                    <div><span class="font-medium">Events Held:</span> ${club.events}</div>
                                    <div><span class="font-medium">Budget:</span> $${club.budget.toLocaleString()}</div>
                                    <div><span class="font-medium">Expenses:</span> $${club.expenses.toLocaleString()}</div>
                                </div>
                                <div class="mt-3">
                                    <div class="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Membership</span>
                                        <span>${Math.round((club.members / club.maxMembers) * 100)}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${(club.members / club.maxMembers) * 100}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        ${club.activities.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-3">Activities</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${club.activities.map(activity => `<span class="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">${activity}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="flex justify-end space-x-4">
                            <button onclick="app.closeModal()" class="btn-secondary">Close</button>
                            <button onclick="ClubsManager.editClub(${club.id}); app.closeModal();" class="btn-primary">Edit Club</button>
                        </div>
                    </div>
                `, { title: club.name, maxWidth: '700px' });
            }
        }
    }

    static editClub(clubId) {
        if (window.app) {
            window.app.showToast('Edit functionality coming soon!', 'info');
        }
    }

    static approveClub(clubId) {
        if (window.ClubsManager) {
            const club = window.ClubsManager.clubs.find(c => c.id === clubId);
            if (club) {
                club.status = 'active';
                window.ClubsManager.renderClubsList();
                
                if (window.app) {
                    window.app.showToast(`Club "${club.name}" approved successfully!`, 'success');
                }
            }
        }
    }

    static suspendClub(clubId) {
        if (window.ClubsManager) {
            const club = window.ClubsManager.clubs.find(c => c.id === clubId);
            if (club) {
                club.status = 'suspended';
                window.ClubsManager.renderClubsList();
                
                if (window.app) {
                    window.app.showToast(`Club "${club.name}" suspended.`, 'warning');
                }
            }
        }
    }

    static reactivateClub(clubId) {
        if (window.ClubsManager) {
            const club = window.ClubsManager.clubs.find(c => c.id === clubId);
            if (club) {
                club.status = 'active';
                window.ClubsManager.renderClubsList();
                
                if (window.app) {
                    window.app.showToast(`Club "${club.name}" reactivated!`, 'success');
                }
            }
        }
    }

    static exportClubs() {
        if (window.app) {
            window.app.showToast('Exporting clubs data...', 'info');
        }
    }
}

// Initialize Clubs Manager
window.ClubsManager = new ClubsManager();