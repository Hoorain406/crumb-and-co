import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { checkPickupTime } from '../utils/businessRules.js';

function defaultPickup() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  date.setMinutes(Math.ceil(date.getMinutes()/15)*15,0,0);
  const local = new Date(date.getTime()-date.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,16);
}

export default function Checkout({ items }) {
  const { cart, total, count, clearCart } = useCart();
  const [form, setForm] = useState({ name:'', phone:'', pickup:defaultPickup(), notes:'' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const conflicts = cart.filter(entry => { const current = items.find(item => item.id === entry.id); return !current || current.stock < entry.quantity; });
  function change(e) { setForm(current=>({...current,[e.target.name]:e.target.value})); }
  function submit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name='Please enter your name (at least 2 characters).';
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) nextErrors.phone='Enter a valid phone number.';
    const pickup = checkPickupTime(form.pickup);
    if (!pickup.valid) nextErrors.pickup=pickup.message;
    if (!cart.length) nextErrors.cart='Your order is empty. Add an item before continuing.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const order = { orderNumber:`CC-${Date.now().toString().slice(-6)}`, customer:{...form}, items:cart, total, count, placedAt:new Date().toISOString() };
    localStorage.setItem('crumb-last-order',JSON.stringify(order));
    clearCart();
    navigate('/confirmation');
  }
  if (!cart.length) return <main className="page-shell narrow-shell"><div className="empty-state"><h1>Nothing to check out yet.</h1><p>Add something from our menu first.</p><Link className="button" to="/menu">Browse the menu</Link></div></main>;
  return <main className="page-shell narrow-shell"><div className="page-heading"><p className="eyebrow">ALMOST THERE</p><h1>Pickup details</h1><p>Tell us how to prepare your order.</p></div>
    {conflicts.length>0 && <div className="state-message error-state"><p>Availability has changed for one or more items in your order. Return to your cart to correct the selection before checkout.</p><Link className="button" to="/cart">Review your cart</Link></div>}
    <div className="checkout-layout"><form className="checkout-form" onSubmit={submit} noValidate>
      <label className="form-field">Your name<input name="name" value={form.name} onChange={change} placeholder="e.g. Ayesha Khan" aria-invalid={!!errors.name}/>{errors.name&&<small className="form-error">{errors.name}</small>}</label>
      <label className="form-field">Phone number<input name="phone" value={form.phone} onChange={change} placeholder="e.g. 03XX XXXXXXX" aria-invalid={!!errors.phone}/>{errors.phone&&<small className="form-error">{errors.phone}</small>}</label>
      <label className="form-field">Pickup date and time<input type="datetime-local" name="pickup" value={form.pickup} onChange={change} aria-invalid={!!errors.pickup}/><small>Please choose a time at least 30 minutes from now.</small>{errors.pickup&&<small className="form-error">{errors.pickup}</small>}</label>
      <label className="form-field">Special instructions <span className="optional">Optional</span><textarea name="notes" value={form.notes} onChange={change} rows="3" maxLength="180" placeholder="Anything we should know?"/></label>
      {errors.cart&&<p className="form-error">{errors.cart}</p>}<button className="button" type="submit" disabled={conflicts.length>0}>Place simulated order</button><p className="small-note">No payment details are requested. This order is simulated and will not be sent to a real café.</p>
    </form><aside className="checkout-summary"><h2>Order summary</h2>{cart.map(item=><div className="summary-line" key={`${item.id}-${item.milk}`}><span>{item.quantity} × {item.name}</span><strong>Rs. {(item.price*item.quantity).toLocaleString()}</strong></div>)}<div className="summary-total"><span>{count} items</span><strong>Rs. {total.toLocaleString()}</strong></div><Link className="text-link" to="/cart">Edit your order</Link></aside></div>
  </main>;
}
