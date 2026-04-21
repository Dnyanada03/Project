const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get donor's history
router.get('/history/:donorId', async (req, res) => {
    try {
        const history = await Donation.find({ donorId: req.params.donorId }).populate('projectId', 'title');
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a donation
router.post('/', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        const newDonation = await donation.save();
        res.status(201).json(newDonation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
