import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className={`shop-toast ${toast.type}`} role="status" aria-live="polite">
      <span className="toast-icon">✅</span>
      {toast.message}
    </div>
  );
}
