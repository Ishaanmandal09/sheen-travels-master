import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

// ডেমো ডেটা
const fallbackPackages = [
  { _id: '1', title: 'Premium Umrah 2026', type: 'Umrah', price: '110000', duration: '15 Days', img: 'https://images.unsplash.com/photo-1565552643952-b4b159f81216?auto=format&fit=crop&q=80&w=500' },
  { _id: '2', title: 'Economy Umrah Package', type: 'Umrah', price: '75000', duration: '14 Days', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=500' },
  { _id: '3', title: 'Haj Deluxe Package', type: 'Haj', price: '350000', duration: '40 Days', img: 'https://images.unsplash.com/photo-1580281691888-c7a31b67f10b?auto=format&fit=crop&q=80&w=500' },
  { _id: '4', title: 'Baghdad Ziyarat Special', type: 'Ziyarat', price: '65000', duration: '10 Days', img: 'https://images.unsplash.com/photo-1541291887-8bc100e47087?auto=format&fit=crop&q=80&w=500' }
];

function BookingPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  
  // ফর্ম স্টেট
  const [travelers, setTravelers] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const foundPackage = fallbackPackages.find(pkg => pkg._id === id);
    if (foundPackage) {
      setPackageData(foundPackage);
      setTotalPrice(Number(foundPackage.price)); 
    }
  }, [id]);

  useEffect(() => {
    if (packageData) {
      setTotalPrice(Number(packageData.price) * travelers);
    }
  }, [travelers, packageData]);

  // ==========================================
  // পেমেন্ট এবং বুকিং লজিক (Demo vs Live)
  // ==========================================
  const handlePayment = (e) => {
    e.preventDefault();
    if(!contactName || !phone) {
        alert("Please fill all details!");
        return;
    }

    const token = localStorage.getItem('token');

    // =========================================================
    //  DEMO MODE: Local Storage-এ সেভ হবে
    // =========================================================
    if (token === 'demo-user-token-67890' || token === 'demo-admin-token-12345' || !token) {
      const newBooking = {
        id: Math.random().toString(36).substr(2, 9), // র‍্যান্ডম বুকিং আইডি
        packageTitle: packageData.title,
        amount: totalPrice,
        travelers: travelers,
        date: new Date().toLocaleDateString(),
        status: 'Confirmed (Demo)'
      };

      const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('myBookings', JSON.stringify(existingBookings));

      alert("Demo Booking Successful! Saving to your account...");
      navigate('/my-bookings'); 
      return;
    }

    // =========================================================
    //  LIVE MODE: Payment Gateway (Live করার সময় এটা আনকমেন্ট করবেন)
    // =========================================================
    /*
    alert("Redirecting to Razorpay Payment Gateway... Please wait.");
    
    // এখানে Razorpay/Stripe এর কোড বসবে। পেমেন্ট সাকসেস হলে API কল করে ডাটাবেসে সেভ হবে:
    // fetch('http://localhost:5000/api/bookings/add', { method: 'POST', body: ... })
    // .then(() => navigate('/my-bookings'));
    */
  };

  if (!packageData) return <h2 style={{textAlign: 'center', marginTop: '100px'}}>Loading Package Details...</h2>;

  return (
    <div style={{ padding: '60px 5%', maxWidth: '1000px', margin: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ color: 'var(--sheen-green)', textAlign: 'center' }}>Confirm Your Booking</h1>
        <Link to="/my-bookings" className="login-btn" style={{ background: 'transparent', color: 'var(--sheen-green)', border: '2px solid var(--sheen-green)' }}>
          View My Bookings ➔
        </Link>
      </div>
      
      <div className="booking-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', margin: '0 auto', padding: '30px' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img src={packageData.img} alt="Package" style={{ width: '100%', borderRadius: '10px', height: '250px', objectFit: 'cover' }} />
          <h2 style={{ color: 'var(--sheen-green)', marginTop: '20px' }}>{packageData.title}</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Duration: {packageData.duration}</p>
          <p style={{ color: 'var(--gold-solid)', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px' }}>
            Base Price: ₹{Number(packageData.price).toLocaleString('en-IN')} / person
          </p>
        </div>

        <div style={{ flex: '1', minWidth: '300px', background: '#fdfdfd', padding: '20px', borderRadius: '10px', border: '1px solid #eee' }}>
          <h3 style={{ borderBottom: '2px solid var(--gold-solid)', paddingBottom: '10px', marginBottom: '20px' }}>Billing Summary</h3>
          
          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Enter your name" />
            </div>
            
            <div className="input-group">
              <label>Contact Number</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            </div>

            <div className="input-group">
              <label>Number of Travelers</label>
              <input 
                type="number" 
                min="1" 
                max="20" 
                value={travelers} 
                onChange={(e) => setTravelers(parseInt(e.target.value) || 1)} 
              />
            </div>

            <div style={{ background: 'var(--sheen-green)', color: 'white', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Travelers:</span>
                <span>{travelers} Person(s)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--gold-solid)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button type="submit" className="login-btn" style={{ width: '100%', textAlign: 'center', marginTop: '10px', fontSize: '1.1rem' }}>
              Pay & Confirm Booking
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default BookingPage;