import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineTemplate, HiOutlineMail, HiOutlineDownload, HiOutlineShieldCheck, HiOutlineLightningBolt } from 'react-icons/hi';

const features = [
  { icon: <HiOutlineTemplate />, title: 'Premium Templates', description: 'Choose from beautifully designed templates crafted by professional designers.' },
  { icon: <HiOutlineSparkles />, title: 'Live Preview', description: 'See changes in real-time as you build your resume. What you see is what you get.' },
  { icon: <HiOutlineDownload />, title: 'PDF Download', description: 'Export your resume as a pixel-perfect PDF ready for any application.' },
  { icon: <HiOutlineMail />, title: 'Email Direct', description: 'Send your resume directly to recruiters via email with one click.' },
  { icon: <HiOutlineShieldCheck />, title: 'Secure & Private', description: 'Your data is encrypted and stored securely. We never share your information.' },
  { icon: <HiOutlineLightningBolt />, title: 'Lightning Fast', description: 'Build a professional resume in under 10 minutes with our intuitive editor.' },
];

const LandingPage = () => {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <span className="landing-logo">ResumeForge</span>
        <div className="landing-nav-links">
          <Link to="/login" className="btn btn-ghost">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <HiOutlineSparkles /> New — 3 Premium Templates Available
          </div>
          <h1 className="hero-title">
            Build Your Perfect <br />
            <span className="hero-title-accent">Resume in Minutes</span>
          </h1>
          <p className="hero-subtitle">
            Create stunning, ATS-friendly resumes with our drag-and-drop builder.
            Choose from premium templates, customize every detail, and land your dream job.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Building — It's Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="features-header">
          <h2>Everything You Need</h2>
          <p>Powerful features to help you create the perfect resume and stand out from the crowd.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 ResumeForge. Crafted with care for job seekers everywhere.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
