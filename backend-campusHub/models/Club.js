const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Student who is the leader of the club
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Students who are members of the club
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Club', clubSchema);
// This code defines a Mongoose schema for a Club model in a Node.js application. It
