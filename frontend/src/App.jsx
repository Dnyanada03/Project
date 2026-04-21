import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="container section">Loading projects...</div>;

  return (
    <div className="projects-page fade-in">
      <div className="page-header"><h1>Our Projects</h1></div>
      <div className="container section">
        <div className="grid">
          {projects.map(p => (
            <div key={p._id} className="project-card-full glass">
              <div className="pc-head">
                <span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span>
                <span className="pc-cat">{p.category}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description.substring(0, 100)}...</p>
              <Link to={`/projects/${p._id}`} className="btn-link">View Details <ChevronRight size={16} /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.getProject(id);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="container section text-center"><h2>Loading project...</h2></div>;
  if (!project) return <div className="container section text-center"><h2>Project not found</h2></div>;

  const startYear = project.createdAt ? new Date(project.createdAt).getFullYear() : 'N/A';
  const progressPercent = project.goalAmount ? (project.currentAmount / project.goalAmount) * 100 : 0;

  return (
    <motion.div className="project-detail fade-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <div className="project-hero" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="hero-overlay">
          <div className="container">
            <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
            <h1>{project.title}</h1>
            <p className="lead">{project.category}</p>
          </div>
        </div>
      </div>

      <div className="container project-detail-content section">
        <div className="grid-2">
          {/* Main Content */}
          <div className="detail-main">
            {/* Description */}
            <section className="detail-section">
              <h2>About This Project</h2>
              <p>{project.description}</p>
            </section>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="detail-section">
                <h2>Project Gallery</h2>
                <div className="gallery-grid">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="gallery-item" style={{ backgroundImage: `url(${img})` }}></div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && (
              <section className="detail-section">
                <h2>Challenges Faced</h2>
                <p>{project.challenges}</p>
              </section>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <section className="detail-section">
                <h2>Outcomes & Impact</h2>
                <p>{project.outcomes}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            {/* Project Info Card */}
            <div className="glass p-3 info-card">
              <h3>Project Details</h3>
              
              {project.location && (
                <div className="info-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Location</strong>
                    <p>{project.location}</p>
                  </div>
                </div>
              )}

              <div className="info-item">
                <Clock size={18} />
                <div>
                  <strong>Started</strong>
                  <p>{startYear}</p>
                </div>
              </div>

              <div className="info-item">
                <span className={`status-badge status-${project.status.toLowerCase()}`}>{project.status}</span>
              </div>
            </div>

            {/* Funding Progress */}
            {project.goalAmount > 0 && (
              <div className="glass p-3 funding-card">
                <h3>Funding Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
                </div>
                <p className="progress-text">${project.currentAmount.toLocaleString()} of ${project.goalAmount.toLocaleString()}</p>
                <p className="progress-percent">{Math.round(progressPercent)}% funded</p>
                <Link to="/get-involved" className="btn btn-primary full-width mt-2">Donate to Project</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.getMembers();
        setMembers(data);
      } catch (err) {
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const teamMembers = members.filter(m => m.type === 'TeamMember');
  const volunteers = members.filter(m => m.type === 'Volunteer');

  return (
    <div className="about-page fade-in">
      <div className="page-header"><h1>About EcoVacation</h1></div>
      <div className="container section">
        <h2 className="section-title">The Team</h2>
        <div className="grid">
          {loading ? (
            <p>Loading team members...</p>
          ) : teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div key={member._id} className="team-card text-center glass p-3">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="member-avatar-img" />
                ) : (
                  <div className="avatar">{member.name.charAt(0)}</div>
                )}
                <h4>{member.name}</h4>
                <p>{member.designation}</p>
                <Link to={`/member/${member._id}`} className="btn-link">View Portfolio</Link>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>
        
        <h2 className="section-title mt-4">Our Volunteers</h2>
        <div className="volunteers-list impact-scroller">
          {volunteers.length > 0 ? (
            volunteers.map(volunteer => (
              <div key={volunteer._id} className="v-card">
                <Link to={`/member/${volunteer._id}`} className="volunteer-link">{volunteer.name}</Link>
              </div>
            ))
          ) : (
            <p>No volunteers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MemberDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await api.getMember(id);
        setMember(data);
      } catch (err) {
        console.error('Error fetching member:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return <div className="container section text-center"><h2>Loading profile...</h2></div>;
  if (!member) return <div className="container section text-center"><h2>Member not found</h2></div>;

  return (
    <motion.div className="member-detail fade-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container member-detail-content section">
        <button onClick={() => navigate(-1)} className="btn-back">← Back</button>

        <div className="member-hero glass">
          <div className="member-photo-section">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="member-photo-circle" />
            ) : (
              <div className="avatar-large">{member.name.charAt(0)}</div>
            )}
          </div>

          <div className="member-info-section">
            <h1>{member.name}</h1>
            <p className="member-role">{member.designation}</p>
            
            {member.bio && (
              <section className="member-bio">
                <h2>About</h2>
                <p>{member.bio}</p>
              </section>
            )}

            {member.portfolio && member.portfolio.length > 0 && (
              <section className="member-portfolio">
                <h2>Portfolio & Projects</h2>
                <div className="portfolio-list">
                  {member.portfolio.map((project, idx) => (
                    <div key={idx} className="portfolio-item">
                      <h4>{project.projectName}</h4>
                      {project.description && <p>{project.description}</p>}
                      {project.year && <span className="year">Year: {project.year}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {member.type === 'TeamMember' && (
              <div className="member-contact mt-4">
                <h3>Contact</h3>
                <p><Mail size={18} /> Reach out through EcoVacation contact page</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/member/:id" element={<MemberDetail />} />
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
