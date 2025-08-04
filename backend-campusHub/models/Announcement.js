const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
// This code defines a Mongoose schema for an Announcement model in a Node.js application.
// The schema includes fields for the title, message, date, associated club, and the user who created the announcement.
// It also sets up timestamps to automatically manage created and updated times for each announcement.