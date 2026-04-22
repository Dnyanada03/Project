const express = require('express');
const router = express.Router();
const Advocacy = require('../models/Advocacy');

// GET all advocacy news
router.get('/', async (req, res) => {
  try {
    const advocacy = await Advocacy.find().sort({ publishedAt: -1 });
    res.json(advocacy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
