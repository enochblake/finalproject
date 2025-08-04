const Event = require('../models/Event');
const Club = require('../models/Club');

// Create event (Admin or Club Rep)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, clubId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    const event = await Event.create({
      title,
      description,
      date,
      club: clubId,
      createdBy: req.user._id
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('club', 'name')
      .populate('createdBy', 'name role');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get events by club
exports.getEventsByClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const events = await Event.find({ club: clubId })
      .populate('createdBy', 'name role');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events for club', error });
  }
};

// Delete event (Admin or Club Rep)
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// Update event (Admin or Club Rep)
exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, date } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};
// This code defines the event controller for creating, fetching, deleting, and updating events in a Node.js application using Express.js.
// It includes functionality for both administrators and club representatives to manage events, ensuring that only authorized users can perform certain actions.
// The controller interacts with the Event and Club models to perform database operations.