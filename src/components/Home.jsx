function Home({ isActive = true, onNavigate }) {
  return (
    <section id="home" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="hero-content">
        <h1>
          Hello, I'm <span className="highlight" style="font-family: 'times new roman';">Ilsim Sayon</span>
        </h1>
        <p>Welcome to my Simple Personal Website!</p>
        <button
          className="btn primary-btn"
          onClick={() => onNavigate && onNavigate('projects')}
        >
          View My Work
        </button>
      </div>
    </section>
  );
}

export default Home;
