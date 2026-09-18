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
  Monitor,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  MessageSquare,
  Keyboard,
} from 'lucide-react';

function Sidebar({
  activeSection,
  onNavigate,
  theme = 'light',
  onThemeChange,
  soundEnabled = false,
  onToggleSound,
  onOpenTypingTest,
}) {
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
            title="Ask anything"
          >
            <span>Ask anything</span>
            <kbd className="sidebar-kbd">Alt + K</kbd>
          </button>
          <button
            className="sidebar-shortcut-row"
            onClick={onOpenTypingTest}
            title="Start Typing Test"
          >
            <span>Typing test</span>
            <kbd className="sidebar-kbd">Alt + J</kbd>
          </button>
        </div>

        {/* Live viewers indicator like Bryl Lim */}
        <div className="sidebar-viewers-box">
          <div className="sidebar-viewers-row">
            <div className="avatar-stack">
              <span className="avatar-circle av-1">IS</span>
              <span className="avatar-circle av-2">JD</span>
              <span className="avatar-circle av-3">AL</span>
              <span className="avatar-circle av-more">+2</span>
            </div>
            <span className="viewers-count-text">5 people viewing now</span>
          </div>

          <button
            className="sidebar-community-link"
            onClick={() => onNavigate('contact')}
          >
            <MessageSquare size={13} strokeWidth={2} />
            <span>community chat</span>
          </button>
        </div>

        {/* Bryl Lim style Toggle Button Row: [ Monitor | Sun | Moon ] and [ Volume ] */}
        <div className="sidebar-toggles-row">
          <div className="theme-toggle-pill" role="group" aria-label="Theme selection">
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'system' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('system')}
              title="System Theme"
              aria-label="System Theme"
            >
              <Monitor size={13} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('light')}
              title="Light Theme"
              aria-label="Light Theme"
            >
              <Sun size={13} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('dark')}
              title="Dark Theme"
              aria-label="Dark Theme"
            >
              <Moon size={13} strokeWidth={2} />
            </button>
          </div>

          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? <Volume2 size={14} strokeWidth={2} /> : <VolumeX size={14} strokeWidth={2} />}
          </button>
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
