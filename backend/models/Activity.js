const mongoose = require('mongoose');

// Records a volunteer's participation in a project activity.
// Used for: Volunteer dashboard, certificate generation, admin approval.
const ActivitySchema = new mongoose.Schema({
    // Logged-in volunteer
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    // Guest volunteer info
    volunteerName: { type: String, default: '' },
    volunteerEmail: { type: String, default: '' },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    role:             { type: String, default: '' },  // e.g. "Tree Planting Lead"
    hoursContributed: { type: Number, default: 0 },
    availability:     { type: String, default: '' },  // e.g. "Weekends", "Full-time"
    date:             { type: Date, default: Date.now },

    // Admin approves or rejects the volunteer's participation record
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    // Flipped to true once admin generates a certificate for this activity
    certificateGenerated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Activity', ActivitySchema);