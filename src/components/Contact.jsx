import { useEffect, useRef, useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

function Contact({ isActive = true, isHire = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const messageRef = useRef(null);

  useEffect(() => {
    if (!isHire) return;
    setFormData((prev) => ({
      ...prev,
      message: prev.message || "Hi Ilsim, I'd like to discuss hiring you for...",
    }));
    requestAnimationFrame(() => messageRef.current?.focus());
  }, [isHire]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipient = 'ilsimsayon@gmail.com';
    const subject = `${isHire ? 'Hiring Inquiry' : 'Portfolio Inquiry'} from ${formData.name}`;
    const body = `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="contact" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="section-heading">
        <span className="section-icon-badge">
          <Mail size={17} strokeWidth={2} />
        </span>
        <h2>{isHire ? 'Let’s Work Together' : 'Contact Me'}</h2>
      </div>
      {isHire && <p className="contact-hire-intro">Tell me about your project, role, timeline, and budget. I’ll get back to you by email.</p>}
      <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <div className="input-with-icon">
            <User size={16} strokeWidth={2} className="field-icon" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <Mail size={16} strokeWidth={2} className="field-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <div className="input-with-icon">
            <MessageSquare size={16} strokeWidth={2} className="field-icon" />
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows="5"
              placeholder={isHire ? 'Tell me about the role or project...' : 'Your Message'}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn primary-btn contact-btn">
          <Send size={16} strokeWidth={2} />
          {isHire ? 'Send Hiring Inquiry via Gmail' : 'Contact Me via Gmail'}
        </button>
      </form>
    </section>
  );
}

export default Contact;
