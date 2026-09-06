import { User, Smartphone } from 'lucide-react';
import { SiHtml5, SiCss, SiJavascript, SiPhp, SiCplusplus, SiReact, SiGit } from 'react-icons/si';

function About({ isActive = true }) {
  const skills = [
    { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
    { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'Responsive Design', Icon: Smartphone, color: '#e2a63b' },
    { name: 'Git', Icon: SiGit, color: '#F05032' },
  ];

  return (
    <section id="about" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="section-heading">
        <span className="section-icon-badge">
          <User size={17} strokeWidth={2} />
        </span>
        <h2>About Me</h2>
      </div>
      <div className="about-content">
        <p>
          I am an Information Systems student who is passionate about technology, web development, and creating digital solutions.
        </p>
        <p>
          I enjoy learning new skills and exploring how websites and systems work from the inside out.
        </p>
        <p>
          I love building projects that help me practice my coding, improve my problem-solving skills, and understand both front-end and back-end development.
        </p>
        <p>
          My goal is to continue improving my technical skills and gain more experience in creating useful and user-friendly systems. I believe that every project is an opportunity to learn something new and become a better developer.
        </p>

        <div className="skills-section">
          <h3>Skills & Technologies</h3>
          <div className="skills-tags">
            {skills.map(({ name, Icon, color }) => (
              <span key={name} className="skill-tag">
                <Icon size={14} style={{ color }} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
