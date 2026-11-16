import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { checkCustomization, checkStock } from '../utils/businessRules.js';

export default function ItemDetails({ items, loading, error }) {
  const { id } = useParams();
  const item = items.find((entry) => entry.id === id);
  const [quantity, setQuantity] = useState(1);
  const [milk, setMilk] = useState('Regular milk');
  const [message, setMessage] = useState('');
  const { addItem } = useCart();
  const navigate = useNavigate();
  if (loading) return <main className="page-shell"><p className="state-message">Loading menu item…</p></main>;
  if (error) return <main className="page-shell"><div className="empty-state"><h1>We couldn't load this item.</h1><p>{error}</p><Link className="button" to="/menu">Return to menu</Link></div></main>;
  if (!item) return <main className="page-shell"><div className="empty-state"><p className="eyebrow">MENU ITEM NOT FOUND</p><h1>That treat isn't on our menu.</h1><p>It may have been removed or the link may be incorrect.</p><Link className="button" to="/menu">Back to menu</Link></div></main>;
  function handleAdd() {
    const stock = checkStock(item, quantity);
    const customization = checkCustomization(item, milk);
    if (!stock.valid) return setMessage(stock.message);
    if (!customization.valid) return setMessage(customization.message);
    if (addItem(item, quantity, item.customizable ? milk : 'Regular milk')) navigate('/cart');
  }
  return <main className="page-shell"><Link className="back-link" to="/menu">← Back to menu</Link><section className="detail-layout"><div className="detail-image"><img src={item.image} alt={item.name}/></div><div className="detail-copy"><p className="eyebrow">{item.category.toUpperCase()}</p><h1>{item.name}</h1><p className="detail-price">Rs. {item.price.toLocaleString()}</p><p className="detail-description">{item.description}</p><p className={item.stock>0?'stock':'stock unavailable'}>{item.stock>0?`${item.stock} available today`:'Currently sold out'}</p>
    {item.customizable && <label className="form-field">Milk preference<select value={milk} onChange={e=>setMilk(e.target.value)}><option>Regular milk</option><option>Oat milk</option><option>Almond milk</option></select><small>Milk alternatives are available for selected drinks only.</small></label>}
    <label className="form-field quantity-field">Quantity<input type="number" min="1" max={Math.min(item.stock,6)} value={quantity} onChange={e=>setQuantity(Number(e.target.value))}/><small>Maximum 6 per menu item and subject to available stock.</small></label>
    {message && <p className="form-error" role="alert">{message}</p>}<button className="button" disabled={!item.stock} onClick={handleAdd}>Add to your order</button>
  </div></section></main>;
}
