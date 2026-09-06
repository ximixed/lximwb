import { Mail } from 'lucide-react';
import GhostFibers from './GhostFibers.jsx';

function Header({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: '| About' },
    { id: 'projects', label: '| Projects' },
    { id: 'contact', label: '| Contact' },
    { id: 'profile', label: '| Profile' },
  ];

  return (
    <header>
      <div className="header-ghost-fibers" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          layers={3}
          glowIntensity={1.4}
          vignette={0.4}
          dpr={1}
        />
      </div>
      <div className="nav-container">
        <div className="brand">
          <img src="pic/profile.jpg" alt="Ilsim Sayon" className="profile-logo" />
          <span className="brand-name">Ilsim Sayon</span>
        </div>
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                >
                  {item.id === 'contact' && <Mail size={15} strokeWidth={2} />}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
