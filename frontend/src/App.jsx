import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
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
        <Link to="/" className="nav-logo">EcoVation</Link>
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
  <footer className="footer">
    <div className="container">
      <div className="grid" style={{marginBottom:'2.5rem'}}>
        <div className="footer-brand">
          <h3 style={{fontSize:'1.8rem', marginBottom:'0.8rem'}}>EcoVation</h3>
          <p style={{lineHeight:'1.8', maxWidth:'260px'}}>Technology for a greener tomorrow. Protecting ecosystems, empowering communities, inspiring change.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div style={{display:'flex', flexDirection:'column', gap:'0.6rem', marginTop:'0.5rem'}}>
            <Link to="/projects" style={{color:'#aaa', textDecoration:'none'}}>Projects</Link>
            <Link to="/about" style={{color:'#aaa', textDecoration:'none'}}>About Us</Link>
            <Link to="/get-involved" style={{color:'#aaa', textDecoration:'none'}}>Get Involved</Link>
            <Link to="/csr" style={{color:'#aaa', textDecoration:'none'}}>CSR Initiatives</Link>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div style={{display:'flex', flexDirection:'column', gap:'0.8rem', marginTop:'0.5rem'}}>
            <p style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><MapPin size={16} /> 123 Sustainability Way, Green City</p>
            <p style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Mail size={16} /> info@ecoportal.org</p>
            <p style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Phone size={16} /> +1 (555) 000-GREEN</p>
          </div>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-links" style={{marginTop:'0.5rem'}}>
            <Globe title="Website" /> <Leaf title="Nature Blog" /> <Heart title="Community" />
          </div>
          <p style={{marginTop:'1rem', fontSize:'0.9rem'}}>Join our newsletter for the latest sustainability news and project updates.</p>
        </div>
      </div>
      <div style={{borderTop:'1px solid #333', paddingTop:'1.5rem', textAlign:'center', fontSize:'0.85rem', color:'#666'}}>
        © {new Date().getFullYear()} EcoVation. All rights reserved. Built with 💚 for the planet.
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
        const [advocacyRes, projectsRes] = await Promise.all([
          api.getAdvocacy(),
          api.getProjects()
        ]);
        setAdvocacy(advocacyRes.data);
        
        if (projectsRes.data && projectsRes.data.length > 0) {
          // Sort by creation date descending to get the latest
          const sorted = [...projectsRes.data].sort((a, b) => 
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
          setRecentProject(sorted[0]);
        }
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    fetchData();
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
          <div className="headline-img-container">
            <img 
              src={recentProject?.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200'} 
              alt={recentProject?.title}
              className="headline-img"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200'; }}
            />
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Mission</h2>
            <p>Driving change from the ground up — one community, one ecosystem at a time.</p>
          </div>
          <p className="mission-lead">
            At EcoVation, we believe that a sustainable future is not a distant dream — it is a choice we make today.
            Founded on the principles of environmental stewardship, scientific integrity, and inclusive community action,
            our mission is to protect and restore the natural world while empowering people across the globe to become
            active participants in this transformation. We bridge the gap between ecology and everyday life, turning
            awareness into measurable, lasting impact.
          </p>
          <div className="mission-pillars">
            <div className="pillar-card">
              <span className="pillar-icon">🌿</span>
              <div>
                <h3>Environmental Advocacy</h3>
                <p>We champion policies and practices that prioritize ecosystem health — from local conservation efforts to international climate agreements. Our advocacy is grounded in peer-reviewed research and field data.</p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-icon">🤝</span>
              <div>
                <h3>Community Empowerment</h3>
                <p>Lasting change begins with people. We equip communities with the tools, knowledge, and resources to lead their own sustainability journeys, fostering local ownership of global challenges.</p>
              </div>
            </div>
            <div className="pillar-card">
              <span className="pillar-icon">💡</span>
              <div>
                <h3>Sustainable Innovation</h3>
                <p>We invest in breakthrough ideas — renewable energy pilots, regenerative agriculture, and green technology — to accelerate the transition to a circular, zero-waste economy.</p>
              </div>
            </div>
          </div>
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
              <div className="sc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600'), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800')" }}></div>
              <h4>Solar Village India</h4>
              <p>Provided 500 households with clean energy.</p>
            </div>
            <div className="success-card glass">
              <div className="sc-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=600'), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800')" }}></div>
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
              <div className="pc-img-container">
                <img 
                  src={p.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'} 
                  alt={p.title}
                  className="pc-img"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'; }}
                />
              </div>
              <div className="pc-body">
                <div className="pc-head">
                  <span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span>
                  <span className="pc-cat">{p.category}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description.substring(0, 120)}...</p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <Link to={`/projects/${p._id}`} className="btn-link">View Details <ChevronRight size={16} /></Link>
                </div>
              </div>
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
      <div className="project-hero">
        <img 
          src={project.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'} 
          alt={project.title}
          className="hero-bg-img"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'; }}
        />
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
          <div className="detail-main">
            <section className="detail-section">
              <h2>About This Project</h2>
              <p>{project.description}</p>
            </section>

            {project.gallery && project.gallery.length > 0 && (
              <section className="detail-section">
                <h2>Project Gallery</h2>
                <div className="gallery-grid">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="gallery-item-container">
                      <img 
                        src={img} 
                        alt={`Gallery ${idx}`} 
                        className="gallery-item"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'; }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.challenges && (
              <section className="detail-section">
                <h2>Challenges Faced</h2>
                <p>{project.challenges}</p>
              </section>
            )}

            {project.outcomes && (
              <section className="detail-section">
                <h2>Outcomes & Impact</h2>
                <p>{project.outcomes}</p>
              </section>
            )}
          </div>

          <div className="detail-sidebar">
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

            {project.goalAmount > 0 && (
              <div className="glass p-3 funding-card">
                <h3>Funding Progress</h3>
                <div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
                  </div>
                  <p className="progress-text">${project.currentAmount.toLocaleString()} of ${project.goalAmount.toLocaleString()}</p>
                  <p className="progress-percent">{Math.round(progressPercent)}% funded</p>
                </div>
                <Link to="/get-involved" className="btn btn-primary full-width">Donate to Project</Link>
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
      <div className="page-header"><h1>About EcoVation</h1></div>
      <div className="container section">

        {/* Our Story */}
        <div className="our-story-section">
          <h2>Our Story</h2>
          <p>
            EcoVation was born in 2015 from a simple but urgent idea: that tourism and conservation could coexist — and even reinforce each other.
            What began as a small team of five environmental scientists and travel enthusiasts has grown into a global movement, now operating across
            22 countries and engaging over 50,000 volunteers worldwide.
          </p>
          <p>
            Our founders witnessed first-hand how unchecked development was eroding coastal mangroves, thinning ancient forests, and silencing
            biodiversity hotspots. They chose action over despair — launching community-led reforestation drives, ocean restoration projects,
            and advocacy campaigns that have since influenced policy in multiple nations.
          </p>
          <p>
            Today, EcoVation stands as a testament to what collaboration can achieve. We are scientists, storytellers, educators, and dreamers —
            united by the conviction that every individual action, multiplied by millions of committed people, can reshape the destiny of our planet.
          </p>
        </div>

        <h2 className="section-title">The Team</h2>
        <div className="grid">
          {loading ? (
            <p>Loading team members...</p>
          ) : teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div key={member._id} className="team-card text-center glass p-3">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="member-avatar-img" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div className="avatar" style={{ display: member.photo ? 'none' : 'flex' }}>
                  {member.name.charAt(0)}
                </div>
                <h4>{member.name}</h4>
                <p>{member.designation}</p>
                <Link to={`/member/${member._id}`} className="btn-link">View Portfolio</Link>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>

        <div className="section-title mt-3" style={{textAlign:'left'}}>
          <h2>Our Volunteers</h2>
          <p style={{color:'#666', fontSize:'1rem', marginTop:'0.5rem'}}>These passionate individuals dedicate their time and energy to make every project a success. Each name represents a story of commitment to a greener tomorrow.</p>
        </div>
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
                <p><Mail size={18} /> Reach out through EcoVation contact page</p>
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
    <div className="container section">

      {/* Why Partner */}
      <div className="section-title">
        <h2>Collaboration for Impact</h2>
        <p>Businesses that partner with EcoVation gain more than a sustainability badge — they join a movement that drives real, measurable ecological and social change.</p>
      </div>

      <div className="grid mt-2" style={{marginBottom:'3rem'}}>
        <div className="glass p-3" style={{borderRadius:'16px'}}>
          <span style={{fontSize:'2rem'}}>📊</span>
          <h3 style={{margin:'0.8rem 0 0.5rem', color:'var(--primary)'}}>Transparent Reporting</h3>
          <p style={{color:'#555', lineHeight:'1.8'}}>Every corporate partner receives detailed annual impact reports — tree counts, carbon offsets, volunteer hours, and community outcomes — audited by independent environmental bodies.</p>
        </div>
        <div className="glass p-3" style={{borderRadius:'16px'}}>
          <span style={{fontSize:'2rem'}}>🌍</span>
          <h3 style={{margin:'0.8rem 0 0.5rem', color:'var(--primary)'}}>Global Reach, Local Impact</h3>
          <p style={{color:'#555', lineHeight:'1.8'}}>Our on-ground teams operate in 22 countries, ensuring that corporate sustainability strategies translate into tangible ecosystem restoration and community upliftment at a local level.</p>
        </div>
        <div className="glass p-3" style={{borderRadius:'16px'}}>
          <span style={{fontSize:'2rem'}}>🤝</span>
          <h3 style={{margin:'0.8rem 0 0.5rem', color:'var(--primary)'}}>Employee Engagement</h3>
          <p style={{color:'#555', lineHeight:'1.8'}}>We design bespoke volunteer programmes that allow corporate teams to participate directly in conservation fieldwork — building morale, team cohesion, and genuine environmental commitment.</p>
        </div>
      </div>

      <div className="glass p-4" style={{borderRadius:'20px', textAlign:'center'}}>
        <h2 style={{marginBottom:'1rem'}}>Our Corporate Partners</h2>
        <p style={{color:'#555', marginBottom:'2rem'}}>Proud to work alongside forward-thinking organisations committed to a sustainable future.</p>
        <div className="partner-grid">
          <div className="partner-logo">🌱 GreenTech Corp</div>
          <div className="partner-logo">🚚 EcoLogistics</div>
          <div className="partner-logo">🥦 Sustainable Foods</div>
          <div className="partner-logo">☀️ SolarBridge</div>
          <div className="partner-logo">💧 AquaClear</div>
          <div className="partner-logo">♻️ CircleWaste</div>
        </div>
      </div>

    </div>
  </div>
);

const GetInvolved = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') || 'volunteer');
  const [projects, setProjects] = useState([]);

  // Only pre-fill if logged-in user is a Donor — not admin, not volunteer, not guest
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isDonor = storedUser?.role === 'Donor';

  const [volunteerForm, setVolunteerForm] = useState({
    name: '', email: '', projectId: '', role: '',
    hoursAvailable: 0, availability: '', interests: [], designation: '', bio: ''
  });

  const [donationForm, setDonationForm] = useState({
    guestName:  isDonor ? (storedUser?.name  || '') : '',
    guestEmail: isDonor ? (storedUser?.email || '') : '',
    projectId:  searchParams.get('project') || '',
    amount: '', currency: 'INR', message: ''
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

  // Sync tab and project when URL params change (e.g. navigating from donor dashboard)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const projectParam = searchParams.get('project');
    if (tabParam) setTab(tabParam);
    if (projectParam) {
      setDonationForm(prev => ({ ...prev, projectId: projectParam }));
    }
  }, [searchParams]);

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
      const activityData = {
        projectId: volunteerForm.projectId,
        role: volunteerForm.role,
        hoursContributed: volunteerForm.hoursAvailable,
        volunteerEmail: volunteerForm.email,
        volunteerName: volunteerForm.name,
        availability: volunteerForm.availability,
        status: 'Pending',
        bio: volunteerForm.bio
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
        // Only attach donorId if user is logged in as Donor
        donorId:    isDonor ? storedUser.id : null,
        guestName:  donationForm.guestName,
        guestEmail: donationForm.guestEmail,
        projectId:  donationForm.projectId || null,
        amount:     parseFloat(donationForm.amount),
        currency:   donationForm.currency,
        message:    donationForm.message
      };

      await api.postDonation(donationData);
      alert('✅ Thank you for your generous donation! You will receive a receipt at your email.');
      // Reset — keep name/email pre-filled only for donors
      setDonationForm({
        guestName:  isDonor ? (storedUser?.name  || '') : '',
        guestEmail: isDonor ? (storedUser?.email || '') : '',
        projectId: '', amount: '', currency: 'INR', message: ''
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
              <input type="text" placeholder="Full Name *" className="input-field" required value={volunteerForm.name} onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})} />
              <input type="email" placeholder="Email Address *" className="input-field" required value={volunteerForm.email} onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})} />
              <select className="input-field" required value={volunteerForm.projectId} onChange={(e) => setVolunteerForm({...volunteerForm, projectId: e.target.value})}>
                <option value="">Select Project to Volunteer For *</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
              <input type="text" placeholder="Role/Position You're Interested In (e.g., Tree Planter)" className="input-field" value={volunteerForm.role} onChange={(e) => setVolunteerForm({...volunteerForm, role: e.target.value})} />
              <select className="input-field" value={volunteerForm.availability} onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}>
                <option value="">Your Availability *</option>
                <option value="Weekends">Weekends</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Full-time">Full-time</option>
                <option value="Flexible">Flexible</option>
              </select>
              <input type="number" placeholder="Hours Per Week You Can Contribute" className="input-field" value={volunteerForm.hoursAvailable} onChange={(e) => setVolunteerForm({...volunteerForm, hoursAvailable: parseInt(e.target.value) || 0})} />
              <div style={{padding: '1rem', background: '#f9f9f9', borderRadius: '8px', marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Areas of Interest:</label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem'}}>
                  {interestOptions.map(interest => (
                    <label key={interest} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                      <input type="checkbox" checked={volunteerForm.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
              <textarea placeholder="Tell us about yourself (optional)" className="input-field" rows="3" value={volunteerForm.bio} onChange={(e) => setVolunteerForm({...volunteerForm, bio: e.target.value})} />
              <button type="submit" className="btn btn-primary full-width">Submit Application</button>
            </form>
          ) : (
            <form className="donation-form" onSubmit={handleDonationSubmit}>
              <h2>Make a Donation</h2>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Your contribution creates real impact. Every donation brings us closer to our mission.</p>
              <input type="text" placeholder="Your Full Name *" className="input-field" required value={donationForm.guestName} onChange={(e) => setDonationForm({...donationForm, guestName: e.target.value})} />
              <input type="email" placeholder="Your Email (for receipt) *" className="input-field" required value={donationForm.guestEmail} onChange={(e) => setDonationForm({...donationForm, guestEmail: e.target.value})} />
              <select className="input-field" value={donationForm.projectId} onChange={(e) => setDonationForm({...donationForm, projectId: e.target.value})}>
                <option value="">Select Project (optional - leave blank for general contribution)</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
              </select>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <input type="number" placeholder="Amount *" className="input-field" required step="0.01" value={donationForm.amount} onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})} />
                <select className="input-field" value={donationForm.currency} onChange={(e) => setDonationForm({...donationForm, currency: e.target.value})}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <textarea placeholder="Message (optional)" className="input-field" rows="3" value={donationForm.message} onChange={(e) => setDonationForm({...donationForm, message: e.target.value})} />
              <button type="submit" className="btn btn-primary full-width">Donate Now</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });
    try {
      await api.sendContactEmail(formData);
      setStatus({ loading: false, message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ 
        loading: false, 
        message: err.response?.data?.message || 'Failed to send message. Please try again.', 
        type: 'error' 
      });
    }
  };

  return (
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
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Name" 
                className="input-field" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="input-field" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <textarea 
                placeholder="Message" 
                className="input-field" 
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary" disabled={status.loading}>
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
              {status.message && (
                <p style={{ marginTop: '1rem', color: status.type === 'success' ? 'green' : 'red' }}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignIn = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await api.login({ email, password, role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        navigate('/dashboard');
      } else {
        const { data } = await api.register({ name, email, password, role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      alert(isLogin ? 'Please enter correct login credentials' : 'Registration failed. Please try again.');
      if (isLogin) {
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <div className="signin-page section fade-in">
      <div className="container">
        <div className="form-card max-w-sm mx-auto">
          <h2>{isLogin ? 'Sign In' : 'Register'}</h2>
          <div className="role-selector mb-2">
            <button className={role === 'Admin' ? 'active' : ''} onClick={() => setRole('Admin')}>Admin</button>
            <button className={role === 'Volunteer' ? 'active' : ''} onClick={() => setRole('Volunteer')}>Volunteer</button>
            <button className={role === 'Donor' ? 'active' : ''} onClick={() => setRole('Donor')}>Donor</button>
          </div>
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <input type="text" placeholder="Name" className="input-field" required value={name} onChange={e => setName(e.target.value)} />
            )}
            <input type="email" placeholder="Email" className="input-field" required value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input-field" required value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-primary full-width">{isLogin ? `Login as ${role}` : `Register as ${role}`}</button>
          </form>
          <div className="mt-3 text-center">
            <p>
              {isLogin ? "New to our web application? " : "Already have an account? "}
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary-color)', textDecoration: 'underline', fontSize: 'inherit' }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
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

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', category: '', location: '',
    challenges: '', outcomes: '', image: '', gallery: [],
    goalAmount: 0, currentAmount: 0, status: 'Ongoing'
  });

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

  const handleIssueCertificate = async (id) => {
    try {
      await api.issueCertificate(id);
      alert('Certificate successfully issued!');
      const { data } = await api.getAllApplications();
      setApplications(data);
    } catch (err) {
      alert('Error issuing certificate');
    }
  };

  return (
    <div className="admin-dashboard fade-in">
      <div className="container section">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>Projects</button>
          <button className={tab === 'members' ? 'active' : ''} onClick={() => setTab('members')}>Members</button>
          <button className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}>Volunteer Apps</button>
          <button className={tab === 'donations' ? 'active' : ''} onClick={() => setTab('donations')}>Donations</button>
        </div>

        {tab === 'projects' && (
          <div className="admin-section">
            <h2>Manage Projects</h2>
            <div className="glass p-3 form-section">
              <h3>Add New Project</h3>

              <form onSubmit={handleCreateProject}>
                <input type="text" placeholder="Project Title" className="input-field" required value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} />
                <textarea placeholder="Description" className="input-field" rows="4" required value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} />
                <input type="text" placeholder="Category (e.g., Reforestation)" className="input-field" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} />
                <input type="text" placeholder="Location" className="input-field" value={projectForm.location} onChange={(e) => setProjectForm({...projectForm, location: e.target.value})} />
                <textarea placeholder="Challenges Faced" className="input-field" rows="3" value={projectForm.challenges} onChange={(e) => setProjectForm({...projectForm, challenges: e.target.value})} />
                <textarea placeholder="Outcomes & Impact" className="input-field" rows="3" value={projectForm.outcomes} onChange={(e) => setProjectForm({...projectForm, outcomes: e.target.value})} />
                <input type="url" placeholder="Cover Image URL" className="input-field" value={projectForm.image} onChange={(e) => setProjectForm({...projectForm, image: e.target.value})} />
                <textarea 
                  placeholder="Gallery Images (enter URLs separated by commas)" 
                  className="input-field" 
                  rows="2" 
                  value={projectForm.gallery.join(', ')} 
                  onChange={(e) => setProjectForm({...projectForm, gallery: e.target.value.split(',').map(url => url.trim()).filter(url => url)})} 
                />
                <input type="number" placeholder="Funding Goal Amount" className="input-field" value={projectForm.goalAmount} onChange={(e) => setProjectForm({...projectForm, goalAmount: parseInt(e.target.value)})} />
                <select className="input-field" value={projectForm.status} onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Future">Future</option>
                </select>
                <button className="btn btn-primary full-width">Create Project</button>
              </form>
            </div>
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

        {tab === 'members' && (
          <div className="admin-section">
            <h2>View Members</h2>
            <p style={{color: '#666', marginBottom: '2rem'}}>Members are automatically added via seed data. Contact support to add new members.</p>
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
                        <h4>{app.volunteerId?.name || app.volunteerName}</h4>
                        <p>{app.volunteerId?.email || app.volunteerEmail}</p>
                        <p>Project: {app.projectId?.title}</p>
                        <p>Role: {app.role} • Hours: {app.hoursContributed}</p>
                        <p className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</p>
                      </div>
                      {app.status === 'Pending' && (
                        <div className="app-actions" style={{ marginTop: '0.5rem' }}>
                          <button className="btn btn-small btn-success" onClick={() => handleApproveApplication(app._id)}>Approve</button>
                          <button className="btn btn-small btn-danger" onClick={() => handleRejectApplication(app._id)}>Reject</button>
                        </div>
                      )}
                      {app.status === 'Approved' && !app.certificateGenerated && (
                        <div className="app-actions" style={{ marginTop: '0.5rem' }}>
                          <button className="btn btn-small btn-primary" onClick={() => handleIssueCertificate(app._id)}>Issue Certificate</button>
                        </div>
                      )}
                      {app.status === 'Approved' && app.certificateGenerated && (
                        <p style={{ color: '#2d6a4f', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 'bold' }}>✓ Certificate Issued</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
                        <td>{d.currency} {d.amount}</td>
                        <td>{new Date(d.date).toLocaleDateString()}</td>
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

const VolunteerDashboard = ({ user }) => {
  const [activities, setActivities] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ hoursContributed: 0, availability: '' });
  
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ availability: '' });

  const volunteerId = user?.id || user?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (!volunteerId) return;
      try {
        const profileRes = await api.getProfile();
        setProfile(profileRes.data);
        setProfileForm({ availability: profileRes.data.availability || 'Weekends' });

        const activitiesRes = await api.getVolunteerActivities(volunteerId);
        setActivities(activitiesRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [volunteerId]);

  const handleEditClick = (activity) => {
    setEditingId(activity._id);
    setEditForm({ 
      hoursContributed: activity.hoursContributed || 0, 
      availability: activity.availability || 'Weekends' 
    });
  };

  const handleSaveActivity = async (id) => {
    try {
      const { data } = await api.updateActivity(id, editForm);
      setActivities(activities.map(a => a._id === id ? data : a));
      setEditingId(null);
    } catch (err) {
      alert('Failed to update activity: ' + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveProfile = async () => {
    try {
      const { data } = await api.updateProfile(profileForm);
      setProfile(data);
      setEditingProfile(false);
      
      // Also update local storage if necessary
      const updatedUser = { ...user, availability: data.availability };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    }
  };

  const totalHours = activities.reduce((sum, a) => sum + (a.hoursContributed || 0), 0);

  const handleDownloadCertificate = (activity) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f4fbf4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#2d6a4f';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Inner Border
    ctx.strokeStyle = '#74c69d';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    // Title
    ctx.fillStyle = '#1b4332';
    ctx.font = 'bold 44px "Inter", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Appreciation', canvas.width / 2, 130);
    
    // Subtitle
    ctx.font = '22px Arial, sans-serif';
    ctx.fillStyle = '#40916c';
    ctx.fillText('EcoVation Sustainability Initiative', canvas.width / 2, 170);
    
    // Body text
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('This certificate is proudly presented to', canvas.width / 2, 240);
    
    ctx.font = 'bold 36px "Inter", Arial, sans-serif';
    ctx.fillStyle = '#2d6a4f';
    ctx.fillText(user.name, canvas.width / 2, 300);
    
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText(`For successfully completing ${activity.hoursContributed} hours as a`, canvas.width / 2, 360);
    
    ctx.font = 'bold 26px Arial, sans-serif';
    ctx.fillStyle = '#1b4332';
    ctx.fillText(activity.role || 'Volunteer', canvas.width / 2, 400);
    
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText(`in the ${activity.projectId?.title || 'community'} project.`, canvas.width / 2, 440);
    
    // Footer
    ctx.font = 'italic 18px Arial, sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText(`Awarded on ${new Date().toLocaleDateString()}`, canvas.width / 2, 530);
    
    // Trigger download
    const link = document.createElement('a');
    link.download = `Certificate_${user.name.replace(/\s+/g, '_')}_${(activity.projectId?.title || 'Project').replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="container section fade-in">
      <h1>Volunteer Dashboard</h1>
      
      {profile && (
        <div className="glass p-3 mb-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Profile</h2>
            {!editingProfile ? (
              <button className="btn btn-outline btn-small" onClick={() => setEditingProfile(true)}>Edit Profile</button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary btn-small" onClick={handleSaveProfile}>Save</button>
                <button className="btn btn-outline btn-small" onClick={() => {
                  setEditingProfile(false);
                  setProfileForm({ availability: profile.availability || 'Weekends' });
                }}>Cancel</button>
              </div>
            )}
          </div>
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Designation:</strong> {profile.designation || 'N/A'}</p>
            </div>
            <div>
              <p>
                <strong>Availability:</strong>{' '}
                {editingProfile ? (
                  <select 
                    value={profileForm.availability} 
                    onChange={e => setProfileForm({...profileForm, availability: e.target.value})}
                    style={{ padding: '0.2rem', width: '120px' }}
                  >
                    <option value="Weekends">Weekends</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                ) : (
                  profile.availability || 'Not Set'
                )}
              </p>
              <p><strong>Bio:</strong> {profile.bio || 'No bio provided'}</p>
              <p>
                <strong>Interests:</strong>{' '}
                {profile.interests && profile.interests.length > 0 ? profile.interests.join(', ') : 'None'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="stats-panel">
        <div className="glass p-2"><h3>{totalHours}</h3><p>Hours Contributed</p></div>
        <div className="glass p-2"><h3>{activities.length}</h3><p>Activities</p></div>
      </div>
      <div className="glass p-3 mt-2" style={{ overflowX: 'auto' }}>
        <h3>Your Activities</h3>
        {loading ? (
          <p>Loading activities...</p>
        ) : activities.length === 0 ? (
          <p>No activities yet. <Link to="/get-involved">Apply for a project!</Link></p>
        ) : (
          <table className="w-full" style={{ minWidth: '700px' }}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Role</th>
                <th>Availability</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(a => (
                <tr key={a._id}>
                  <td>{a.projectId?.title || 'N/A'}</td>
                  <td>{a.role || '-'}</td>
                  <td>
                    {editingId === a._id ? (
                      <select 
                        value={editForm.availability} 
                        onChange={e => setEditForm({...editForm, availability: e.target.value})}
                        style={{ padding: '0.2rem', width: '100px' }}
                      >
                        <option value="Weekends">Weekends</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    ) : (
                      a.availability || '-'
                    )}
                  </td>
                  <td>
                    {editingId === a._id ? (
                      <input 
                        type="number" 
                        value={editForm.hoursContributed} 
                        onChange={e => setEditForm({...editForm, hoursContributed: Number(e.target.value)})}
                        style={{ width: '60px', padding: '0.2rem' }}
                        min="0"
                      />
                    ) : (
                      a.hoursContributed
                    )}
                  </td>
                  <td><span className={`status-badge status-${a.status.toLowerCase()}`}>{a.status}</span></td>
                  <td>
                    {a.status === 'Approved' && a.certificateGenerated ? (
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }} onClick={() => handleDownloadCertificate(a)}>
                        <Download size={14} style={{ marginRight: '0.25rem', display: 'inline' }} /> Download
                      </button>
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.85rem' }}>
                        {a.status === 'Approved' ? 'Pending' : 'N/A'}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === a._id ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary btn-small" onClick={() => handleSaveActivity(a._id)}>Save</button>
                        <button className="btn btn-outline btn-small" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <button className="btn btn-outline btn-small" onClick={() => handleEditClick(a)}>Update</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const DonorDashboard = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const donorId = user?.id || user?._id;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!donorId) return;
      try {
        const { data } = await api.getDonationHistory(donorId);
        setHistory(data);
      } catch (err) {
        setError('Unable to load donation history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [donorId]);

  const handleDonateAgain = (projectId) => {
    const params = new URLSearchParams({ tab: 'donate' });
    if (projectId) params.set('project', projectId);
    navigate(`/get-involved?${params.toString()}`);
  };

  return (
    <div className="container section fade-in">
      <h1>{history.length > 0 ? 'Your Giving History' : 'Start Your Giving Journey'}</h1>
      <div className="glass p-3 mb-4">
        <p>Welcome back, {user?.name}. {history.length > 0 ? 'Would you like to donate again?' : 'Ready to make your first donation?'}</p>
        <button className="btn btn-primary" onClick={() => handleDonateAgain('')}>
          {history.length > 0 ? 'Donate Again' : 'Donate Now'}
        </button>
      </div>
      <div className="glass p-3">
        <h2>Past Donations</h2>
        {loading ? (
          <p>Loading your donor history...</p>
        ) : error ? (
          <p>{error}</p>
        ) : history.length === 0 ? (
          <p>You have not made any donations yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((donation) => (
                <tr key={donation._id}>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>{donation.projectId?.title || 'General Donation'}</td>
                  <td>{donation.currency} {donation.amount}</td>
                  <td>
                    <button className="btn btn-outline" onClick={() => handleDonateAgain(donation.projectId?._id)}>
                      Donate Again
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

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