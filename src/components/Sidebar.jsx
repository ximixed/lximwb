import {
  ShoppingBag,
  BookOpen,
  Briefcase,
  User,
  Layers,
  Sparkles,
  Mail,
  Users,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

function Sidebar({ activeSection, onNavigate }) {
  const primaryNav = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const collabNav = [
    { id: 'contact', label: 'Collabs', icon: Users },
    { id: 'contact', label: 'Contact & Hire', icon: Mail },
  ];

  const exploreNav = [
    { id: 'about', label: 'Tech Stack', icon: Layers },
    { id: 'profile', label: 'Education & Info', icon: Sparkles },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button
          className="sidebar-brand-btn"
          onClick={() => onNavigate('home')}
          title="Go to Home"
        >
          <span className="sidebar-brand-name">Ilsim Sayon</span>
          <span className="sidebar-brand-sub">Front-End Developer</span>
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar Navigation">
        <ul className="sidebar-nav-list">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id + item.label} className="sidebar-nav-item">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} strokeWidth={1.75} className="sidebar-icon" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-divider" />

        <ul className="sidebar-nav-list">
          {collabNav.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id && idx === 0;
            return (
              <li key={item.label} className="sidebar-nav-item">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} strokeWidth={1.75} className="sidebar-icon" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-divider" />

        <ul className="sidebar-nav-list">
          {exploreNav.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="sidebar-nav-item">
                <button
                  onClick={() => onNavigate(item.id)}
                  className="sidebar-link"
                >
                  <Icon size={16} strokeWidth={1.75} className="sidebar-icon" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-shortcuts">
          <button
            className="sidebar-shortcut-row"
            onClick={() => onNavigate('contact')}
          >
            <span>Ask anything</span>
            <kbd className="sidebar-kbd">Alt + K</kbd>
          </button>
          <button
            className="sidebar-shortcut-row"
            onClick={() => onNavigate('projects')}
          >
            <span>View work</span>
            <kbd className="sidebar-kbd">Alt + P</kbd>
          </button>
        </div>

        <div className="sidebar-status-card">
          <div className="status-live-indicator">
            <span className="live-dot" />
            <span className="live-text">Open for new projects</span>
          </div>
        </div>

        <div className="sidebar-contact-note">
          <p className="sidebar-contact-caption">
            For work, collabs & everything else, reach me at:
          </p>
          <a
            href="mailto:ilsimsayon@gmail.com"
            className="sidebar-email-link"
          >
            ilsimsayon@gmail.com
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
