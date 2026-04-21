const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes      = require('./routes/authRoutes');
const projectRoutes   = require('./routes/projectRoutes');
const donationRoutes  = require('./routes/donationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const advocacyRoutes = require('./routes/advocacyRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Database connection — DB name: Ecovation
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ecovation';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to Ecovation MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth',       authRoutes);
app.use('/api/projects',   projectRoutes);
app.use('/api/donations',  donationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/advocacy', advocacyRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Sustainability NGO Portal — Ecovation API is running...');
});

app.listen(PORT, () => {
    console.log(`🌍 Ecovation NGO Portal Server running on port ${PORT}`);
});