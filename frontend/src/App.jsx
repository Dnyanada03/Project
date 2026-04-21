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
  const [advocacy, setAdvocacy] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await api.getAdvocacy();
      setAdvocacy(data);
    } catch (err) {
      console.error("Error fetching advocacy:", err);
    }
  };

  fetchData();

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
              {advocacy.map(item => (
                <div key={item._id} className="news-item">
                  <span className="source">{item.source}</span>
                  <p>{item.summary}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      Read More <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
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
  const [projects, setProjects] = useState([]);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    projectId: '',
    role: '',
    hoursAvailable: 0,
    availability: '',
    interests: [],
    designation: '',
    bio: ''
  });

  const [donationForm, setDonationForm] = useState({
    guestName: '',
    guestEmail: '',
    projectId: '',
    amount: '',
    currency: 'INR',
    message: ''
  });

  const interestOptions = ['Reforestation', 'Ocean Cleanup', 'Education', 'Energy', 'Clean Water', 'Wildlife Conservation'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleInterestToggle = (interest) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create activity record for volunteer application
      const activityData = {
        projectId: volunteerForm.projectId,
        role: volunteerForm.role,
        hoursContributed: volunteerForm.hoursAvailable,
        volunteerEmail: volunteerForm.email,
        volunteerName: volunteerForm.name,
        availability: volunteerForm.availability,
        status: 'Pending'
      };
      
      await api.applyActivity(activityData);
      alert('✅ Application submitted! Admin will review and approve shortly.');
      setVolunteerForm({
        name: '', email: '', projectId: '', role: '', hoursAvailable: 0,
        availability: '', interests: [], designation: '', bio: ''
      });
    } catch (err) {
      alert('❌ Error submitting application: ' + err.message);
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      const donationData = {
        guestName: donationForm.guestName,
        guestEmail: donationForm.guestEmail,
        projectId: donationForm.projectId || null,
        amount: parseFloat(donationForm.amount),
        currency: donationForm.currency,
        message: donationForm.message
      };

      await api.postDonation(donationData);
      alert('✅ Thank you for your generous donation! You will receive a receipt at your email.');
      setDonationForm({
        guestName: '', guestEmail: '', projectId: '', amount: '', currency: 'INR', message: ''
      });
    } catch (err) {
      alert('❌ Error processing donation: ' + err.message);
    }
  };

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
            <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
              <h2>Volunteer Application</h2>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Join our mission! Fill out your details and we'll match you with the perfect project.</p>
              
              <input 
                type="text" 
                placeholder="Full Name *" 
                className="input-field" 
                required
                value={volunteerForm.name}
                onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email Address *" 
                className="input-field" 
                required
                value={volunteerForm.email}
                onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
              />

              <select 
                className="input-field" 
                required
                value={volunteerForm.projectId}
                onChange={(e) => setVolunteerForm({...volunteerForm, projectId: e.target.value})}
              >
                <option value="">Select Project to Volunteer For *</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder="Role/Position You're Interested In (e.g., Tree Planter)" 
                className="input-field"
                value={volunteerForm.role}
                onChange={(e) => setVolunteerForm({...volunteerForm, role: e.target.value})}
              />

              <select 
                className="input-field"
                value={volunteerForm.availability}
                onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
              >
                <option value="">Your Availability *</option>
                <option value="Weekends">Weekends</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Full-time">Full-time</option>
                <option value="Flexible">Flexible</option>
              </select>

              <input 
                type="number" 
                placeholder="Hours Per Week You Can Contribute" 
                className="input-field"
                value={volunteerForm.hoursAvailable}
                onChange={(e) => setVolunteerForm({...volunteerForm, hoursAvailable: parseInt(e.target.value) || 0})}
              />

              <div style={{padding: '1rem', background: '#f9f9f9', borderRadius: '8px', marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Areas of Interest:</label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem'}}>
                  {interestOptions.map(interest => (
                    <label key={interest} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                      <input 
                        type="checkbox" 
                        checked={volunteerForm.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <textarea 
                placeholder="Tell us about yourself (optional)" 
                className="input-field"
                rows="3"
                value={volunteerForm.bio}
                onChange={(e) => setVolunteerForm({...volunteerForm, bio: e.target.value})}
              />

              <button type="submit" className="btn btn-primary full-width">Submit Application</button>
            </form>
          ) : (
            <form className="donation-form" onSubmit={handleDonationSubmit}>
              <h2>Make a Donation</h2>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Your contribution creates real impact. Every donation brings us closer to our mission.</p>
              
              <input 
                type="text" 
                placeholder="Your Full Name *" 
                className="input-field"
                required
                value={donationForm.guestName}
                onChange={(e) => setDonationForm({...donationForm, guestName: e.target.value})}
              />
              
              <input 
                type="email" 
                placeholder="Your Email (for receipt) *" 
                className="input-field"
                required
                value={donationForm.guestEmail}
                onChange={(e) => setDonationForm({...donationForm, guestEmail: e.target.value})}
              />

              <select 
                className="input-field"
                value={donationForm.projectId}
                onChange={(e) => setDonationForm({...donationForm, projectId: e.target.value})}
              >
                <option value="">Select Project (optional - leave blank for general contribution)</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <input 
                  type="number" 
                  placeholder="Amount *" 
                  className="input-field"
                  required
                  step="0.01"
                  value={donationForm.amount}
                  onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                />

                <select 
                  className="input-field"
                  value={donationForm.currency}
                  onChange={(e) => setDonationForm({...donationForm, currency: e.target.value})}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <textarea 
                placeholder="Message (optional)" 
                className="input-field"
                rows="3"
                value={donationForm.message}
                onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
              />

              <button type="submit" className="btn btn-primary full-width">Donate Now</button>
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

const AdminDashboard = ({ user }) => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', category: '', location: '',
    challenges: '', outcomes: '', image: '', gallery: [],
    goalAmount: 0, currentAmount: 0, status: 'Ongoing'
  });

  // Load data based on tab
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (tab === 'projects') {
          const { data } = await api.getProjects();
          setProjects(data);
        } else if (tab === 'members') {
          const { data } = await api.getMembers();
          setMembers(data);
        } else if (tab === 'applications') {
          const { data } = await api.getAllApplications();
          setApplications(data);
        } else if (tab === 'donations') {
          const { data } = await api.getAllDonations();
          setDonations(data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [tab]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.createProject(projectForm);
      alert('Project created successfully!');
      setProjectForm({
        title: '', description: '', category: '', location: '',
        challenges: '', outcomes: '', image: '', gallery: [],
        goalAmount: 0, currentAmount: 0, status: 'Ongoing'
      });
      const { data } = await api.getProjects();
      setProjects(data);
    } catch (err) {
      alert('Error creating project: ' + err.message);
    }
  };

  const handleApproveApplication = async (id) => {
    try {
      await api.approveApplication(id);
      alert('Application approved!');
      const { data } = await api.getAllApplications();
      setApplications(data);
    } catch (err) {
      alert('Error approving application');
    }
  };

  const handleRejectApplication = async (id) => {
    try {
      await api.rejectApplication(id);
      alert('Application rejected!');
      const { data } = await api.getAllApplications();
      setApplications(data);
    } catch (err) {
      alert('Error rejecting application');
    }
  };

  return (
    <div className="admin-dashboard fade-in">
      <div className="container section">
        <h1>Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="admin-tabs">
          <button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>Projects</button>
          <button className={tab === 'members' ? 'active' : ''} onClick={() => setTab('members')}>Members</button>
          <button className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}>Volunteer Apps</button>
          <button className={tab === 'donations' ? 'active' : ''} onClick={() => setTab('donations')}>Donations</button>
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div className="admin-section">
            <h2>Manage Projects</h2>
            
            {/* Create Project Form */}
            <div className="glass p-3 form-section">
              <h3>Add New Project</h3>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>📷 <strong>For images:</strong> Use URLs from Unsplash.com or upload to Imgbb.com/Cloudinary. Local file paths won't work on the web.</p>
              <form onSubmit={handleCreateProject}>
                <input 
                  type="text" 
                  placeholder="Project Title" 
                  className="input-field" 
                  required 
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description (can be long)" 
                  className="input-field" 
                  rows="4"
                  required 
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Category (e.g., Reforestation)" 
                  className="input-field" 
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="input-field" 
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                />
                <textarea 
                  placeholder="Challenges Faced" 
                  className="input-field" 
                  rows="3"
                  value={projectForm.challenges}
                  onChange={(e) => setProjectForm({...projectForm, challenges: e.target.value})}
                />
                <textarea 
                  placeholder="Outcomes & Impact" 
                  className="input-field" 
                  rows="3"
                  value={projectForm.outcomes}
                  onChange={(e) => setProjectForm({...projectForm, outcomes: e.target.value})}
                />
                <input 
                  type="url" 
                  placeholder="Cover Image URL" 
                  className="input-field" 
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Funding Goal Amount" 
                  className="input-field" 
                  value={projectForm.goalAmount}
                  onChange={(e) => setProjectForm({...projectForm, goalAmount: parseInt(e.target.value)})}
                />
                <select 
                  className="input-field" 
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Future">Future</option>
                </select>
                <button className="btn btn-primary full-width">Create Project</button>
              </form>
            </div>

            {/* Projects List */}
            <div className="projects-list">
              <h3>All Projects ({projects.length})</h3>
              {projects.map(p => (
                <div key={p._id} className="glass p-2 project-item">
                  <h4>{p.title}</h4>
                  <p>{p.category} • {p.location}</p>
                  <p className="status-text">Status: {p.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {tab === 'members' && (
          <div className="admin-section">
            <h2>View Members</h2>
            <p style={{color: '#666', marginBottom: '2rem'}}>Members are automatically added via seed data. Contact support to add new members.</p>
            
            {/* Members List */}
            <div className="members-list">
              <h3>All Members ({members.length})</h3>
              {members.length === 0 ? (
                <p>No members found</p>
              ) : (
                members.map(m => (
                  <div key={m._id} className="glass p-3 member-item">
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                      {m.photo && <img src={m.photo} alt={m.name} style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover'}} />}
                      <div>
                        <h4 style={{margin: 0}}>{m.name}</h4>
                        <p style={{margin: '0.2rem 0'}}>{m.designation}</p>
                        <p style={{margin: 0, fontSize: '0.85rem', color: '#999'}}>Type: {m.type}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {tab === 'applications' && (
          <div className="admin-section">
            <h2>Volunteer Applications</h2>
            {applications.length === 0 ? (
              <p>No applications</p>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className={`glass p-3 app-item status-${app.status.toLowerCase()}`}>
                    <div className="app-header">
                      <div>
                        <h4>{app.volunteerId?.name}</h4>
                        <p>{app.volunteerId?.email}</p>
                        <p>Project: {app.projectId?.title}</p>
                        <p>Role: {app.role} • Hours: {app.hoursContributed}</p>
                        <p className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</p>
                      </div>
                      {app.status === 'Pending' && (
                        <div className="app-actions">
                          <button 
                            className="btn btn-small btn-success" 
                            onClick={() => handleApproveApplication(app._id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn btn-small btn-danger" 
                            onClick={() => handleRejectApplication(app._id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Donations Tab */}
        {tab === 'donations' && (
          <div className="admin-section">
            <h2>Donation Records</h2>
            {donations.length === 0 ? (
              <p>No donations yet</p>
            ) : (
              <div className="donations-list">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Donor</th>
                      <th>Project</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map(d => (
                      <tr key={d._id}>
                        <td>{d.donorId?.name || d.guestName}</td>
                        <td>{d.projectId?.title || 'General'}</td>
                        <td>${d.amount}</td>
                        <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                        <td>{d.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

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
