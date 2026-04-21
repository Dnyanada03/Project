const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: String,
    challenges: String,
    outcomes: String,
    image: { type: String, required: true }, // Main cover
    gallery: [String], // Additional photos
    goalAmount: { type: Number, default: 0 },
    currentAmount: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Completed', 'Ongoing', 'Future'], 
        default: 'Ongoing' 
    },
    isRecent: { type: Boolean, default: false }, // For Home Page headline
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
