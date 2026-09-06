function Home({ isActive = true, onNavigate }) {
  return (
    <section id="home" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="hero-content">
        <h1>
          Hello, I'm <span className="highlight">Ilsim Sayon</span>
        </h1>
        <p>Welcome to my Simple Personal Website!</p>

        <div className="hero-actions">
          <button
            className="btn primary-btn"
            onClick={() => onNavigate && onNavigate('projects')}
          >
            View My Work
          </button>

          <div className="hero-theme" aria-label="Portfolio themes">
            <span className="theme-pill">
              <span className="theme-dot" />
              Frontend
            </span>
            <span className="theme-pill">
              <span className="theme-dot" />
              UI/UX
            </span>
            <span className="theme-pill">
              <span className="theme-dot" />
              Web Design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
