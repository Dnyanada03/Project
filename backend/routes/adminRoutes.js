const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Member = require('../models/Member');
const Activity = require('../models/Activity');
const Donation = require('../models/Donation');

// ─────────────────────────────────────────────────────────
// PROJECT MANAGEMENT
// ─────────────────────────────────────────────────────────

// Create a new project
router.post('/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a project
router.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// MEMBER MANAGEMENT
// ─────────────────────────────────────────────────────────

// Create a new member
router.post('/members', async (req, res) => {
    try {
        const member = new Member(req.body);
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a member
router.put('/members/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json(member);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a member
router.delete('/members/:id', async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
        res.json({ message: 'Member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// VOLUNTEER APPLICATION MANAGEMENT
// ─────────────────────────────────────────────────────────

// Get all pending volunteer applications
router.get('/applications', async (req, res) => {
    try {
        const applications = await Activity.find({ status: 'Pending' })
            .populate('volunteerId', 'name email designation')
            .populate('projectId', 'title');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all applications (any status)
router.get('/applications/all', async (req, res) => {
    try {
        const applications = await Activity.find()
            .populate('volunteerId', 'name email designation')
            .populate('projectId', 'title')
            .sort({ date: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve a volunteer application
router.put('/applications/:id/approve', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
            { status: 'Approved' },
            { new: true }
        ).populate('volunteerId', 'name email').populate('projectId', 'title');
        
        if (!activity) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application approved', activity });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reject a volunteer application
router.put('/applications/:id/reject', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
            { status: 'Rejected' },
            { new: true }
        ).populate('volunteerId', 'name email').populate('projectId', 'title');
        
        if (!activity) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application rejected', activity });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// DONATIONS MANAGEMENT
// ─────────────────────────────────────────────────────────

// Get all donations
router.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate('donorId', 'name email')
            .populate('projectId', 'title')
            .sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get donation stats
router.get('/donations/stats', async (req, res) => {
    try {
        const totalDonations = await Donation.countDocuments();
        const totalAmount = await Donation.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const byProject = await Donation.aggregate([
            { $group: { _id: '$projectId', total: { $sum: '$amount', count: { $sum: 1 } } } },
            { $lookup: { from: 'projects', localField: '_id', foreignField: '_id', as: 'project' } }
        ]);
        
        res.json({
            totalDonations,
            totalAmount: totalAmount[0]?.total || 0,
            byProject
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
