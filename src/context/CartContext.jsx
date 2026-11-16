import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { checkStock } from '../utils/businessRules.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crumb-cart') || '[]'); }
    catch { return []; }
  });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try { localStorage.setItem('crumb-cart', JSON.stringify(cart)); }
    catch { setNotice('Your browser storage is full. Your latest changes may not be saved.'); }
  }, [cart]);

  function addItem(item, quantity = 1, milk = 'Regular milk') {
    const existing = cart.find((entry) => entry.id === item.id && entry.milk === milk);
    const nextQuantity = (existing?.quantity || 0) + quantity;
    const result = checkStock(item, nextQuantity);
    if (!result.valid) { setNotice(result.message); return false; }
    setCart((current) => {
      const match = current.find((entry) => entry.id === item.id && entry.milk === milk);
      if (match) return current.map((entry) => entry.id === item.id && entry.milk === milk ? { ...entry, quantity: entry.quantity + quantity } : entry);
      return [...current, { ...item, quantity, milk }];
    });
    setNotice(`${item.name} added to your order.`);
    return true;
  }

  function removeItem(id, milk) {
    setCart((current) => current.filter((entry) => !(entry.id === id && entry.milk === milk)));
  }
  function updateQuantity(id, milk, quantity) {
    const entry = cart.find((item) => item.id === id && item.milk === milk);
    if (!entry) return;
    const result = checkStock(entry, quantity);
    if (!result.valid) { setNotice(result.message); return; }
    setCart((current) => current.map((item) => item.id === id && item.milk === milk ? { ...item, quantity } : item));
  }
  function clearCart() { setCart([]); }

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const value = { cart, total, count, notice, setNotice, addItem, removeItem, updateQuantity, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
