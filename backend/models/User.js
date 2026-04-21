const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['Admin', 'Volunteer', 'Donor'], required: true },

    // Common profile fields
    photo:       { type: String, default: '' },
    designation: { type: String, default: '' }, // e.g. "Field Coordinator"
    bio:         { type: String, default: '' },

    // Volunteer-specific
    interests:    [String],                      // e.g. ["Reforestation", "Ocean Cleanup"]
    availability: { type: String, default: '' }, // e.g. "Weekends", "Full-time"

    // NGO portfolio (shown on individual volunteer / team profile page)
    portfolio: [{
        projectName: { type: String },
        description:  { type: String },
        year:         { type: String }
    }],

    impactPoints: { type: Number, default: 0 },
    createdAt:    { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare plain password with hashed
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);