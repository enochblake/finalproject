// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'system',       // System-generated notifications
            'profile',     // Profile changes
            'event',       // Event-related actions
            'club',        // Club-related actions
            'security',    // Security-related actions (password changes)
            'achievement'  // Badges or achievements earned
        ],
        default: 'system'
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        trim: true
    },
    relatedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'relatedEntityModel'
    },
    relatedEntityModel: {
        type: String,
        enum: ['Event', 'Club', 'User', 'EventBooking']
    },
    metadata: {
        type: Object,
        default: {}
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for faster querying
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ type: 1, createdAt: -1 });

// Middleware to format the activity before saving
activitySchema.pre('save', function(next) {
    if (this.isNew) {
        // You can add any preprocessing here
        if (!this.details) {
            this.details = this.message;
        }
    }
    next();
});

// Static methods
activitySchema.statics.createSystemActivity = async function(userId, message, details = null) {
    return this.create({
        user: userId,
        type: 'system',
        message,
        details: details || message
    });
};

// Instance methods
activitySchema.methods.markAsRead = async function() {
    this.read = true;
    return this.save();
};

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;