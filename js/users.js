// Users Manager
class UsersManager {
    constructor() {
        this.users = [
            {
                id: 1,
                name: 'Sarah Johnson',
                email: 'sarah.johnson@campushub.edu',
                role: 'admin',
                department: 'Computer Science',
                status: 'active',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                joinDate: '2020-01-15',
                lastLogin: '2024-01-20T10:30:00Z',
                clubMemberships: ['Computer Science Club', 'Photography Society'],
                eventsAttended: 23,
                permissions: ['all']
            },
            {
                id: 2,
                name: 'John Smith',
                email: 'john.smith@campushub.edu',
                role: 'student',
                department: 'Physics',
                status: 'active',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                joinDate: '2021-09-01',
                lastLogin: '2024-01-19T15:45:00Z',
                clubMemberships: ['Science Club', 'Debate Club'],
                eventsAttended: 15,
                permissions: ['view', 'join_clubs', 'register_events']
            },
            {
                id: 3,
                name: 'Emily Davis',
                email: 'emily.davis@campushub.edu',
                role: 'faculty',
                department: 'Mathematics',
                status: 'active',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                joinDate: '2019-08-20',
                lastLogin: '2024-01-18T09:15:00Z',
                clubMemberships: ['Math Club'],
                eventsAttended: 8,
                permissions: ['view', 'create_events', 'manage_clubs']
            },
            {
                id: 4,
                name: 'Michael Brown',
                email: 'michael.brown@campushub.edu',
                role: 'student',
                department: 'Art',
                status: 'suspended',
                avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
                joinDate: '2022-01-10',
                lastLogin: '2024-01-10T14:20:00Z',
                clubMemberships: ['Art Club'],
                eventsAttended: 5,
                permissions: ['view']
            },
            {
                id: 5,
                name: 'Lisa Wilson',
                email: 'lisa.wilson@campushub.edu',
                role: 'moderator',
                department: 'English',
                status: 'active',
                avatar: 'https://randomuser.me/api/portraits/women/95.jpg',
                joinDate: '2020-03-15',
                lastLogin: '2024-01-20T11:30:00Z',
                clubMemberships: ['Debate Club', 'Literature Society'],
                eventsAttended: 18,
                permissions: ['view', 'moderate_chat', 'manage_events']
            }
        ];

        this.filters = {
            role: 'all',
            status: 'all',
            department: 'all',
            search: ''
        };

        this.currentPage = 1;
        this.itemsPerPage = 15;
        this.selectedUsers = [];
    }

    render(container) {
        container.innerHTML = this.getHTML();
        this.setupEventListeners();
        this.renderUsersList();
    }

    getHTML() {
        return `
            <div class="fade-in">
                <!-- Header with Actions -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
                        <p class="text-gray-600">Manage user accounts, roles, and permissions</p>
                    </div>
                    <div class="flex space-x-3 mt-4 sm:mt-0">
                        <button onclick="UsersManager.exportUsers()" class="btn-secondary">
                            <i class="fas fa-download mr-2"></i>Export
                        </button>
                        <button onclick="UsersManager.showCreateModal()" class="btn-primary">
                            <i class="fas fa-user-plus mr-2"></i>Add User
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
                            <input type="text" id="userSearch" placeholder="Search users..." class="search-input">
                            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <select id="roleFilter" class="filter-select">
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="faculty">Faculty</option>
                            <option value="student">Student</option>
                        </select>
                        <select id="statusFilter" class="filter-select">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select id="departmentFilter" class="filter-select">
                            <option value="all">All Departments</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Physics">Physics</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Art">Art</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>

                <!-- Users Table -->
                <div class="card rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">Users List</h3>
                            <div class="flex items-center space-x-3">
                                <div class="flex items-center space-x-2" id="bulkActions" style="display: none;">
                                    <span class="text-sm text-gray-600" id="selectedCount">0 selected</span>
                                    <button onclick="UsersManager.bulkActivate()" class="btn-success text-sm">Activate</button>
                                    <button onclick="UsersManager.bulkSuspend()" class="btn-danger text-sm">Suspend</button>
                                </div>
                                <select id="itemsPerPage" class="filter-select text-sm">
                                    <option value="15">15 per page</option>
                                    <option value="30">30 per page</option>
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
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Activity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="usersTableBody">
                                <!-- Users will be rendered here -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="pagination" id="usersPagination">
                        <!-- Pagination will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    getStatsHTML() {
        const totalUsers = this.users.length;
        const activeUsers = this.users.filter(u => u.status === 'active').length;
        const adminUsers = this.users.filter(u => u.role === 'admin').length;
        const studentUsers = this.users.filter(u => u.role === 'student').length;

        return `
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-blue-100 text-sm">Total Users</p>
                        <h3 class="text-3xl font-bold">${totalUsers}</h3>
                    </div>
                    <i class="fas fa-users text-2xl text-blue-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-green-100 text-sm">Active Users</p>
                        <h3 class="text-3xl font-bold">${activeUsers}</h3>
                    </div>
                    <i class="fas fa-user-check text-2xl text-green-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-purple-100 text-sm">Administrators</p>
                        <h3 class="text-3xl font-bold">${adminUsers}</h3>
                    </div>
                    <i class="fas fa-user-shield text-2xl text-purple-200"></i>
                </div>
            </div>
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-orange-100 text-sm">Students</p>
                        <h3 class="text-3xl font-bold">${studentUsers}</h3>
                    </div>
                    <i class="fas fa-user-graduate text-2xl text-orange-200"></i>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('userSearch');
        searchInput?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Filters
        ['roleFilter', 'statusFilter', 'departmentFilter'].forEach(filterId => {
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
            this.renderUsersList();
        });

        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        selectAllCheckbox?.addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });
    }

    applyFilters() {
        this.currentPage = 1;
        this.renderUsersList();
    }

    getFilteredUsers() {
        return this.users.filter(user => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const matchesSearch = 
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.department.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // Role filter
            if (this.filters.role !== 'all' && user.role !== this.filters.role) {
                return false;
            }

            // Status filter
            if (this.filters.status !== 'all' && user.status !== this.filters.status) {
                return false;
            }

            // Department filter
            if (this.filters.department !== 'all' && user.department !== this.filters.department) {
                return false;
            }

            return true;
        });
    }

    renderUsersList() {
        const filteredUsers = this.getFilteredUsers();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        tbody.innerHTML = paginatedUsers.map(user => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td>
                    <input type="checkbox" class="user-checkbox rounded border-gray-300" 
                           value="${user.id}" onchange="UsersManager.toggleUserSelection(${user.id})">
                </td>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="relative">
                            <img src="${user.avatar}" alt="${user.name}" class="h-10 w-10 rounded-full">
                            <div class="absolute -bottom-1 -right-1 w-4 h-4 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">${user.name}</div>
                            <div class="text-sm text-gray-500">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${this.getRoleBadgeClass(user.role)}">
                        <i class="${this.getRoleIcon(user.role)} mr-1"></i>
                        ${this.capitalize(user.role)}
                    </span>
                </td>
                <td>
                    <div class="text-gray-900">${user.department}</div>
                </td>
                <td>
                    <span class="status-badge ${user.status}">${this.capitalize(user.status)}</span>
                </td>
                <td>
                    <div class="text-gray-900">${this.formatDate(user.lastLogin)}</div>
                    <div class="text-sm text-gray-500">${this.getTimeAgo(user.lastLogin)}</div>
                </td>
                <td>
                    <div class="text-sm">
                        <div class="text-gray-900">${user.clubMemberships.length} clubs</div>
                        <div class="text-gray-500">${user.eventsAttended} events</div>
                    </div>
                </td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button onclick="UsersManager.viewUser(${user.id})" 
                                class="text-indigo-600 hover:text-indigo-800 transition-colors" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="UsersManager.editUser(${user.id})" 
                                class="text-green-600 hover:text-green-800 transition-colors" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${user.status === 'suspended' ? `
                            <button onclick="UsersManager.activateUser(${user.id})" 
                                    class="text-blue-600 hover:text-blue-800 transition-colors" title="Activate">
                                <i class="fas fa-user-check"></i>
                            </button>
                        ` : user.status === 'active' ? `
                            <button onclick="UsersManager.suspendUser(${user.id})" 
                                    class="text-yellow-600 hover:text-yellow-800 transition-colors" title="Suspend">
                                <i class="fas fa-user-lock"></i>
                            </button>
                        ` : ''}
                        ${user.role !== 'admin' ? `
                            <button onclick="UsersManager.deleteUser(${user.id})" 
                                    class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');

        this.renderPagination(filteredUsers.length);
    }

    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const pagination = document.getElementById('usersPagination');
        if (!pagination) return;

        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

        pagination.innerHTML = `
            <div class="pagination-info">
                Showing ${startItem} to ${endItem} of ${totalItems} users
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
            <button onclick="UsersManager.changePage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                buttons += `
                    <button onclick="UsersManager.changePage(${i})" 
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
            <button onclick="UsersManager.changePage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''} 
                    class="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                Next
            </button>
        `;

        return buttons;
    }

    // Helper methods
    getRoleBadgeClass(role) {
        const classes = {
            admin: 'bg-red-100 text-red-800',
            moderator: 'bg-purple-100 text-purple-800',
            faculty: 'bg-blue-100 text-blue-800',
            student: 'bg-green-100 text-green-800'
        };
        return classes[role] || 'bg-gray-100 text-gray-800';
    }

    getRoleIcon(role) {
        const icons = {
            admin: 'fas fa-user-shield',
            moderator: 'fas fa-user-cog',
            faculty: 'fas fa-chalkboard-teacher',
            student: 'fas fa-user-graduate'
        };
        return icons[role] || 'fas fa-user';
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        }
    }

    toggleSelectAll(checked) {
        const checkboxes = document.querySelectorAll('.user-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            const userId = parseInt(checkbox.value);
            if (checked && !this.selectedUsers.includes(userId)) {
                this.selectedUsers.push(userId);
            } else if (!checked) {
                const index = this.selectedUsers.indexOf(userId);
                if (index > -1) {
                    this.selectedUsers.splice(index, 1);
                }
            }
        });

        this.updateBulkActions();
    }

    updateBulkActions() {
        const bulkActions = document.getElementById('bulkActions');
        const selectedCount = document.getElementById('selectedCount');
        
        if (bulkActions && selectedCount) {
            if (this.selectedUsers.length > 0) {
                bulkActions.style.display = 'flex';
                selectedCount.textContent = `${this.selectedUsers.length} selected`;
            } else {
                bulkActions.style.display = 'none';
            }
        }
    }

    // Static methods for user actions
    static changePage(page) {
        if (window.UsersManager) {
            window.UsersManager.currentPage = page;
            window.UsersManager.renderUsersList();
        }
    }

    static toggleUserSelection(userId) {
        if (!window.UsersManager) return;

        const index = window.UsersManager.selectedUsers.indexOf(userId);
        if (index > -1) {
            window.UsersManager.selectedUsers.splice(index, 1);
        } else {
            window.UsersManager.selectedUsers.push(userId);
        }

        window.UsersManager.updateBulkActions();
    }

    static showCreateModal() {
        if (window.app) {
            window.app.showModal(`
                <form onsubmit="UsersManager.createUser(event)" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input type="text" name="name" required class="form-input" placeholder="Enter full name">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" name="email" required class="form-input" placeholder="user@campushub.edu">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select name="role" required class="form-input">
                                <option value="">Select role</option>
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <select name="department" required class="form-input">
                                <option value="">Select department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Physics">Physics</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Art">Art</option>
                                <option value="English">English</option>
                                <option value="Business">Business</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions" value="view" checked class="rounded border-gray-300 mr-2">
                                <span class="text-sm">View content</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions" value="join_clubs" class="rounded border-gray-300 mr-2">
                                <span class="text-sm">Join clubs</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions" value="register_events" class="rounded border-gray-300 mr-2">
                                <span class="text-sm">Register for events</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions" value="create_events" class="rounded border-gray-300 mr-2">
                                <span class="text-sm">Create events</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions" value="manage_clubs" class="rounded border-gray-300 mr-2">
                                <span class="text-sm">Manage clubs</span>
                            </label>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button type="button" onclick="app.closeModal()" class="btn-secondary flex-1">Cancel</button>
                        <button type="submit" class="btn-primary flex-1">Add User</button>
                    </div>
                </form>
            `, { title: 'Add New User', maxWidth: '600px' });
        }
    }

    static createUser(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const permissions = formData.getAll('permissions');
        
        const newUser = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            department: formData.get('department'),
            status: 'active',
            avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
            joinDate: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString(),
            clubMemberships: [],
            eventsAttended: 0,
            permissions: permissions
        };

        if (window.UsersManager) {
            window.UsersManager.users.unshift(newUser);
            window.UsersManager.renderUsersList();
        }

        if (window.app) {
            window.app.closeModal();
            window.app.showToast('User added successfully!', 'success');
        }
    }

    static viewUser(userId) {
        if (window.UsersManager) {
            const user = window.UsersManager.users.find(u => u.id === userId);
            if (user && window.app) {
                window.app.showModal(`
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div class="relative">
                                <img src="${user.avatar}" alt="${user.name}" class="h-20 w-20 rounded-full">
                                <div class="absolute -bottom-1 -right-1 w-6 h-6 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white"></div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="text-xl font-bold text-gray-900">${user.name}</h3>
                                    <div class="flex items-center space-x-2">
                                        <span class="status-badge ${user.status}">${window.UsersManager.capitalize(user.status)}</span>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${window.UsersManager.getRoleBadgeClass(user.role)}">
                                            <i class="${window.UsersManager.getRoleIcon(user.role)} mr-1"></i>
                                            ${window.UsersManager.capitalize(user.role)}
                                        </span>
                                    </div>
                                </div>
                                <p class="text-gray-600 mb-2">${user.email}</p>
                                <div class="flex items-center space-x-4 text-sm text-gray-500">
                                    <span><i class="fas fa-building mr-1"></i>${user.department}</span>
                                    <span><i class="fas fa-calendar mr-1"></i>Joined ${window.UsersManager.formatDate(user.joinDate)}</span>
                                    <span><i class="fas fa-clock mr-1"></i>Last login ${window.UsersManager.getTimeAgo(user.lastLogin)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-3">Activity</h4>
                                <div class="space-y-2 text-sm">
                                    <div><span class="font-medium">Club Memberships:</span> ${user.clubMemberships.length}</div>
                                    <div><span class="font-medium">Events Attended:</span> ${user.eventsAttended}</div>
                                    <div><span class="font-medium">Account Status:</span> ${window.UsersManager.capitalize(user.status)}</div>
                                </div>
                                ${user.clubMemberships.length > 0 ? `
                                    <div class="mt-3">
                                        <span class="font-medium text-gray-800 text-sm">Clubs:</span>
                                        <div class="flex flex-wrap gap-1 mt-1">
                                            ${user.clubMemberships.map(club => `<span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">${club}</span>`).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-3">Permissions</h4>
                                <div class="space-y-1">
                                    ${user.permissions.map(permission => `
                                        <div class="flex items-center text-sm">
                                            <i class="fas fa-check text-green-600 mr-2"></i>
                                            <span>${permission.replace('_', ' ')}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-4">
                            <button onclick="app.closeModal()" class="btn-secondary">Close</button>
                            <button onclick="UsersManager.editUser(${user.id}); app.closeModal();" class="btn-primary">Edit User</button>
                        </div>
                    </div>
                `, { title: `${user.name} - User Details`, maxWidth: '700px' });
            }
        }
    }

    static editUser(userId) {
        if (window.app) {
            window.app.showToast('Edit functionality coming soon!', 'info');
        }
    }

    static activateUser(userId) {
        if (window.UsersManager) {
            const user = window.UsersManager.users.find(u => u.id === userId);
            if (user) {
                user.status = 'active';
                window.UsersManager.renderUsersList();
                
                if (window.app) {
                    window.app.showToast(`User "${user.name}" activated successfully!`, 'success');
                }
            }
        }
    }

    static suspendUser(userId) {
        if (window.UsersManager) {
            const user = window.UsersManager.users.find(u => u.id === userId);
            if (user) {
                user.status = 'suspended';
                window.UsersManager.renderUsersList();
                
                if (window.app) {
                    window.app.showToast(`User "${user.name}" suspended.`, 'warning');
                }
            }
        }
    }

    static deleteUser(userId) {
        if (window.UsersManager && window.app) {
            const user = window.UsersManager.users.find(u => u.id === userId);
            if (user) {
                if (confirm(`Are you sure you want to delete "${user.name}"? This action cannot be undone.`)) {
                    const index = window.UsersManager.users.findIndex(u => u.id === userId);
                    window.UsersManager.users.splice(index, 1);
                    window.UsersManager.renderUsersList();
                    window.app.showToast(`User "${user.name}" deleted successfully.`, 'success');
                }
            }
        }
    }

    static bulkActivate() {
        if (window.UsersManager && window.UsersManager.selectedUsers.length > 0) {
            window.UsersManager.selectedUsers.forEach(userId => {
                UsersManager.activateUser(userId);
            });
            window.UsersManager.selectedUsers = [];
            window.UsersManager.updateBulkActions();
        }
    }

    static bulkSuspend() {
        if (window.UsersManager && window.UsersManager.selectedUsers.length > 0) {
            window.UsersManager.selectedUsers.forEach(userId => {
                UsersManager.suspendUser(userId);
            });
            window.UsersManager.selectedUsers = [];
            window.UsersManager.updateBulkActions();
        }
    }

    static exportUsers() {
        if (window.app) {
            window.app.showToast('Exporting users data...', 'info');
        }
    }
}

// Initialize Users Manager
window.UsersManager = new UsersManager();