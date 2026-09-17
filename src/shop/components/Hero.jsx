import { useCart } from '../context/CartContext';

export default function Hero({ onShopNow }) {
  const { totalItems } = useCart();

  return (
    <section className="shop-hero" id="shop-hero">
      <div className="shop-hero-eyebrow">
        ⚡ Gaming Gear 2026
      </div>
      <h1>Level Up Your<br />Gaming Setup</h1>
      <p>
        Premium gaming accessories for every player — from pro esports athletes
        to casual gamers. Top brands, unbeatable prices.
      </p>
      <div className="shop-hero-cta">
        <button className="btn-primary" onClick={onShopNow}>
          Shop Now →
        </button>
        <button className="btn-outline">
          🎮 View All Brands
        </button>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">200+</div>
          <div className="hero-stat-label">Products</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">50k+</div>
          <div className="hero-stat-label">Happy Gamers</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">4.9★</div>
          <div className="hero-stat-label">Avg. Rating</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">24h</div>
          <div className="hero-stat-label">Fast Shipping</div>
        </div>
      </div>
    </section>
  );
}
