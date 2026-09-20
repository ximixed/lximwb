import { ArrowUpRight, ArrowRight } from 'lucide-react';

function Home({ isActive = true, onNavigate }) {
  const stats = [
    { value: '2nd Yr', label: 'COLLEGE' },
    { value: '8+', label: 'TECH SKILLS' },
    { value: '100%', label: 'DEDICATION' },
    { value: 'OPEN', label: 'FOR WORK' },
  ];

  const featuredProjects = [
    {
      title: 'SAYON STORE',
      date: 'Sep 2026',
      tag: 'E-Commerce',
      desc: 'A responsive tech storefront with product search, cart management, checkout, and PHP API integration.',
      action: () => onNavigate('projects'),
    },
    {
      title: 'Xim Foods',
      date: 'Aug 2026',
      tag: 'Mobile Web App',
      desc: 'Clean mobile-first restaurant discovery and food ordering concept with instant menu exploration.',
      action: () => onNavigate('projects'),
    },
    {
      title: 'Information Systems Workspace',
      date: 'Jul 2026',
      tag: 'Full-Stack Concept',
      desc: 'Clean web tools and responsive UI components for student management and academic workflows.',
      action: () => onNavigate('projects'),
    },
  ];

  const socialLinks = [
    { label: 'github', url: 'https://github.com/ximixed' },
    { label: 'linkedin', url: 'https://www.linkedin.com/in/ilsim-sayon-0b2b3a24a/' },
    { label: 'tiktok', url: 'https://www.tiktok.com/@xixixixixim' },
    { label: 'facebook', url: 'https://www.facebook.com/redockradeht' },
  ];

  return (
    <section id="home" className={`page-section ${isActive ? 'active' : ''}`}>
      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-hero-avatar-box">
          <img
            src="/pic/profile.jpg"
            alt="Ilsim Sayon"
            className="home-hero-avatar"
          />
        </div>

        <div className="home-hero-content">
          <h1 className="home-title">Ilsim Sayon</h1>
          <p className="home-lead">
            I'm a front-end web developer & BS Information Systems student. I build modern
            web & mobile apps with clean, responsive user interfaces.
          </p>
          <p className="home-subtext">
            Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
          </p>

          <div className="home-socials">
            {socialLinks.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="home-social-link"
              >
                <span>{label}</span>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
            ))}
          </div>

          <div className="home-cta-row">
            <button
              className="btn btn-primary"
              onClick={() => onNavigate && onNavigate('contact')}
            >
              Get in Touch
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              View Projects
            </button>
          </div>
        </div>
      </div>

      {/* Stats / Metric Row */}
      <div className="home-stats-grid">
        {stats.map(({ value, label }) => (
          <div key={label} className="home-stat-cell">
            <div className="home-stat-val">
              <span>{value}</span>
              <ArrowUpRight size={13} className="stat-arrow" />
            </div>
            <div className="home-stat-lbl">{label}</div>
          </div>
        ))}
      </div>

      {/* Section 01 - Projects */}
      <div className="home-section-feed">
        <div className="home-section-head">
          <span className="home-section-number">01 — projects</span>
          <button
            className="home-section-more"
            onClick={() => onNavigate && onNavigate('projects')}
          >
            <span>ALL PROJECTS</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="home-feed-list">
          {featuredProjects.map((item) => (
            <article
              key={item.title}
              className="home-feed-item"
              onClick={item.action}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && item.action()}
            >
              <div className="home-feed-item-header">
                <h3 className="home-feed-title">{item.title}</h3>
                <div className="home-feed-meta">
                  <span className="home-feed-tag">{item.tag}</span>
                  <span className="home-feed-date">{item.date}</span>
                </div>
              </div>
              <p className="home-feed-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
