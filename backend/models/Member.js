const mongoose = require('mongoose');

// Stores information for the About Us page.
// Covers: NGO team members, volunteers display, partner organizations, awards.
const MemberSchema = new mongoose.Schema({

    // ── TEAM MEMBER / VOLUNTEER ───────────────────────────────
    name:        { type: String, required: true, trim: true },
    photo:       { type: String, default: '' },       // Profile photo URL
    designation: { type: String, default: '' },       // e.g. "Senior Scientist"
    bio:         { type: String, default: '' },

    // Controls which section of About Us this record appears in
    type: {
        type: String,
        enum: ['TeamMember', 'Volunteer', 'Partner', 'Award'],
        required: true
    },

    // ── PORTFOLIO (for TeamMember and Volunteer) ──────────────
    // Shown when visitor clicks on a team member / volunteer
    portfolio: [{
        projectName: { type: String },
        description:  { type: String },
        year:         { type: String }
    }],

    // ── PARTNER (for type = 'Partner') ────────────────────────
    organizationName: { type: String, default: '' },  // e.g. "WWF India"
    partnerLogo:      { type: String, default: '' },  // Logo URL
    partnerWebsite:   { type: String, default: '' },

    // ── AWARD (for type = 'Award') ────────────────────────────
    awardTitle:       { type: String, default: '' },  // e.g. "Best NGO 2023"
    awardedBy:        { type: String, default: '' },  // e.g. "Ministry of Environment"
    awardYear:        { type: String, default: '' },
    awardDescription: { type: String, default: '' },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);