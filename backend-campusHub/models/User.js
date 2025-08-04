const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'club-rep'],
        default: 'student',
    },
    password: {
        type: String,
        required: true,
    },
    clubsJoined: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
    }],
    clubName: {
        type: String,
    },
    clubCode: {
        type: String,
    },
    termsAccepted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

// hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);