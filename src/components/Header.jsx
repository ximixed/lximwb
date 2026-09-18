import { useState, useEffect } from 'react';
import {
  Home,
  User,
  Briefcase,
  Mail,
  UserCircle,
  Menu,
  X,
  ShoppingBag,
  Monitor,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react';

function Header({
  activeSection,
  onNavigate,
  theme = 'light',
  onThemeChange,
  soundEnabled = false,
  onToggleSound,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
  ];

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="mobile-header">
      <div className="nav-container">
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          aria-label="Go to Home"
        >
          <img src="/pic/profile.jpg" alt="Ilsim Sayon" className="profile-logo" />
          <span className="brand-name">Ilsim Sayon</span>
        </a>

        <div className="mobile-header-actions">
          {/* Quick theme pill on mobile bar */}
          <div className="theme-toggle-pill header-theme-pill" role="group" aria-label="Theme selection">
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('light')}
              title="Light Theme"
              aria-label="Light Theme"
            >
              <Sun size={12} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('dark')}
              title="Dark Theme"
              aria-label="Dark Theme"
            >
              <Moon size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <ul className="mobile-nav-links">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`mobile-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {IconComponent && <IconComponent size={16} strokeWidth={2} />}
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Full controls inside mobile drawer */}
        <div className="mobile-nav-footer">
          <div className="theme-toggle-pill" role="group" aria-label="Theme selection">
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'system' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('system')}
              title="System Theme"
            >
              <Monitor size={13} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('light')}
              title="Light Theme"
            >
              <Sun size={13} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => onThemeChange && onThemeChange('dark')}
              title="Dark Theme"
            >
              <Moon size={13} strokeWidth={2} />
            </button>
          </div>

          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 size={14} strokeWidth={2} /> : <VolumeX size={14} strokeWidth={2} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
