const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventsByClub,
  deleteEvent,
  updateEvent
} = require('../controllers/eventController');

const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create event (admin or club-rep)
router.post('/create', protect, authorize('admin', 'club-rep'), createEvent);

// Get all events
router.get('/', protect, getAllEvents);

// Get events for a specific club
router.get('/club/:clubId', protect, getEventsByClub);

// Delete event (admin or creator only)
router.delete('/:eventId', protect, authorize('admin', 'club-rep'), deleteEvent);

// Update event (admin or creator only)
router.put('/:eventId', protect, authorize('admin', 'club-rep'), updateEvent);

module.exports = router;
// This code defines the event routes for creating, fetching, deleting, and updating events in a Node.js application using Express.js.
// It includes middleware for authentication and authorization to ensure that only authorized users can perform certain actions.