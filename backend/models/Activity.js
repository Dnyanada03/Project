const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    role: String,
    hoursContributed: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    certificateGenerated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Activity', ActivitySchema);
