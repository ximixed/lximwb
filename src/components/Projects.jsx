import { Briefcase, ArrowUpRight, CalendarDays, ShoppingBag } from 'lucide-react';

function Projects({ isActive = true }) {
  const projects = [
    {
      title: 'Daily Planner',
      description: 'A deployed productivity website for daily planning, task tracking, and personal organization.',
      tags: ['React', 'Productivity', 'Responsive Design'],
      link: 'https://dailyplanner-amber-chi.vercel.app/',
      Icon: CalendarDays,
      previewClass: 'daily-planner-preview',
    },
    {
      title: 'Gshops',
      description: 'A storefront landing page for SAYON STORE, built for tech product browsing, shopping cart flow, and simple e-commerce browsing.',
      tags: ['E-commerce', 'React', 'Responsive UI'],
      link: 'https://gshops.vercel.app/',
      Icon: ShoppingBag,
      previewClass: 'gshops-preview',
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
          <div
            className={`project-card ${project.previewClass || ''}`}
            key={index}
          >
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
            <a href={project.link} className="btn btn-primary project-btn">
              View Project
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
