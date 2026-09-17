import { useCart } from '../context/CartContext';

export default function ShopNav({ searchQuery, onSearch }) {
  const { totalItems, setCartOpen, wishlist } = useCart();

  return (
    <nav className="shop-nav">
      <a className="shop-nav-logo" href="#shop" aria-label="NexusGear home">
        <div className="logo-icon">⚡</div>
        <span>NexusGear</span>
      </a>

      <div className="shop-nav-search">
        <span className="search-icon">🔍</span>
        <input
          type="search"
          placeholder="Search gaming accessories..."
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <div className="shop-nav-actions">
        <button
          className="nav-icon-btn"
          aria-label={`Wishlist (${wishlist.length} items)`}
          title="Wishlist"
        >
          ♡ <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{wishlist.length}</span>
        </button>

        <button
          className="nav-icon-btn"
          onClick={() => setCartOpen(true)}
          aria-label={`Shopping cart (${totalItems} items)`}
        >
          🛒
          {totalItems > 0 && (
            <span className="nav-badge" key={totalItems}>{totalItems}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
