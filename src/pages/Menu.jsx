import { useMemo, useState } from 'react';
import MenuCard from '../components/MenuCard.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Menu({ items, loading, error, onRetry, onToggleFailure, onToggleAvailability, availabilityChanged, failureEnabled }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const { addItem } = useCart();
  const categories = ['All', 'Drinks', 'Bakery', 'Food', 'Desserts'];
  const visible = useMemo(() => {
    const filtered = items.filter((item) => (category === 'All' || item.category === category) && `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'low') filtered.sort((a,b) => a.price-b.price);
    if (sort === 'high') filtered.sort((a,b) => b.price-a.price);
    if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
    return filtered;
  }, [items, query, category, sort]);
  return <main className="page-shell"><div className="page-heading"><p className="eyebrow">FRESH FROM OUR KITCHEN</p><h1>The menu</h1><p>A little something for every kind of day.</p></div>
    <div className="menu-controls"><label className="search-field">Search the menu<input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Try coffee, chocolate, pastry…" /></label><label>Sort by<select value={sort} onChange={(e)=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></label></div>
    <div className="filter-row" aria-label="Filter menu by category">{categories.map((c)=><button key={c} className={category===c?'filter-chip active':'filter-chip'} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    {loading && <p className="state-message">Preparing the menu…</p>}
    {error && <div className="state-message error-state"><p>{error}</p><button className="button" onClick={onRetry}>Try again</button></div>}
    {!loading && !error && items.length===0 && <div className="empty-state"><h2>The menu is empty right now.</h2><p>Please try loading the menu again.</p><button className="button" onClick={onRetry}>Reload menu</button></div>}
    {!loading && !error && items.length>0 && visible.length===0 && <div className="empty-state"><h2>No treats found</h2><p>Try another search or choose a different category.</p><button className="text-button" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>}
    {!loading && !error && visible.length>0 && <><p className="result-count">Showing {visible.length} of {items.length} menu items</p><div className="menu-grid">{visible.map(item=><MenuCard key={item.id} item={item} onAdd={addItem}/>)}</div></>}
    <details className="demo-controls"><summary>Assignment testing controls</summary><p>Use these controls to demonstrate recovery from loading failures and changes in availability.</p><div className="demo-actions"><button className="text-button" onClick={onToggleFailure}>{failureEnabled ? 'Turn off menu loading failure' : 'Simulate menu loading failure'}</button><button className="text-button" onClick={onToggleAvailability}>{availabilityChanged ? 'Restore croissant availability' : 'Mark butter croissant sold out'}</button></div></details>
  </main>;
}
