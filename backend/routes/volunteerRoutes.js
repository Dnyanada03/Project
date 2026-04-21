const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Get volunteer's activities
router.get('/activities/:volunteerId', async (req, res) => {
    try {
        const activities = await Activity.find({ volunteerId: req.params.volunteerId }).populate('projectId', 'title');
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Apply for a project activity
router.post('/apply', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
