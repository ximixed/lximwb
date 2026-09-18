import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Profile from './components/Profile.jsx';
import Footer from './components/Footer.jsx';
import Shop from './shop/Shop.jsx';
import { playClickSound } from './utils/audio.js';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('xim_theme') || 'light';
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('xim_sound') === 'true';
  });

  // Handle theme changes
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('xim_theme', theme);

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Handle sound preference
  useEffect(() => {
    localStorage.setItem('xim_sound', String(soundEnabled));
  }, [soundEnabled]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playClickSound();
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (soundEnabled) {
      playClickSound();
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'projects', 'contact', 'profile', 'shop'].includes(hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('home');
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        navigateTo('contact');
      } else if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        navigateTo('projects');
      } else if (e.altKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        navigateTo('home');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [soundEnabled]);

  const navigateTo = (sectionId) => {
    if (soundEnabled) {
      playClickSound();
    }
    window.location.hash = sectionId;
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the gaming shop as its own full page
  if (activeSection === 'shop') {
    return <Shop />;
  }

  return (
    <div className="app-root">
      <Header
        activeSection={activeSection}
        onNavigate={navigateTo}
        theme={theme}
        onThemeChange={handleThemeChange}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <div className="app-layout">
        <Sidebar
          activeSection={activeSection}
          onNavigate={navigateTo}
          theme={theme}
          onThemeChange={handleThemeChange}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        <div className="main-col">
          <main className="content-container">
            <Home isActive={activeSection === 'home'} onNavigate={navigateTo} />
            <About isActive={activeSection === 'about'} />
            <Projects isActive={activeSection === 'projects'} />
            <Profile isActive={activeSection === 'profile'} />
            <Contact isActive={activeSection === 'contact'} />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
