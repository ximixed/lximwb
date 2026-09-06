function About({ isActive = true }) {
  return (
    <section id="about" className={`page-section ${isActive ? 'active' : ''}`}>
      <h2>About Me</h2>
      <p>
        I am an Information Systems student who is interested in technology, web development, and creating digital solutions.
        <br /><br />
        I enjoy learning new skills and exploring how websites and systems work.
        <br /><br />
        I am currently learning HTML, CSS, JavaScript, PHP, and C++.
        <br /><br />
        I like building simple projects that help me practice my coding, improve my problem-solving skills, and understand both front-end and back-end development.
        <br /><br />
        My goal is to continue improving my technical skills and gain more experience in creating useful and user-friendly systems.
        <br /><br />
        I believe that every project is an opportunity to learn something new and become a better developer.
      </p>
    </section>
  );
}

export default About;
