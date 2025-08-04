const Announcement = require('../models/Announcement');
const Club = require('../models/Club');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, clubId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    const announcement = await Announcement.create({
      title,
      message,
      club: clubId,
      createdBy: req.user._id
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('club', 'name')
      .populate('createdBy', 'name role');

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error });
  }
};

exports.getAnnouncementsByClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const announcements = await Announcement.find({ club: clubId })
      .populate('createdBy', 'name role');

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements for club', error });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, message } = req.body;

    const announcement = await Announcement.findById(announcementId).populate('createdBy', 'name role');
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    if (
      announcement.createdBy._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this announcement' });
    }

    announcement.title = title || announcement.title;
    announcement.message = message || announcement.message;

    await announcement.save();
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Error updating announcement', error });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    if (
      announcement.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this announcement' });
    }

    await announcement.remove();
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement', error });
  }
};
// This code defines the announcement controller for creating, fetching, updating, and deleting announcements in a Node.js application using Express.js.
// It includes functionality for both administrators and club representatives to manage announcements, ensuring that only authorized users can perform certain actions.
// The controller interacts with the Announcement and Club models to perform database operations.