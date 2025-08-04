const mongoose = require('mongoose');
const EventBooking = require('../models/EventBooking');
const Event = require('../models/Event');
const nodemailer = require('nodemailer');

// Validate if eventId is a valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Send confirmation email
const sendConfirmationEmail = async (email, name, eventTitle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Event RSVP Confirmation: ${eventTitle}`,
    text: `Hello ${name},\n\nThank you for booking the event: ${eventTitle}.\nWe look forward to seeing you there!\n\nBest regards,\nCampus Hub Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Book event (RSVP)
exports.bookEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, email } = req.body;

    // Check if the eventId is a valid ObjectId
    if (!isValidObjectId(eventId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Create the booking
    const booking = await EventBooking.create({
      user: req.user._id, // User from auth middleware
      event: eventId,
      name,
      email,
    });

    // Send the confirmation email
    await sendConfirmationEmail(email, name, event.title);

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking event', error });
  }
};
// This function handles the booking of an event by a user. It checks if the event ID is valid, verifies the existence of the event, creates a booking record