import { useCart } from '../context/CartContext';
import { ProductSVG } from './ProductSVG';

export default function CartDrawer() {
  const {
    items, cartOpen, setCartOpen,
    removeItem, changeQty, clearCart,
    totalItems, totalPrice,
  } = useCart();

  if (!cartOpen) return null;

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart" aria-modal="true">
        <div className="cart-header">
          <h2>🛒 Your Cart {totalItems > 0 && <span style={{ color: 'var(--shop-muted)', fontWeight: 400, fontSize: '0.9rem' }}>({totalItems} items)</span>}</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {items.length > 0 && (
              <button
                className="cart-close"
                onClick={clearCart}
                aria-label="Clear cart"
                title="Clear all"
                style={{ fontSize: '0.75rem', width: 'auto', borderRadius: '6px', padding: '0 0.75rem' }}
              >
                Clear
              </button>
            )}
            <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3 style={{ color: 'var(--shop-text)', fontWeight: 700 }}>Your cart is empty</h3>
            <p style={{ fontSize: '0.875rem' }}>Add some epic gaming gear to get started!</p>
            <button className="btn-primary" onClick={() => setCartOpen(false)}>
              Browse Products →
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-items" role="list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div
                    className="cart-item-img"
                    style={{ background: `${item.color}22` }}
                    aria-hidden="true"
                  >
                    <ProductSVG type={item.image} color={item.color} size={48} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-name" title={item.name}>{item.name}</div>
                    <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => changeQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="qty-value" aria-live="polite">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => changeQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                      <span style={{ fontSize: '0.75rem', color: 'var(--shop-muted)', marginLeft: '0.25rem' }}>
                        × ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping {shipping === 0 && <span style={{ color: 'var(--shop-green)', fontSize: '0.75rem' }}>FREE</span>}</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 100 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--shop-muted)', textAlign: 'center', marginBottom: '1rem' }}>
                  Add <strong style={{ color: 'var(--shop-green)' }}>${(100 - totalPrice).toFixed(2)}</strong> more for free shipping! 🚀
                </p>
              )}

              <button
                className="checkout-btn"
                onClick={() => alert('🎮 Checkout coming soon! This is a demo shop.')}
                aria-label="Proceed to checkout"
              >
                Checkout — ${grandTotal.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
