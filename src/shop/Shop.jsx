import { useState, useMemo, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { products, categories } from './data/products';
import ShopNav from './components/ShopNav';
import Hero from './components/Hero';
import FeaturedBanner from './components/FeaturedBanner';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import ShopFooter from './components/ShopFooter';
import './Shop.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'discount', label: 'Biggest Discount' },
];

const TRUST_BADGES = [
  { icon: '🚀', title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: '🔄', title: '30-Day Returns', desc: 'No questions asked' },
  { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL encrypted' },
  { icon: '🏆', title: 'Top Brands Only', desc: 'Razer, HyperX, Logitech & more' },
  { icon: '💬', title: '24/7 Support', desc: 'Chat with our team' },
];

function ShopContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const gridRef = useRef(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.some(s => s.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discB - discA;
        });
        break;
      default: // featured — keep original order
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    scrollToGrid();
  };

  return (
    <div className="shop-root">
      <ShopNav searchQuery={searchQuery} onSearch={setSearchQuery} />
      <Hero onShopNow={scrollToGrid} />

      {/* Trust Badges */}
      <div className="trust-bar" role="list" aria-label="Shopping guarantees">
        {TRUST_BADGES.map(badge => (
          <div key={badge.title} className="trust-item" role="listitem">
            <span className="trust-icon" aria-hidden="true">{badge.icon}</span>
            <div className="trust-text">
              <h4>{badge.title}</h4>
              <p>{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <FeaturedBanner />

      {/* Category filters */}
      <nav className="shop-filters" role="navigation" aria-label="Product categories" ref={gridRef}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-chip${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Sort & count bar */}
      <div className="shop-bar">
        <p className="shop-bar-count">
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          {activeCategory !== 'all' && (
            <> in <strong>{categories.find(c => c.id === activeCategory)?.label}</strong></>
          )}
          {searchQuery && (
            <> for "<strong>{searchQuery}</strong>"</>
          )}
        </p>
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <main className="shop-grid" aria-label="Product listings">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button
              className="btn-primary"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              style={{ margin: '1rem auto 0', display: 'inline-flex' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <ShopFooter />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function Shop() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
