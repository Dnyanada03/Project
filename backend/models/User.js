const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Volunteer', 'Donor'], 
        required: true 
    },
    // Portfolio for Team/Volunteer
    designation: String, // e.g. "Senior Scientist", "Marketing Head"
    bio: String,
    photo: String,
    portfolio: [{
        projectName: String,
        description: String,
        year: String
    }],
    impactPoints: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
