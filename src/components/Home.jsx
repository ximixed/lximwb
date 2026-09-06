import { Code2, PenTool, Layout } from 'lucide-react';

function Home({ isActive = true, onNavigate }) {
  const themes = [
    { label: 'Frontend', Icon: Code2 },
    { label: 'UI/UX', Icon: PenTool },
    { label: 'Web Design', Icon: Layout },
  ];

  const titleBlock = [
    { label: 'Name', value: 'Ilsim Sayon' },
    { label: 'Role', value: 'Front-End Web Developer' },
    { label: 'Program', value: 'BS Information Systems' },
    { label: 'Status', value: '2nd Year, Enrolled' },
  ];

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
            {themes.map(({ label, Icon }) => (
              <span key={label} className="theme-pill">
                <Icon size={13} strokeWidth={2} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="title-block">
          {titleBlock.map(({ label, value }) => (
            <div className="title-block-cell" key={label}>
              <span className="title-block-label">{label}</span>
              <span className="title-block-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
