import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart({ items }) {
  const { cart, total, count, removeItem, updateQuantity, notice, setNotice } = useCart();
  const conflicts = cart.filter(entry => { const current = items.find(item => item.id === entry.id); return !current || current.stock < entry.quantity; });
  return <main className="page-shell narrow-shell"><div className="page-heading"><p className="eyebrow">YOUR LITTLE LINE-UP</p><h1>Your order</h1><p>Take a look before we get it ready.</p></div>
    {notice && <p className="notice" role="status">{notice} <button onClick={()=>setNotice('')} aria-label="Dismiss message">×</button></p>}
    {cart.length===0 ? <div className="empty-state"><h2>Your order is empty.</h2><p>There are plenty of good things on the menu.</p><Link className="button" to="/menu">Browse the menu</Link></div> : <>
      <div className="cart-list">{cart.map(item=><article className="cart-row" key={`${item.id}-${item.milk}`}><img src={item.image} alt=""/><div className="cart-item-info"><h3>{item.name}</h3><p>{item.milk!=='Regular milk'?item.milk:'Standard preparation'}</p><strong>Rs. {item.price.toLocaleString()}</strong>{conflicts.some(entry=>entry.id===item.id) && <p className="form-error">Availability changed. Remove this item or wait until it is available again.</p>}</div><label className="cart-quantity">Qty<input type="number" min="1" max={Math.min(item.stock,6)} value={item.quantity} onChange={e=>updateQuantity(item.id,item.milk,Number(e.target.value))}/></label><div className="cart-line-total">Rs. {(item.price*item.quantity).toLocaleString()}<button className="remove-button" onClick={()=>removeItem(item.id,item.milk)}>Remove</button></div></article>)}</div>
      <div className="order-total"><span>{count} {count===1?'item':'items'}</span><strong>Rs. {total.toLocaleString()}</strong></div><p className="small-note">Pickup is free. This is a simulated order for the assignment; no payment will be collected.</p>{conflicts.length>0 && <p className="form-error" role="alert">Your selection includes an unavailable item or a quantity above current stock. Correct your order before checkout.</p>}<div className="cart-actions"><Link className="text-link" to="/menu">Continue browsing</Link>{conflicts.length===0 ? <Link className="button" to="/checkout">Continue to pickup details</Link> : <span className="small-note">Checkout is paused until availability is resolved.</span>}</div>
    </>}
  </main>;
}
