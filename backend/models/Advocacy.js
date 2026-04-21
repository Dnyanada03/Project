const mongoose = require('mongoose');

const AdvocacySchema = new mongoose.Schema({
    headline: { type: String, required: true },
    source: String, // e.g. "UN Environment Programme"
    summary: String,
    url: String,
    publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Advocacy', AdvocacySchema);
