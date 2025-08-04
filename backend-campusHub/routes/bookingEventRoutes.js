const express = require('express');
const router = express.Router();
const eventBookingController = require('../controllers/eventBookingController');
const { protect } = require('../middlewares/authMiddleware');  // Import the 'protect' middleware

// Protect the route so only logged-in users can book events
router.post('/:eventId/rsvp', protect, eventBookingController.bookEvent);

module.exports = router;
// This route allows users to RSVP for an event by providing the event ID in the URL.
// The 'protect' middleware ensures that only authenticated users can access this route.