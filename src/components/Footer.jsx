import { FaGithub, FaLinkedin, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';
import GhostFibers from './GhostFibers.jsx';

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
    <footer>
      <div className="footer-ghost-fibers" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          layers={3}
          glowIntensity={1.4}
          vignette={0.4}
          dpr={1}
        />
      </div>
      <div className="footer-content">
        <p>&copy; {currentYear} Ilsim Sayon. All rights reserved.</p>
        <div className="footer-links">
          {socialLinks.map(({ label, url, Icon }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer">
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
