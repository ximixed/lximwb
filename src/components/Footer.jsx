import { FaGithub, FaLinkedin, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/ximixed', Icon: FaGithub },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ilsim-sayon-0b2b3a24a/', Icon: FaLinkedin },
    { label: 'Tiktok', url: 'https://www.tiktok.com/@xixixixixim', Icon: FaTiktok },
    { label: 'Facebook', url: 'https://www.facebook.com/redockradeht', Icon: FaFacebook },
    { label: 'Instagram', url: 'https://www.instagram.com/ximsyn/', Icon: FaInstagram },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-copyright">&copy; {currentYear} Ilsim Sayon. All rights reserved.</p>
        <div className="footer-links">
          {socialLinks.map(({ label, url, Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={label}
            >
              <Icon size={15} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
