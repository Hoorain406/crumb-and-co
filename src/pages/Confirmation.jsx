import { Link } from 'react-router-dom';

export default function Confirmation() {
  let order = null;
  try { order = JSON.parse(localStorage.getItem('crumb-last-order') || 'null'); } catch { order = null; }
  if (!order) return <main className="page-shell narrow-shell"><div className="empty-state"><p className="eyebrow">NO RECENT ORDER</p><h1>Nothing to confirm just yet.</h1><p>Once you place a simulated order, your confirmation will appear here.</p><Link className="button" to="/menu">Explore the menu</Link></div></main>;
  return <main className="page-shell narrow-shell"><section className="confirmation-card"><div className="confirmation-mark">✓</div><p className="eyebrow">ORDER RECEIVED</p><h1>That's a wrap.</h1><p className="confirmation-intro">Thanks, {order.customer.name}. Your practice order has been recorded.</p><div className="confirmation-number">Order reference <strong>{order.orderNumber}</strong></div><div className="confirmation-details"><div><span>Pickup time</span><strong>{new Date(order.customer.pickup).toLocaleString()}</strong></div><div><span>Contact</span><strong>{order.customer.phone}</strong></div><div><span>Order total</span><strong>Rs. {order.total.toLocaleString()}</strong></div></div><p className="small-note">This is a simulated confirmation for the CS4032 assignment. No real order has been transmitted.</p><Link className="button" to="/menu">Back to the menu</Link></section></main>;
}
