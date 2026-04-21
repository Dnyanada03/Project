const mongoose = require('mongoose');
const Project = require('./models/Project');
const Advocacy = require('./models/Advocacy');
const User = require('./models/User');

const seedData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/eco_vacation');
        console.log('Connected to DB for seeding...');

        // Clear existing
        await Project.deleteMany({});
        await Advocacy.deleteMany({});

        // Projects
        await Project.create([
            {
                title: 'Amazon Reforestation 2024',
                description: 'Restoring 5,000 hectares of primary rainforest in the heart of Brazil. This project aims to bring back the lost biodiversity and sequester carbon.',
                category: 'Reforestation',
                location: 'Amazon Basin, Brazil',
                challenges: 'Illegal logging, extreme weather patterns.',
                outcomes: 'Planted 500,000 native trees.',
                image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1200',
                status: 'Ongoing',
                isRecent: true,
                goalAmount: 500000,
                currentAmount: 125000
            },
            {
                title: 'Ocean Plastic Barrier',
                description: 'Implementing innovative barriers to prevent plastic waste from entering the Pacific Ocean.',
                category: 'Ocean Cleanup',
                location: 'Pacific Coast',
                challenges: 'High tide management, maintenance.',
                outcomes: 'Removed 10 tons of plastic in 6 months.',
                image: 'https://images.unsplash.com/photo-1484603355023-e275525ce057?auto=format&fit=crop&q=80&w=1200',
                status: 'Completed',
                goalAmount: 200000,
                currentAmount: 200000
            },
            {
                title: 'Solar Education Hubs',
                description: 'Building schools powered entirely by solar energy in rural communities.',
                category: 'Education',
                location: 'Global South',
                image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200',
                status: 'Future',
                goalAmount: 300000
            }
        ]);

        // Advocacy
        await Advocacy.create([
            {
                headline: 'Global Treaty for Plastic Reduction Signed',
                source: 'UN Environment',
                summary: 'Over 150 nations have signed a landmark treaty to end plastic pollution by 2040.'
            },
            {
                headline: 'IPCC Warns of Critical Warming Threshold',
                source: 'IPCC',
                summary: 'The latest report emphasizes the need for immediate decarbonization.'
            }
        ]);

        // Admin User (password123)
        const userExists = await User.findOne({ email: 'admin@test.com' });
        if (!userExists) {
            await User.create({
                name: 'System Admin',
                email: 'admin@test.com',
                password: 'password123',
                role: 'Admin'
            });
            console.log('Admin user created: admin@test.com / password123');
        }

        console.log('Seed completed successfully.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
