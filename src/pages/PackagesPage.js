import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; 
import logo from '../logo.jpeg';

const fallbackPackages = [
  { _id: '1', title: 'Premium Umrah 2026', type: 'Umrah', price: '110000', duration: '15 Days / 14 Nights', img: 'https://images.unsplash.com/photo-1565552643952-b4b159f81216?auto=format&fit=crop&q=80&w=500' },
  { _id: '2', title: 'Economy Umrah Package', type: 'Umrah', price: '75000', duration: '14 Days', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=500' },
  { _id: '3', title: 'Haj Deluxe Package', type: 'Haj', price: '350000', duration: '40 Days', img: 'https://images.unsplash.com/photo-1580281691888-c7a31b67f10b?auto=format&fit=crop&q=80&w=500' },
  { _id: '4', title: 'Baghdad Ziyarat Special', type: 'Ziyarat', price: '65000', duration: '10 Days', img: 'https://images.unsplash.com/photo-1541291887-8bc100e47087?auto=format&fit=crop&q=80&w=500' },
  { _id: '5', title: 'Ajmer Sharif Ziyarat', type: 'Ziyarat', price: '25000', duration: '5 Days', img: 'https://images.unsplash.com/photo-1580281691888-c7a31b67f10b?auto=format&fit=crop&q=80&w=500' },
  { _id: '6', title: 'Ramadan Special Umrah', type: 'Umrah', price: '145000', duration: '20 Days', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=500' },
  { _id: '7', title: 'Short Haj Package', type: 'Haj', price: '280000', duration: '20 Days', img: 'https://images.unsplash.com/photo-1565552643952-b4b159f81216?auto=format&fit=crop&q=80&w=500' }
];

function PackagesPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlType = queryParams.get('type') || 'All';
  const urlCity = queryParams.get('city') || '';

  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState(urlType);
  const [searchTerm, setSearchTerm] = useState(urlCity);

  useEffect(() => {
    const fetchPackages = async () => {
      // demo
      setPackages(fallbackPackages);
      setLoading(false);
      return; 

        // live mode
      /*
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (response.ok) {
          const apiData = await response.json();
          setPackages(apiData);
        } else {
          throw new Error("Backend connection failed");
        }
      } catch (error) {
        console.error("Failed to fetch from backend", error);
        setPackages(fallbackPackages);
      } finally {
        setLoading(false);
      }
      */
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let result = packages;

    if (filterType !== 'All') {
      result = result.filter(pkg => pkg.type === filterType);
    }

    if (searchTerm) {
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pkg.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPackages(result);
  }, [packages, filterType, searchTerm]);

  return (
    <div style={{ backgroundColor: 'var(--light-bg)', minHeight: '100vh' }}>
      
      <nav className="navbar" style={{ padding: '10px 5%' }}>
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
            <h2 className="brand-title" style={{ fontSize: '1rem' }}>SHEEN INTERNATIONAL</h2>
          </Link>
        </div>
        <Link to="/" className="login-btn" style={{ background: 'transparent', color: 'var(--sheen-green)', border: '2px solid var(--sheen-green)' }}>
          Back to Home
        </Link>
      </nav>

      <div style={{ background: 'var(--sheen-green)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '10px' }}>Our Packages</h1>
        <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Find the perfect journey for your soul</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-30px auto 40px', background: 'white', padding: '20px 30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative', zIndex: '10', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--sheen-green)', display: 'block', marginBottom: '5px' }}>CATEGORY</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none', fontFamily: 'Poppins' }}
          >
            <option value="All">All Packages</option>
            <option value="Umrah">Umrah</option>
            <option value="Haj">Haj</option>
            <option value="Ziyarat">Ziyarat</option>
          </select>
        </div>

        <div style={{ flex: '2', minWidth: '250px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--sheen-green)', display: 'block', marginBottom: '5px' }}>SEARCH PACKAGES</label>
          <input 
            type="text" 
            placeholder="Search by city, name, or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none', fontFamily: 'Poppins' }}
          />
        </div>
        
      </div>

      <section className="packages-section" style={{ paddingTop: '10px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--sheen-green)', fontSize: '1.2rem' }}>Loading our best packages...</p>
        ) : (
          <div>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Showing {filteredPackages.length} package(s)</p>
            
            <div className="package-grid">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <div key={pkg._id} className="package-card">
                    <img src={pkg.img} alt={pkg.title} className="package-img" />
                    <div className="package-info">
                      <h3 className="package-title">{pkg.title}</h3>
                      <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '10px' }}>🕒 {pkg.duration}</p>
                      <p className="package-price">₹{Number(pkg.price).toLocaleString('en-IN')}</p>
                      <Link to={`/package/${pkg._id}`} className="book-btn">View Details</Link>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0' }}>
                  <h3 style={{ color: 'var(--sheen-green)' }}>No packages found!</h3>
                  <p style={{ color: '#777' }}>Try adjusting your search filters.</p>
                  <button onClick={() => { setFilterType('All'); setSearchTerm(''); }} className="login-btn" style={{ marginTop: '15px' }}>Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}

export default PackagesPage;