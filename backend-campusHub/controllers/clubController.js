const Club = require('../models/Club');
const User = require('../models/User');

// Admin creates a new club
exports.createClub = async (req, res) => {
  try {
    const { name, description } = req.body;

    const clubExists = await Club.findOne({ name });
    if (clubExists) return res.status(400).json({ message: 'Club already exists' });

    const club = await Club.create({
      name,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: 'Error creating club', error });
  }
};

// Admin assigns a student as a club leader (club-rep)
exports.assignClubLeader = async (req, res) => {
  try {
    const { clubId, studentId } = req.body;

    const user = await User.findById(studentId);
    if (!user || user.role !== 'student') {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Promote student to club-rep
    user.role = 'club-rep';
    await user.save();

    const club = await Club.findByIdAndUpdate(
      clubId,
      { leader: studentId },
      { new: true }
    ).populate('leader', 'name email');

    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning leader', error });
  }
};

// Student joins a club
exports.joinClub = async (req, res) => {
  try {
    const { clubId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    // Add student to club if not already a member
    if (!club.members.includes(req.user._id)) {
      club.members.push(req.user._id);
      await club.save();

      // Add club to user's profile
      req.user.clubsJoined.push(club._id);
      await req.user.save();
    }

    res.json({ message: 'Joined club successfully', club });
  } catch (error) {
    res.status(500).json({ message: 'Error joining club', error });
  }
};

// Student leaves a club
exports.leaveClub = async (req, res) => {
  try {
    const { clubId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    // Check if user is the leader of the club
    if (club.leader && club.leader.equals(req.user._id)) {
      return res.status(400).json({ message: 'Club leader cannot leave. Please assign a new leader first.' });
    }

    // Remove student from club if they are a member
    if (club.members.includes(req.user._id)) {
      club.members.pull(req.user._id);
      await club.save();

      // Remove club from user's profile
      req.user.clubsJoined.pull(club._id);
      await req.user.save();
    } else {
      return res.status(400).json({ message: 'You are not a member of this club' });
    }

    res.json({ message: 'Left club successfully', club });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving club', error });
  }
};

// Get all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('leader', 'name email');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error });
  }
};

// Get clubs by user
exports.getUserClubs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('clubsJoined');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.clubsJoined);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user clubs', error });
  }
};