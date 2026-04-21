const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    // ── LOGGED-IN DONOR (optional) ────────────────────────────
    // Filled only if the person donating has a Donor account
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null    // null = guest donation
    },

    // ── GUEST DONOR INFO ──────────────────────────────────────
    // Filled when someone donates without logging in
    guestName:  { type: String, default: '' },   // e.g. "Amit Shah"
    guestEmail: { type: String, default: '' },   // for sending receipt to guest

    // ── DONATION DETAILS ──────────────────────────────────────
    // Donation can be tied to a specific project or be a general contribution
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    },

    amount:     { type: Number, required: true },
    currency:   { type: String, default: 'INR' },
    date:       { type: Date, default: Date.now },

    receiptUrl: { type: String, default: '' },   // URL to downloadable PDF receipt
    message:    { type: String, default: '' }    // Optional note from donor
});

module.exports = mongoose.model('Donation', DonationSchema);