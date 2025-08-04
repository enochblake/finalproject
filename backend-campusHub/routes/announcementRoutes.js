const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { protect } = require('../middlewares/authMiddleware');

// Protected routes
router.post('/', protect, announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.get('/club/:clubId', announcementController.getAnnouncementsByClub);
router.put('/:announcementId', protect, announcementController.updateAnnouncement);
router.delete('/:announcementId', protect, announcementController.deleteAnnouncement);

module.exports = router;
// This code defines the announcement routes for creating, fetching, updating, and deleting announcements in a Node.js application using Express.js.
// It includes middleware for authentication to ensure that only authorized users can perform certain actions.