import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { count } = useCart();
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" to="/"><span className="brand-mark">C</span><span>Crumb <i>&</i> Co.<small>CAFÉ · BAKERY</small></span></Link>
    <nav aria-label="Main navigation"><NavLink to="/menu">Menu</NavLink><NavLink to="/our-story">Our Story</NavLink><NavLink className="cart-link" to="/cart">Your order <span>{count}</span></NavLink></nav>
  </div></header>;
}
