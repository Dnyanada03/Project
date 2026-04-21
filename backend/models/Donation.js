const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    date: { type: Date, default: Date.now },
    receiptUrl: String,
    message: String,
});

module.exports = mongoose.model('Donation', DonationSchema);
