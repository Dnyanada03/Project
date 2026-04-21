import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Leaf, Users, Globe, ChevronRight, Mail, Phone, MapPin, 
  Download, Award, ShieldCheck, Clock, BookOpen, ExternalLink, Menu, X 
} from 'lucide-react';
import * as api from './api';
import './App.css';

// --- SHARED COMPONENTS ---
const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">EcoVacation</Link>
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About Us</Link>
          <Link to="/csr">CSR</Link>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/contact">Contact Us</Link>
          {user ? (
            <div className="nav-user-actions">
              <Link to="/dashboard" className="btn-dashboard">Dashboard</Link>
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <Link to="/signin" className="btn btn-primary">Sign In</Link>
          )}
        </div>
        <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="footer section">
    <div className="container grid">
      <div className="footer-brand">
        <h3>EcoVacation</h3>
        <p>Technology for a greener tomorrow.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p><Mail size={16} /> info@ecoportal.org</p>
        <p><Phone size={16} /> +1 (555) 000-GREEN</p>
      </div>
      <div>
        <h4>Follow Us</h4>
        <div className="social-links">
          <Globe /> <Leaf /> <Heart />
        </div>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const Home = () => {
  const [recentProject, setRecentProject] = useState(null);
  
  useEffect(() => {
    setRecentProject({
      title: "Amazon Reforestation 2024",
      description: "Restoring 5,000 hectares of primary rainforest in the heart of Brazil.",
      image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1200"
    });
  }, []);

  return (
    <div className="home-page fade-in">
      <section className="recent-project-headline">
        <div className="container grid">
          <div className="headline-content">
            <span className="badge">LATEST PROJECT</span>
            <h1>{recentProject?.title}</h1>
            <p>{recentProject?.description}</p>
            <div className="btns">
              <Link to="/get-involved" className="btn btn-primary">Contribute Now</Link>
              <Link to="/projects" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="headline-img" style={{ backgroundImage: `url(${recentProject?.image})` }}></div>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container text-center">
          <h2 className="section-title">Our Mission</h2>
          <p className="lead">To protect, restore, and advocate for our planet through science-backed initiatives and community empowerment.</p>
        </div>
      </section>

      <section className="section impact-bg">
        <div className="container">
          <h2 className="section-title">Our Achievements</h2>
          <div className="impact-scroller">
            <div className="impact-card"><h3>1.2M</h3><p>Trees Planted</p></div>
            <div className="impact-card"><h3>50K</h3><p>Volunteers Engaged</p></div>
            <div className="impact-card"><h3>85%</h3><p>Waste Diverted</p></div>
            <div className="impact-card"><h3>200+</h3><p>Species Protected</p></div>
            <div className="impact-card"><h3>15</h3><p>Global Awards</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Completed Successes</h2>
          <div className="grid">
            <div className="success-card glass">
              <div className="sc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=600')" }}></div>
              <h4>Solar Village India</h4>
              <p>Provided 500 households with clean energy.</p>
            </div>
            <div className="success-card glass">
              <div className="sc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600')" }}></div>
              <h4>Ocean Plastic Cleanup</h4>
              <p>Removed 20 tons of plastic from the Pacific.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section advocacy-banner">
        <div className="container">
          <div className="glass advocacy-content">
            <h2>Global Advocacy & News</h2>
            <div className="news-grid">
              <div className="news-item">
                <span className="source">UN Environmental</span>
                <p>New global treaty for plastic pollution reduction signed by 150 nations.</p>
              </div>
              <div className="news-item">
                <span className="source">IPCC Report</span>
                <p>Urgent action needed to keep global warming below 1.5 degrees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectsPage = () => {
  const projects = [
    { id: 1, title: 'Reforestation 2024', status: 'Ongoing', cat: 'Climate' },
    { id: 2, title: 'Clean Water Initiative', status: 'Completed', cat: 'Resources' },
    { id: 3, title: 'Electric Schools', status: 'Future', cat: 'Energy' }
  ];

  return (
    <div className="projects-page fade-in">
      <div className="page-header"><h1>Our Projects</h1></div>
      <div className="container section">
        <div className="grid">
          {projects.map(p => (
            <div key={p.id} className="project-card-full glass">
              <div className="pc-head">
                <span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span>
                <span className="pc-cat">{p.cat}</span>
              </div>
              <h3>{p.title}</h3>
              <p>Discover the journey of this initiative, from challenges to global impact.</p>
              <Link to={`/projects/${p.id}`} className="btn-link">View Details <ChevronRight size={16} /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => (
  <div className="about-page fade-in">
    <div className="page-header"><h1>About EcoVacation</h1></div>
    <div className="container section">
      <h2 className="section-title">The Team</h2>
      <div className="grid">
        <div className="team-card text-center">
          <div className="avatar">JD</div>
          <h4>Jane Doe</h4>
          <p>Founder & CEO</p>
          <Link to="/portfolio/jane" className="btn-link">View Portfolio</Link>
        </div>
        <div className="team-card text-center">
          <div className="avatar">AS</div>
          <h4>Adam Smith</h4>
          <p>Operations Lead</p>
          <Link to="/portfolio/adam" className="btn-link">View Portfolio</Link>
        </div>
      </div>
      
      <h2 className="section-title mt-4">Our Volunteers</h2>
      <div className="volunteers-list impact-scroller">
        <div className="v-card"><span>Sarah L.</span></div>
        <div className="v-card"><span>Mike R.</span></div>
        <div className="v-card"><span>Elena K.</span></div>
        <div className="v-card"><span>David O.</span></div>
      </div>
    </div>
  </div>
);

const CSR = () => (
  <div className="csr-page fade-in">
    <div className="page-header"><h1>CSR Initiatives</h1></div>
    <div className="container section text-center">
      <div className="glass p-4">
        <h2>Collaboration for Impact</h2>
        <p>We work with global corporations to integrate sustainability into their core business models.</p>
        <div className="partner-grid grid mt-4">
          <div className="partner-logo">GreenTech Corp</div>
          <div className="partner-logo">EcoLogistics</div>
          <div className="partner-logo">Sustainable Foods</div>
        </div>
      </div>
    </div>
  </div>
);

const GetInvolved = () => {
  const [tab, setTab] = useState('volunteer');
  return (
    <div className="get-involved-page fade-in">
      <div className="page-header"><h1>Get Involved</h1></div>
      <div className="container section">
        <div className="tabs">
          <button className={`btn ${tab === 'volunteer' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('volunteer')}>Volunteer</button>
          <button className={`btn ${tab === 'donate' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('donate')}>Donate</button>
        </div>
        
        <div className="form-card mt-3">
          {tab === 'volunteer' ? (
            <form className="volunteer-form">
              <h2>Volunteer Application</h2>
              <input type="text" placeholder="Full Name" className="input-field" />
              <input type="email" placeholder="Email Address" className="input-field" />
              <textarea placeholder="Your Interests & Availability" className="input-field" rows="4"></textarea>
              <button className="btn btn-primary">Submit Application</button>
            </form>
          ) : (
            <form className="donation-form">
              <h2>Secure Donation</h2>
              <input type="number" placeholder="Amount ($)" className="input-field" />
              <select className="input-field">
                <option>Select Project</option>
                <option>Amazon Reforestation</option>
                <option>Ocean Cleanup</option>
              </select>
              <button className="btn btn-primary">Proceed to Payment</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => (
  <div className="contact-page fade-in">
    <div className="page-header"><h1>Contact Us</h1></div>
    <div className="container section">
      <div className="grid">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><MapPin size={20} /> 123 Sustainability Way, Green City</p>
          <p><Phone size={20} /> +1 (555) 987-6543</p>
          <p><Mail size={20} /> contact@ecoportal.org</p>
        </div>
        <div className="form-card">
          <form>
            <input type="text" placeholder="Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <textarea placeholder="Message" className="input-field" rows="4"></textarea>
            <button className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const SignIn = ({ onLogin }) => {
  const [role, setRole] = useState('Volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.login({ email, password, role });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);
      navigate('/dashboard');
    } catch (err) {
      alert("Invalid credentials. Try: admin@test.com / password123");
    }
  };

  return (
    <div className="signin-page section fade-in">
      <div className="container">
        <div className="form-card max-w-sm mx-auto">
          <h2>Sign In</h2>
          <div className="role-selector mb-2">
            <button className={role === 'Admin' ? 'active' : ''} onClick={() => setRole('Admin')}>Admin</button>
            <button className={role === 'Volunteer' ? 'active' : ''} onClick={() => setRole('Volunteer')}>Volunteer</button>
            <button className={role === 'Donor' ? 'active' : ''} onClick={() => setRole('Donor')}>Donor</button>
          </div>
          <form onSubmit={handleAuth}>
            <input type="email" placeholder="Email" className="input-field" required value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input-field" required value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-primary full-width">Login as {role}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user }) => {
  if (user?.role === 'Admin') return <AdminDashboard user={user} />;
  if (user?.role === 'Volunteer') return <VolunteerDashboard user={user} />;
  if (user?.role === 'Donor') return <DonorDashboard user={user} />;
  return <div>Role not recognized.</div>;
};

const AdminDashboard = ({ user }) => (
  <div className="container section fade-in">
    <h1>Admin Console</h1>
    <div className="grid mt-2">
      <div className="glass p-3">
        <h3>Content Management</h3>
        <ul>
          <li>Update Projects</li>
          <li>Post Advocacy News</li>
          <li>Manage About Us</li>
        </ul>
      </div>
      <div className="glass p-3">
        <h3>User Management</h3>
        <ul>
          <li>Approve Volunteers</li>
          <li>View Donation Records</li>
          <li>Generate Certificates</li>
        </ul>
      </div>
    </div>
  </div>
);

const VolunteerDashboard = ({ user }) => (
  <div className="container section fade-in">
    <h1>Volunteer Dashboard</h1>
    <div className="stats-panel">
      <div className="glass p-2"><h3>12</h3><p>Hours Contributed</p></div>
      <div className="glass p-2"><h3>3</h3><p>Projects Participated</p></div>
    </div>
    <div className="glass p-3 mt-2">
      <h3>Your Activities</h3>
      <table className="w-full">
        <thead><tr><th>Project</th><th>Role</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Amazon Project</td><td>Tree Planter</td><td>Completed</td></tr>
        </tbody>
      </table>
      <button className="btn btn-outline mt-2"><Download size={16} /> Download Certificate</button>
    </div>
  </div>
);

const DonorDashboard = ({ user }) => (
  <div className="container section fade-in">
    <h1>Your Giving History</h1>
    <div className="glass p-3">
      <table className="w-full">
        <thead><tr><th>Date</th><th>Project</th><th>Amount</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>2024-04-01</td><td>Clean Water</td><td>$500</td><td><button className="btn-link">Receipt</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Helper component for conditional footer
const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname === '/' ? <Footer /> : null;
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="app-content spacious-layout">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/csr" element={<CSR />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignIn onLogin={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <SignIn onLogin={setUser} />} />
          </Routes>
        </AnimatePresence>
      </div>
      <ConditionalFooter />
    </Router>
  );
}

export default App;
