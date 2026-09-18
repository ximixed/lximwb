import { Briefcase, ShoppingCart, Smartphone, ArrowUpRight, Play } from 'lucide-react';
import { GiFlamingClaw } from 'react-icons/gi';
import { TbFoodsteps } from 'react-icons/tb';

function Projects({ isActive = true }) {
  const projects = [
    {
      title: 'Gaming Shoppee',
      description: 'This Project is Coming Soon.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      Icon: GiFlamingClaw,
    },
    {
      title: 'Xim Foods',
      description: 'This Project is Coming Soon.',
      tags: ['UI/UX', 'Responsive Design', 'Mobile'],
      link: '#',
      Icon: TbFoodsteps,
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
            <a href={project.link} className="btn btn-primary project-btn">
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
