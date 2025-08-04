const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Club = require('../models/Club');
const Event = require('../models/Event');
const EventBooking = require('../models/EventBooking');
const Activity = require('../models/Activity');

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

// Helper function to create activity log
const createActivityLog = async (userId, type, message, details = null, relatedEntity = null) => {
    try {
        await Activity.create({
            user: userId,
            type,
            message,
            details: details || message,
            ...(relatedEntity && { 
                relatedEntity: relatedEntity.id,
                relatedEntityModel: relatedEntity.model
            })
        });
    } catch (error) {
        console.error('Activity log creation failed:', error);
    }
};

// User Registration
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, role, clubName, clubCode, terms } = req.body;

        // Validation
        if (!terms) {
            return res.status(400).json({ message: 'You must accept the terms and conditions' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Verify club code for club reps
        if (role === 'club-rep' && clubCode) {
            const club = await Club.findOne({ code: clubCode });
            if (!club) {
                return res.status(400).json({ message: 'Invalid club code' });
            }
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            role,
            ...(role === 'club-rep' && { clubName, clubCode }),
            termsAccepted: terms
        });

        // Add club rep to their club
        if (role === 'club-rep' && clubCode) {
            await Club.findOneAndUpdate(
                { code: clubCode },
                { $addToSet: { members: user._id } }
            );
        }

        // Create welcome activity
        await createActivityLog(
            user._id,
            'system',
            'Welcome to CampusHub!',
            'Your account has been successfully created'
        );

        res.status(201).json({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Update last login time
        user.lastActive = Date.now();
        await user.save();

        res.json({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -__v')
            .populate('clubsJoined', 'name description');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get user statistics
        const [eventsAttended, clubsJoined] = await Promise.all([
            EventBooking.countDocuments({ user: user._id }),
            Club.countDocuments({ members: user._id })
        ]);

        res.json({
            user: {
                ...user.toObject(),
                name: `${user.firstName} ${user.lastName}`
            },
            stats: { eventsAttended, clubsJoined }
        });

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ 
            message: 'Error fetching profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { firstName, lastName, email, phone },
            { new: true, runValidators: true }
        ).select('-password');

        await createActivityLog(
            user._id,
            'profile',
            'Profile updated',
            'Your profile information has been updated'
        );

        res.json({
            ...user.toObject(),
            name: `${user.firstName} ${user.lastName}`
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: 'Error updating profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        await createActivityLog(
            user._id,
            'security',
            'Password changed',
            'Your password has been updated successfully'
        );

        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ 
            message: 'Error changing password',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Delete User Account
exports.deleteUserAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Perform cleanup in parallel
        await Promise.all([
            Club.updateMany(
                { members: user._id },
                { $pull: { members: user._id } }
            ),
            EventBooking.deleteMany({ user: user._id }),
            Activity.deleteMany({ user: user._id })
        ]);

        await User.findByIdAndDelete(req.user._id);

        res.json({ message: 'Account deleted successfully' });

    } catch (error) {
        console.error('Account deletion error:', error);
        res.status(500).json({ 
            message: 'Error deleting account',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get User Events
exports.getUserEvents = async (req, res) => {
    try {
        const events = await EventBooking.find({ user: req.user._id })
            .populate({
                path: 'event',
                populate: {
                    path: 'club',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 });

        res.json(events);

    } catch (error) {
        console.error('Events fetch error:', error);
        res.status(500).json({ 
            message: 'Error fetching events',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get User Clubs
exports.getUserClubs = async (req, res) => {
    try {
        const clubs = await Club.find({ members: req.user._id })
            .select('name description leader members')
            .populate('leader', 'firstName lastName')
            .populate('members', 'firstName lastName');

        res.json(clubs);

    } catch (error) {
        console.error('Clubs fetch error:', error);
        res.status(500).json({ 
            message: 'Error fetching clubs',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get User Activity
exports.getUserActivity = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(activities);

    } catch (error) {
        console.error('Activity fetch error:', error);
        res.status(500).json({ 
            message: 'Error fetching activity',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get User Statistics
exports.getUserStats = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const [eventsAttended, clubsJoined, eventsCreated] = await Promise.all([
            EventBooking.countDocuments({ user: user._id }),
            Club.countDocuments({ members: user._id }),
            Event.countDocuments({ organizer: user._id })
        ]);

        res.json({
            eventsAttended,
            clubsJoined,
            eventsCreated,
            lastActive: user.lastActive,
            accountCreated: user.createdAt
        });

    } catch (error) {
        console.error('Stats fetch error:', error);
        res.status(500).json({ 
            message: 'Error fetching statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};