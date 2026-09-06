function Profile({ isActive = true }) {
  const profileDetails = [
    {
      label: 'Institution',
      value: 'Mount Carmel College Escalante Inc.',
      isLink: true,
      href: 'https://mccei.edu.ph/',
    },
    {
      label: 'Program',
      value: 'College: BS Information Systems     Senior High Strand: ICT/CSS',
    },
    {
      label: 'Focus',
      value: 'Front End Web Developer',
    },
    {
      label: 'Status in School',
      value: 'Currently Enrolled 2nd Year',
    },
    {
      label: 'Field',
      value: 'ICT / CSS / IT / IS',
    },
    {
      label: 'Core Tech',
      value: 'HTML, CSS, JavaScript, PHP, C++, React',
    },
    {
      label: 'Specialty',
      value: 'Web Developer / UI/UX Designer',
    },
  ];

  return (
    <section id="profile" className={`page-section ${isActive ? 'active' : ''}`}>
      <h2>My Profile</h2>
      <div className="profile-card">
        <ul className="info-list">
          {profileDetails.map((item, index) => (
            <li key={index} className="info-item">
              <span className="info-label">{item.label}</span>
              {item.isLink ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-value info-link"
                >
                  {item.value}
                </a>
              ) : (
                <span className="info-value">{item.value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Profile;
