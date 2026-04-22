const mongoose = require('mongoose');
const Project  = require('./models/Project');
const Advocacy = require('./models/Advocacy');
const User     = require('./models/User');
const Activity = require('./models/Activity');
const Donation = require('./models/Donation');
const Member   = require('./models/Member');

const seedData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Ecovation');
        console.log('Connected to Ecovation DB...');

        // Clear all collections
        await Project.deleteMany({});
        await Advocacy.deleteMany({});
        await User.deleteMany({});
        await Activity.deleteMany({});
        await Donation.deleteMany({});
        await Member.deleteMany({});
        console.log('All collections cleared.');

        // ── 1. PROJECTS ───────────────────────────────────────────
        const projects = await Project.create([
            {
                title: 'Amazon Reforestation 2024',
                description: `The Amazon rainforest is facing unprecedented challenges from deforestation, with an estimated 17% of the forest already lost. Our Amazon Reforestation 2024 initiative aims to restore 5,000 hectares of degraded primary rainforest in the heart of Brazil, specifically targeting the Mato Grosso and Pará regions where deforestation rates are highest.

This ambitious project focuses on restoring biodiversity and combating climate change by sequestering carbon through large-scale tree planting. We work with indigenous communities and local stakeholders to ensure sustainable restoration practices that benefit both the environment and local economies.

Using a combination of native tree species selection, advanced soil preparation techniques, and community-led monitoring, we are establishing resilient forest ecosystems that can support wildlife, maintain water cycles, and contribute to global carbon reduction goals. Each phase of the project includes rigorous environmental assessments and long-term ecological monitoring to ensure lasting impact.

Our approach integrates traditional ecological knowledge with modern conservation science, creating a model for successful rainforest restoration that can be scaled globally. By the end of 2025, we aim to have planted over 500,000 native trees and created employment for 200+ local families.`,
                category: 'Reforestation',
                location: 'Amazon Basin, Brazil (Mato Grosso & Pará)',
                challenges: `Illegal logging remains a persistent threat in the region, requiring constant vigilance and partnership with local authorities. Extreme weather patterns, including severe droughts and unexpected floods, directly impact seedling survival rates and require adaptive management strategies.

Infrastructure challenges include limited road access to remote planting sites, making logistics and supply chain management complex. Additionally, we face competition for land from agricultural expansion and cattle ranching interests that prioritize short-term economic gains over long-term environmental preservation.

Community engagement and education are ongoing challenges, as we work to shift mindsets about the value of intact forests versus cleared land for immediate use. Funding constraints also limit the scale and speed at which we can execute restoration work.`,
                outcomes: `To date, we have successfully planted 500,000 native trees across 2,500 hectares, with a 78% survival rate—significantly above industry standards. This translates to sequestration of approximately 125,000 metric tons of CO2 over the trees' lifetime.

We have created 180 permanent and seasonal jobs for local community members, generating $450,000 in local income. Biodiversity surveys show the return of 45+ previously absent bird species and increased jaguar sightings, indicating ecosystem recovery.

Water cycle improvements have been documented in three tributary streams, with improved dry-season flow rates. We've engaged 5,000+ students in environmental education programs and trained 50 indigenous youth as forest rangers.`,
                image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1200',
                gallery: [
                    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800'
                ],
                status: 'Ongoing',
                isRecent: true,
                needsDonation: true,
                goalAmount: 500000,
                currentAmount: 125000
            },
            {
                title: 'Ocean Plastic Barrier Initiative',
                description: `Plastic pollution in our oceans has reached catastrophic levels, with an estimated 8 million tons entering marine ecosystems annually. Our Ocean Plastic Barrier Initiative implements cutting-edge technology to intercept plastic waste before it reaches open ocean, protecting marine biodiversity and preventing harm to fishing communities.

The project deploys a series of modular floating barriers along critical waterways and coastal zones in the Pacific. These barriers work with natural ocean currents to funnel plastic waste into collection zones, where trained teams recover and process the materials for recycling or proper disposal.

Beyond infrastructure, we focus on upstream solutions through community education, policy advocacy, and partnerships with waste management authorities. Our integrated approach includes beach cleanups, river monitoring, and workplace sustainability programs in partner communities.

The technology has been designed in collaboration with oceanographers, marine biologists, and engineers to ensure minimal environmental impact while maximizing plastic collection efficiency. Each barrier unit is equipped with sensor technology for real-time monitoring of ocean conditions and plastic accumulation rates.`,
                category: 'Ocean Cleanup',
                location: 'Pacific Coastal Regions (multiple countries)',
                challenges: `Managing the barriers during high tide and extreme weather conditions requires constant maintenance and significant capital investment. The open ocean environment is harsh, corroding materials and demanding robust engineering solutions that increase operational costs.

Determining optimal barrier placement requires extensive oceanographic data analysis, and even with this, ocean currents can shift unpredictably. There's also the complex challenge of processing collected plastic responsibly—many recycling markets are saturated, and shipping costs can exceed the material value.

International waters regulation and cross-border cooperation add regulatory complexity. Additionally, we must balance our barriers with marine safety and avoid interfering with fishing routes and shipping lanes used by local communities.`,
                outcomes: `In the first year of operation, our barriers successfully intercepted and recovered 10 metric tons of plastic waste that would have otherwise entered the open ocean. Analysis shows the barriers prevent approximately 50 tons annually from reaching endangered marine habitats.

We've prevented an estimated 8 million microplastic particles from reaching the feeding zones of endangered whale and sea turtle populations. Collaboration with fishing communities has resulted in their recovery of an additional 5 tons through modified fishing nets designed to catch plastic.

The initiative has created 45 jobs in waste processing and barrier maintenance. Education campaigns have reached 15,000 coastal residents, reducing single-use plastic consumption by 30% in partner communities. We've influenced policy changes in 3 countries regarding ocean plastic management.`,
                image: 'https://images.unsplash.com/photo-1484603355023-e275525ce057?auto=format&fit=crop&q=80&w=1200',
                gallery: [
                    'https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800'
                ],
                status: 'Completed',
                goalAmount: 200000,
                currentAmount: 200000
            },
            {
                title: 'Solar Education Hubs',
                description: `Energy poverty affects 770 million people globally, disproportionately impacting rural students whose educational outcomes are limited by inadequate infrastructure. Our Solar Education Hubs project brings renewable energy to schools in underserved communities across the Global South, enabling extended study hours, powering digital learning tools, and providing a foundation for sustainable local economies.

Each hub is designed as a complete solar microgrid providing 15-25 kW of clean electricity. Beyond classroom lighting, the systems power computer labs, water purification units, and teacher training facilities. We partner with local governments and educational institutions to ensure the hubs integrate into community development plans.

The project includes hands-on STEM education components where students learn solar technology installation, maintenance, and electrical engineering. This creates a pipeline of skilled youth capable of installing and maintaining renewable energy systems in their own communities.

We're not just installing solar panels—we're catalyzing educational transformation and creating economic opportunities. Each hub serves 300-500 students and becomes a community gathering point for evening adult literacy programs and vocational training in renewable energy technologies.`,
                category: 'Education & Energy',
                location: 'Sub-Saharan Africa, South Asia, Southeast Asia',
                challenges: `Upfront capital costs for solar installations range from $30,000-50,000 per hub, limiting the number we can establish with available funding. Remote locations often lack the technical expertise for installation and ongoing maintenance, requiring extensive capacity building.

Supply chain logistics are complex in regions with limited infrastructure, and tariffs on imported solar equipment increase costs significantly. Political instability in some regions creates uncertainty for long-term project sustainability.

There's also the challenge of ensuring equitable access—girls' education in particular requires addressing cultural barriers and safety concerns. Technical sustainability requires training sufficient local technicians to handle repairs without external support.`,
                outcomes: `We have established 12 solar education hubs serving 4,200 students across 8 countries. These hubs have extended school operating hours by an average of 4 hours daily, enabling evening study programs and adult literacy classes.

Computer lab access has improved digital literacy among 3,500+ students, with 85% improvement in exam performance among participants. The hubs have trained 180 youth in solar installation and maintenance, with 120 now employed in renewable energy sectors.

Girls' enrollment in STEM courses increased by 45% in hub schools compared to national averages. Communities report improved access to information and services through hub internet connectivity. The initiative has catalyzed an additional $2.3 million in government commitments to expand solar education access in the region.`,
                image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200',
                gallery: [
                    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1427504494938-7531652a8e37?auto=format&fit=crop&q=80&w=800'
                ],
                status: 'Ongoing',
                needsDonation: true,
                goalAmount: 300000,
                currentAmount: 85000
            }
        ]);
        console.log(`✅ ${projects.length} Projects seeded.`);

        // ── 2. ADVOCACY ───────────────────────────────────────────
        await Advocacy.create([
            {
                headline: 'Global Treaty for Plastic Reduction Signed',
                source: 'UN Environment',
                summary: 'Over 150 nations have signed a landmark treaty to end plastic pollution by 2040.',
                url: 'https://www.unep.org'
            },
            {
                headline: 'IPCC Warns of Critical Warming Threshold',
                source: 'IPCC',
                summary: 'The latest report emphasizes the need for immediate decarbonization.',
                url: 'https://www.ipcc.ch'
            },
            {
                headline: 'India Launches National Clean Air Programme',
                source: 'Ministry of Environment, India',
                summary: 'New programme targets 40% reduction in particulate matter by 2026.',
                url: 'https://moef.gov.in'
            }
        ]);
        console.log('✅ Advocacy seeded.');

        // ── 3. USERS ──────────────────────────────────────────────
        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@ecovation.org',
            password: 'password123',
            role: 'Admin',
            designation: 'Platform Administrator'
        });

        const volunteer = await User.create({
            name: 'Priya Sharma',
            email: 'volunteer@ecovation.org',
            password: 'password123',
            role: 'Volunteer',
            designation: 'Field Volunteer',
            bio: 'Passionate about reforestation and clean water initiatives.',
            interests: ['Reforestation', 'Ocean Cleanup'],
            availability: 'Weekends',
            portfolio: [
                { projectName: 'Amazon Reforestation 2024', description: 'Led tree planting drives', year: '2024' }
            ]
        });

        const donor = await User.create({
            name: 'Rohan Mehta',
            email: 'donor@ecovation.org',
            password: 'password123',
            role: 'Donor'
        });

        console.log('✅ Users seeded:');
        console.log('   Admin     → admin@ecovation.org     / password123');
        console.log('   Volunteer → volunteer@ecovation.org / password123');
        console.log('   Donor     → donor@ecovation.org     / password123');

        // ── 4. ACTIVITIES ─────────────────────────────────────────
        await Activity.create([
            {
                volunteerId: volunteer._id,
                projectId: projects[0]._id,   // Amazon Reforestation
                role: 'Tree Planting Lead',
                hoursContributed: 8,
                status: 'Approved',
                certificateGenerated: false
            },
            {
                volunteerId: volunteer._id,
                projectId: projects[1]._id,   // Ocean Plastic Barrier
                role: 'Cleanup Coordinator',
                hoursContributed: 6,
                status: 'Approved',
                certificateGenerated: true
            }
        ]);
        console.log('✅ Activities seeded.');

        // ── 5. DONATIONS ──────────────────────────────────────────
        await Donation.create([
            {
                donorId: donor._id,
                projectId: projects[0]._id,   // Amazon Reforestation
                amount: 5000,
                currency: 'INR',
                message: 'Happy to support this cause!'
            },
            {
                donorId: donor._id,
                projectId: projects[2]._id,   // Solar Education Hubs
                amount: 2500,
                currency: 'INR',
                message: 'Education is the future.'
            }
        ]);
        console.log('✅ Donations seeded.');

        // ── 6. MEMBERS (About Us page) ────────────────────────────
        await Member.create([
            // Team Members
            {
                name: 'Dr. Anjali Verma',
                photo: 'https://i.pravatar.cc/150?img=47',
                designation: 'Executive Director & Co-Founder',
                bio: `Dr. Anjali Verma is the visionary leader and co-founder of EcoVation, where she has driven the organization's mission for over 10 years. With a PhD in Environmental Science from the University of Delhi, Dr. Verma brings deep expertise in conservation strategy and sustainable development.

Her career spans two decades working with governmental bodies, international NGOs, and community organizations across Asia and Africa. Dr. Verma has been instrumental in establishing EcoVation's policy advocacy framework, enabling the organization to influence environmental legislation in 15 countries.

Beyond EcoVation, she serves on the advisory board of the Global Environmental Forum and is a frequent speaker at international sustainability conferences. Her research on ecosystem restoration has been published in 40+ peer-reviewed journals. Dr. Verma holds a passion for community-led conservation and believes that lasting environmental change must center indigenous knowledge and local empowerment.`,
                type: 'TeamMember',
                portfolio: [
                    { projectName: 'Ocean Plastic Barrier Initiative', description: 'Strategic project lead, secured $2M in international funding', year: '2023' },
                    { projectName: 'Amazon Reforestation 2024', description: 'Vision setter, indigenous community partnership strategy', year: '2024' },
                    { projectName: 'Global Policy Advocacy Framework', description: 'Developed framework influencing environmental legislation in 15 countries', year: '2022-2024' }
                ]
            },
            {
                name: 'Rahul Nair',
                photo: 'https://i.pravatar.cc/150?img=12',
                designation: 'Head of Reforestation & Field Operations',
                bio: `Rahul Nair is a leading expert in tropical ecosystem restoration with 15+ years of field experience across South America, Africa, and Asia. He holds a Master's in Forestry from the Indian Institute of Forest Management and has specialized in native species restoration and ecological succession dynamics.

His practical expertise spans soil analysis, seedling cultivation, pest management, and community forest governance. Rahul has directly overseen the planting of over 3 million trees across multiple continents and has pioneered innovative soil regeneration techniques that increase seedling survival rates to 78%—well above industry standards.

Known for his ability to work closely with indigenous communities and build trust across cultural boundaries, Rahul ensures that every reforestation project respects local ecosystems and benefits local stakeholders. He leads a dedicated team of 45 field coordinators and has trained 200+ community members in sustainable forestry practices.

Rahul's holistic approach integrates carbon sequestration goals with biodiversity conservation, watershed protection, and economic livelihood creation for participating communities.`,
                type: 'TeamMember',
                portfolio: [
                    { projectName: 'Amazon Reforestation 2024', description: 'Field operations head, 500K trees planted, 78% survival rate', year: '2024' },
                    { projectName: 'Southeast Asia Forest Restoration', description: 'Led 5-country initiative, 1.2M trees planted', year: '2021-2023' },
                    { projectName: 'Indigenous Community Forestry Program', description: 'Developed sustainable harvesting model benefiting 8 communities', year: '2020-2023' },
                    { projectName: 'Soil Health Initiative', description: 'Research and implementation of regenerative agriculture practices', year: '2022-present' }
                ]
            },
            {
                name: 'Dr. Maya Patel',
                photo: 'https://i.pravatar.cc/150?img=25',
                designation: 'Chief Conservation Scientist',
                bio: `Dr. Maya Patel leads EcoVation's scientific research and impact measurement initiatives, ensuring all projects are grounded in rigorous environmental science. With a PhD in Marine Biology from Cambridge University, she brings world-class expertise in biodiversity assessment and ecosystem monitoring.

Dr. Patel has published 35+ papers in top-tier journals and is a recognized authority on marine protected areas and coastal ecosystem dynamics. She directs a team of 12 scientists who conduct real-time environmental monitoring across all EcoVation projects.

Her work on impact measurement has established industry-leading standards for quantifying conservation outcomes, making EcoVation a model for transparent, science-backed NGO operations. She works closely with academic partners globally to ensure that field findings contribute to peer-reviewed knowledge about ecosystem restoration.

Dr. Patel is passionate about translating complex environmental science into understandable insights for policymakers and communities, bridging the gap between laboratory research and on-the-ground conservation practice.`,
                type: 'TeamMember',
                portfolio: [
                    { projectName: 'Ocean Plastic Barrier Impact Study', description: 'Lead researcher, published findings in Marine Pollution Bulletin', year: '2023' },
                    { projectName: 'Biodiversity Monitoring Framework', description: 'Designed protocols for measuring ecosystem recovery across all initiatives', year: '2022-2024' },
                    { projectName: 'Carbon Sequestration Analysis', description: 'Quantified impact of 3M+ trees on global carbon cycle', year: '2023' }
                ]
            },
            // Volunteers
            {
                name: 'Priya Sharma',
                photo: 'https://i.pravatar.cc/150?img=32',
                designation: 'Senior Field Volunteer',
                bio: `Priya Sharma is a dedicated field volunteer who has contributed over 500 hours to EcoVation's reforestation and water conservation initiatives. Working as a structural engineer by profession, she has brought her technical expertise to project implementation while volunteering her skills for community benefit.

Passionate about combining environmental action with social equity, Priya focuses on projects that directly benefit marginalized communities. She led the community engagement strategy for the Amazon Reforestation project, building trust with indigenous groups and ensuring their voices shaped project design.

Her work has touched the lives of 1,500+ community members, and she has mentored 25 young volunteers in environmental activism and conservation practice. Priya believes that environmental protection is not separate from social justice—it requires centering those most impacted by ecological degradation.`,
                type: 'Volunteer',
                portfolio: [
                    { projectName: 'Amazon Reforestation 2024', description: 'Community engagement lead, 250+ hours, structured saplings distribution program', year: '2024' },
                    { projectName: 'Clean Water Initiative', description: 'Led water system infrastructure assessments for 5 villages', year: '2023' },
                    { projectName: 'Youth Environmental Education', description: 'Mentored 25 young environmental activists', year: '2023-2024' }
                ]
            },
            {
                name: 'Marcus Johnson',
                photo: 'https://i.pravatar.cc/150?img=41',
                designation: 'Ocean Cleanup Coordinator',
                bio: `Marcus Johnson brings professional expertise from the maritime industry to EcoVation's ocean conservation work. A marine engineer with 8 years of experience, he has volunteered 300+ hours designing and implementing innovative solutions for ocean plastic collection.

His engineering background has been crucial in developing the modular design of our plastic barriers, incorporating feedback from both oceanographers and frontline cleanup teams. Marcus works collaboratively with environmental scientists to ensure that technical solutions are ecologically sound and operationally efficient.

Beyond project work, Marcus is passionate about educating maritime professionals about ocean conservation, speaking at industry conferences about corporate responsibility and sustainable shipping practices.`,
                type: 'Volunteer',
                portfolio: [
                    { projectName: 'Ocean Plastic Barrier Initiative', description: 'Lead engineer for barrier design, collected 10 tons of plastic', year: '2023' },
                    { projectName: 'Sustainable Shipping Industry Partnerships', description: 'Engaged 8 shipping companies in ocean conservation practices', year: '2023-2024' }
                ]
            },
            // Partner Organization
            {
                name: 'WWF India',
                type: 'Partner',
                organizationName: 'WWF India',
                partnerLogo: 'https://www.wwfindia.org/logo.png',
                partnerWebsite: 'https://www.wwfindia.org',
                bio: 'Trusted conservation partner working on biodiversity protection across India'
            },
            // Awards
            {
                name: 'Best Environmental NGO 2023',
                type: 'Award',
                awardTitle: 'Best Environmental NGO 2023',
                awardedBy: 'Ministry of Environment, India',
                awardYear: '2023',
                awardDescription: 'Recognized for outstanding contribution to reforestation and ocean cleanup initiatives, with measurable impact on biodiversity conservation and community empowerment across three continents.'
            },
            {
                name: 'Global Impact Award 2024',
                type: 'Award',
                awardTitle: 'Global Impact Award 2024',
                awardedBy: 'United Nations Environment Programme',
                awardYear: '2024',
                awardDescription: 'Honored for innovative approaches to ecosystem restoration and demonstrated commitment to sustainable development goals, particularly in engaging communities as conservation leaders.'
            },
            {
                name: 'Science-Based Conservation Leadership Award',
                type: 'Award',
                awardTitle: 'Science-Based Conservation Leadership Award',
                awardedBy: 'International Union for Conservation of Nature (IUCN)',
                awardYear: '2023',
                awardDescription: 'Recognized for integrating rigorous environmental science into conservation practice and setting new standards for impact measurement and transparency in NGO operations.'
            }
        ]);
        console.log('✅ Members (team, volunteers, partners, awards) seeded.');

        console.log('\n🎉 Ecovation DB seeding complete!');
        process.exit();
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
};

seedData();