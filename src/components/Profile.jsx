function Profile({ isActive = true }) {
  return (
    <section id="profile" className={`page-section ${isActive ? 'active' : ''}`}>
      <h2>My Profile</h2>
      <div className="profile-card">
        <ul className="info-list">
          <li>
            <span>Institution:</span>
            <a
              style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}
              href="https://mccei.edu.ph/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mount Carmel College Escalante Inc.
            </a>
          </li>
          <li>
            <span>Program:</span>
            <span>BS Information Systems</span>
          </li>
          <li>
            <span>Focus:</span>
            <span>Front End Web Developer</span>
          </li>
          <li>
            <span>Status in School:</span>
            <span>Currently Enrolled 2nd Year</span>
          </li>
        </ul>
        <p>
          <span>Field:</span>
          <span>ICT/CSS/IT/IS</span>
        </p>
        <p>
          <span>Core Tech:</span>
          <span>HTML, CSS, JavaScript, PHP, C++</span>
        </p>
        <p>
          <span>Focus:</span>
          <span>Web Designing</span>
        </p>
      </div>
    </section>
  );
}

export default Profile;
