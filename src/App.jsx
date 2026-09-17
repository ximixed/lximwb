import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Profile from './components/Profile.jsx';
import Footer from './components/Footer.jsx';
import GhostFibers from './components/GhostFibers.jsx';
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
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      <div className="bg-ghost-fibers" aria-hidden="true">
        <GhostFibers
          lineColor="#020617"
          glowColor="#1d4ed8"
          speed={0.14}
          scale={2.2}
          rotation={0}
          rotationSpeed={0.15}
          layers={3}
          waveAmplitude={0.012}
          waveFrequency={2.5}
          waveSpeed={0.12}
          layerSpeed={0.06}
          twist={0.08}
          twistFrequency={4}
          twistSpeed={1.0}
          lineFrequency={4}
          lineSpacing={2}
          lineSharpness={14}
          glowFalloff={12}
          glowIntensity={1.2}
          brightness={1.6}
          blueBoost={1.8}
          vignette={0.88}
          grain={0.03}
          dpr={1}
        />
      </div>
      <Header activeSection={activeSection} onNavigate={navigateTo} />
      <div className="sheet-frame">
        <span className="tick tick-tl" aria-hidden="true"></span>
        <span className="tick tick-tr" aria-hidden="true"></span>
        <span className="tick tick-bl" aria-hidden="true"></span>
        <span className="tick tick-br" aria-hidden="true"></span>
        <main className="content-container">
          <Home isActive={activeSection === 'home'} onNavigate={navigateTo} />
          <About isActive={activeSection === 'about'} />
          <Projects isActive={activeSection === 'projects'} />
          <Contact isActive={activeSection === 'contact'} />
          <Profile isActive={activeSection === 'profile'} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
