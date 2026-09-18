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

function App() {
  const [activeSection, setActiveSection] = useState('home');

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
  }, []);

  const navigateTo = (sectionId) => {
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
      <Header activeSection={activeSection} onNavigate={navigateTo} />

      <div className="app-layout">
        <Sidebar activeSection={activeSection} onNavigate={navigateTo} />

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
