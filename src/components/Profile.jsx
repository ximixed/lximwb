import { UserCircle, GraduationCap, BookOpen, Target, CalendarClock, Layers3, Code2, Sparkles } from 'lucide-react';

function Profile({ isActive = true }) {
  const profileDetails = [
    {
      label: 'Institution',
      value: 'Mount Carmel College Escalante Inc.',
      isLink: true,
      href: 'https://mccei.edu.ph/',
      Icon: GraduationCap,
    },
    {
      label: 'Program',
      value: 'College BS Information Systems',
      Icon: BookOpen,
    },
    {
      label: 'Focus',
      value: 'Front End Web Developer',
      Icon: Target,
    },
    {
      label: 'Status in School',
      value: 'Currently Enrolled 2nd Year',
      Icon: CalendarClock,
    },
    {
      label: 'Field',
      value: 'ICT / CSS / IT / IS',
      Icon: Layers3,
    },
    {
      label: 'Core Tech',
      value: 'HTML, CSS, JavaScript, PHP, C++, React',
      Icon: Code2,
    },
    {
      label: 'Specialty',
      value: 'Web Developer / UI/UX Designer',
      Icon: Sparkles,
    },
  ];

  return (
    <section id="profile" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="section-heading">
        <span className="section-icon-badge">
          <UserCircle size={17} strokeWidth={2} />
        </span>
        <h2>My Profile</h2>
      </div>
      <div className="profile-card">
        <span className="mini-tick mini-tick-tl" aria-hidden="true"></span>
        <span className="mini-tick mini-tick-br" aria-hidden="true"></span>
        <ul className="info-list">
          {profileDetails.map((item, index) => (
            <li key={index} className="info-item">
              <span className="info-label">
                <item.Icon size={15} strokeWidth={2} className="info-icon" />
                {item.label}
              </span>
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
