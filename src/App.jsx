import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Story from './pages/Story.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { loadMenu } from './utils/mockLoader.js';
import { menuItems } from './data/menu.js';

function Application() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availabilityChanged, setAvailabilityChanged] = useState(false);

  const fetchMenu = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await loadMenu();
      setItems(data.map(item => item.id === 'bakery-01' && availabilityChanged ? { ...item, stock: 0 } : item));
    } catch (err) { setError(err.message || 'Something went wrong while loading the menu.'); }
    finally { setLoading(false); }
  }, [availabilityChanged]);

  useEffect(() => { fetchMenu(); }, [fetchMenu]);

  function toggleLoadFailure() {
    const next = sessionStorage.getItem('crumb-demo-load-failure') !== 'true';
    sessionStorage.setItem('crumb-demo-load-failure', String(next));
    fetchMenu();
  }
  function toggleAvailability() { setAvailabilityChanged(value => !value); }

  return <><Header/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/menu" element={<Menu items={items} loading={loading} error={error} onRetry={fetchMenu} onToggleFailure={toggleLoadFailure} onToggleAvailability={toggleAvailability} availabilityChanged={availabilityChanged} failureEnabled={sessionStorage.getItem('crumb-demo-load-failure')==='true'}/>}/>
    <Route path="/items/:id" element={<ItemDetails items={items} loading={loading} error={error}/>}/>
    <Route path="/cart" element={<Cart items={items}/>}/>
    <Route path="/checkout" element={<Checkout items={items}/>}/>
    <Route path="/confirmation" element={<Confirmation/>}/>
    <Route path="/our-story" element={<Story/>}/>
    <Route path="*" element={<main className="page-shell empty-state"><h1>Page not found</h1><p>That page isn't part of our menu.</p><a className="button" href="/">Go home</a></main>}/>
  </Routes><Footer/></>;
}

export default function App() {
  return <BrowserRouter><CartProvider><Application/></CartProvider></BrowserRouter>;
}
