import { useCart } from '../context/CartContext';
import { ProductSVG } from './ProductSVG';
import { categories } from '../data/products';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => <span key={i}>★</span>)}
      {half && <span>½</span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }, (_, i) => (
        <span key={`e-${i}`} style={{ opacity: 0.3 }}>★</span>
      ))}
    </span>
  );
}

function ProductCard({ product }) {
  const { addItem, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.some(w => w.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const categoryLabel = categories.find(c => c.id === product.category)?.label || product.category;

  const bgGlow = `radial-gradient(ellipse at 50% 0%, ${product.color}22 0%, transparent 70%)`;

  return (
    <article
      className={`product-card${product.inStock ? '' : ' out-of-stock'}`}
      role="article"
      aria-label={product.name}
    >
      <div className="card-image" style={{ background: bgGlow }}>
        {product.badge && (
          <span
            className="card-badge"
            style={{ background: product.badgeColor }}
            aria-label={product.badge}
          >
            {product.badge}
          </span>
        )}

        <button
          className={`card-wishlist${isWishlisted ? ' liked' : ''}`}
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        <ProductSVG type={product.image} color={product.color} size={140} />
      </div>

      <div className="card-body">
        <span className="card-category">{categoryLabel}</span>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="card-specs">
          {product.specs.map(spec => (
            <span key={spec} className="spec-tag">{spec}</span>
          ))}
        </div>

        <div className="card-rating">
          <StarRating rating={product.rating} />
          <span style={{ color: 'var(--shop-text)', fontWeight: 600 }}>{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
          {!product.inStock && (
            <span style={{ color: 'var(--shop-red)', fontWeight: 600, marginLeft: 'auto' }}>
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="card-price">
          <span className="price-current">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
          {discount && (
            <span className="price-discount">-{discount}%</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          {product.inStock ? '+ Cart' : 'Sold Out'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
