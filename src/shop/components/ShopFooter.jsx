export default function ShopFooter() {
  return (
    <footer className="shop-footer">
      <div className="shop-footer-grid">
        <div className="footer-col">
          <h4>⚡ NexusGear</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li>Gaming Headsets</li>
            <li>Gaming Mice</li>
            <li>Keyboards</li>
            <li>Controllers</li>
            <li>Monitors</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Order Tracking</li>
            <li>Returns & Refunds</li>
            <li>Warranty</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NexusGear. All rights reserved. Built with ⚡ React.</p>
        <div className="footer-socials">
          {['𝕏', '📘', '📸', '▶️', '🎮'].map((icon, i) => (
            <button key={i} className="social-btn" aria-label={`Social link ${i + 1}`}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
