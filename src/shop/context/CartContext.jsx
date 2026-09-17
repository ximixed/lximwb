import { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CHANGE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', product });
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const changeQty = (id, qty) => dispatch({ type: 'CHANGE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(w => w.id === product.id)
        ? prev.filter(w => w.id !== product.id)
        : [...prev, product]
    );
  };

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      cartOpen, setCartOpen,
      wishlist, toggleWishlist,
      toast, setToast,
      addItem, removeItem, changeQty, clearCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
