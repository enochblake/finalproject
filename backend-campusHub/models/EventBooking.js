const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },  // Reference to the event
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const EventBooking = mongoose.model('EventBooking', eventBookingSchema);

module.exports = EventBooking;
