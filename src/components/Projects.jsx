function Projects({ isActive = true }) {
  const projects = [
    {
      title: 'E-Commerce Web App',
      description: 'A web-based store layout featuring product catalogs and interactive elements.',
      link: '#',
    },
    {
      title: 'Mobile UI Mockups',
      description: 'Interface designs tailored for modern mobile platforms with clean typography.',
      link: '#',
    },
  ];

  return (
    <section id="projects" className={`page-section ${isActive ? 'active' : ''}`}>
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="btn secondary-btn">
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
