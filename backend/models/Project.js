const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, required: true }, // e.g. "Reforestation", "Ocean Cleanup"
    location:    { type: String, default: '' },
    challenges:  { type: String, default: '' },
    outcomes:    { type: String, default: '' },

    // Images
    image:   { type: String, required: true }, // Main cover image URL
    gallery: [String],                          // Additional photo URLs

    // Funding
    goalAmount:    { type: Number, default: 0 },
    currentAmount: { type: Number, default: 0 },

    // Status label shown on Projects page
    status: {
        type: String,
        enum: ['Completed', 'Ongoing', 'Future'],
        default: 'Ongoing'
    },

    // Marks this as the headline project on Home page
    isRecent: { type: Boolean, default: false },

    // If true, show donation CTA on Home page for this project
    needsDonation: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);