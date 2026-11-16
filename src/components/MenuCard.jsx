import { Link } from 'react-router-dom';
export default function MenuCard({ item, onAdd }) {
  return <article className="menu-card">
    <Link to={`/items/${item.id}`} className="card-image-link"><img src={item.image} alt={item.name} /><span className="category-tag">{item.category}</span></Link>
    <div className="menu-card-body"><div className="card-title-row"><h3><Link to={`/items/${item.id}`}>{item.name}</Link></h3><strong>Rs. {item.price.toLocaleString()}</strong></div>
      <p>{item.description}</p><div className="card-bottom"><span className={item.stock > 0 ? 'stock' : 'stock unavailable'}>{item.stock > 0 ? `${item.stock} available` : 'Sold out'}</span><button className="button button-small" disabled={!item.stock} onClick={() => onAdd(item)}>Add</button></div>
    </div>
  </article>;
}
