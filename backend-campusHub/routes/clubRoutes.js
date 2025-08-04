const express = require('express');
const {
  createClub,
  assignClubLeader,
  joinClub,
  leaveClub,
  getAllClubs,
  getUserClubs
} = require('../controllers/clubController');

const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin only
router.post('/create', protect, authorize('admin'), createClub);
router.post('/assign-leader', protect, authorize('admin'), assignClubLeader);

// Student & Club-Rep
router.post('/join', protect, authorize('student', 'club-rep'), joinClub);
router.post('/leave', protect, authorize('student', 'club-rep'), leaveClub);

// Public or authenticated
router.get('/', protect, getAllClubs);
router.get('/my-clubs', protect, getUserClubs);

module.exports = router;