function About({ isActive = true }) {
  const skills = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'PHP',
    'C++',
    'React',
    'Responsive Design',
    'Git',
  ];

  return (
    <section id="about" className={`page-section ${isActive ? 'active' : ''}`}>
      <h2>About Me</h2>
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
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
