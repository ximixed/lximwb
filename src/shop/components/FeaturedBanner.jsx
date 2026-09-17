import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductSVG } from './ProductSVG';

const featuredProduct = products.find(p => p.id === 15); // Secretlab Chair

export default function FeaturedBanner() {
  const { addItem } = useCart();

  const discount = featuredProduct.originalPrice
    ? Math.round(((featuredProduct.originalPrice - featuredProduct.price) / featuredProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="featured-section">
      <h2>🔥 Deal of the Day</h2>
      <div className="featured-banner">
        <div className="featured-content">
          <div className="featured-banner-badge">⭐ Editor's Choice</div>
          <h3>{featuredProduct.name}</h3>
          <p>{featuredProduct.description}</p>
          <div className="featured-price-row">
            <span className="featured-price">${featuredProduct.price}</span>
            {featuredProduct.originalPrice && (
              <>
                <span className="featured-price-original">${featuredProduct.originalPrice}</span>
                <span className="featured-save">Save {discount}%</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => addItem(featuredProduct)}>
              🛒 Add to Cart
            </button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
        <div className="featured-img" aria-hidden="true">
          <ProductSVG type={featuredProduct.image} color={featuredProduct.color} size={180} />
        </div>
      </div>
    </div>
  );
}
