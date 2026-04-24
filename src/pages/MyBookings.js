import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(savedBookings.reverse());
  }, []);

  return (
    <div style={{ padding: '60px 5%', maxWidth: '1000px', margin: 'auto', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ color: 'var(--sheen-green)' }}>My Bookings</h1>
        <Link to="/" className="login-btn" style={{ background: 'transparent', color: 'var(--sheen-green)', border: '2px solid var(--sheen-green)' }}>Back to Home</Link>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: 'var(--sheen-green)', marginBottom: '10px' }}>No bookings found!</h3>
          <p style={{ color: '#666' }}>You haven't booked any packages yet.</p>
          <Link to="/packages" className="search-btn" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none', maxWidth: '200px' }}>Explore Packages</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {bookings.map((b, index) => (
            <div key={index} style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderLeft: '6px solid var(--gold-solid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              
              <div>
                <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold', marginBottom: '5px' }}>BOOKING ID: #{b.id.toUpperCase()}</p>
                <h3 style={{ color: 'var(--sheen-green)', fontSize: '1.4rem', marginBottom: '8px' }}>{b.packageTitle}</h3>
                <p style={{ fontSize: '0.95rem', color: '#555', fontWeight: '500' }}>
                  📅 Date: {b.date} &nbsp; | &nbsp; 👥 Travelers: {b.travelers} Person(s)
                </p>
              </div>
              
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <p style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '8px' }}>₹{b.amount.toLocaleString('en-IN')}</p>
                <span style={{ background: '#e6f4ea', color: '#1e7e34', padding: '6px 12px', borderRadius: '25px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block' }}>
                  {b.status}
                </span>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;