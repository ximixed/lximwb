import { Briefcase, ShoppingCart, Smartphone, ArrowUpRight } from 'lucide-react';

function Projects({ isActive = true }) {
  const projects = [
    {
      title: 'E-Commerce Web App',
      description: 'A web-based store layout featuring product catalogs and interactive elements.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      Icon: ShoppingCart,
    },
    {
      title: 'Mobile UI Mockups',
      description: 'Interface designs tailored for modern mobile platforms with clean typography.',
      tags: ['UI/UX', 'Responsive Design', 'Mobile'],
      link: '#',
      Icon: Smartphone,
    },
  ];

  return (
    <section id="projects" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="section-heading">
        <span className="section-icon-badge">
          <Briefcase size={17} strokeWidth={2} />
        </span>
        <h2>Projects</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <span className="project-index">No. {String(index + 1).padStart(2, '0')}</span>
            <div className="project-card-top">
              <span className="project-icon-badge">
                <project.Icon size={18} strokeWidth={2} />
              </span>
              <h3>{project.title}</h3>
            </div>
            <p>{project.description}</p>
            {project.tags && (
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a href={project.link} className="btn secondary-btn project-btn">
              View Details
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
