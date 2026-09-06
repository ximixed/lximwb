import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Profile from './components/Profile.jsx';
import Footer from './components/Footer.jsx';
import GhostFibers from './components/GhostFibers.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'projects', 'contact', 'profile'].includes(hash)) {
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

  return (
    <div className="app-root">
      <div className="bg-ghost-fibers" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
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
