const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const Member = require('../models/Member');

// Get member by ID (for member portfolio/detail page)
router.get('/member/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all members (for About Us page)
router.get('/members', async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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
