const express = require('express');
const { 
    register, 
    login,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUserAccount,
    getUserEvents,
    getUserClubs,
    getUserActivity,
    getUserStats
} = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware will be protected

// User profile routes
router.route('/me')
    .get(getUserProfile)          // GET /api/users/me - Get current user profile
    .put(updateUserProfile)       // PUT /api/users/me - Update profile
    .delete(deleteUserAccount);   // DELETE /api/users/me - Delete account

// Password management
router.post('/me/change-password', changePassword); // POST /api/users/me/change-password

// User data routes
router.get('/me/events', getUserEvents);      // GET /api/users/me/events - Get user's events
router.get('/me/clubs', getUserClubs);        // GET /api/users/me/clubs - Get user's clubs
router.get('/me/activity', getUserActivity);  // GET /api/users/me/activity - Get user activity
router.get('/me/stats', getUserStats);        // GET /api/users/me/stats - Get user statistics

// Admin-only routes
router.use(authorize('admin')); // All routes after this middleware will require admin role

// Admin user management routes could be added here
// router.get('/', getAllUsers);
// router.route('/:id')
//     .get(getUser)
//     .put(updateUser)
//     .delete(deleteUser);

module.exports = router;