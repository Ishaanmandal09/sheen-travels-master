import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  const [newPackage, setNewPackage] = useState({
    title: '', type: 'Umrah', price: '', duration: '', img: ''
  });

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      // =========================================================
      // 🟢 DEMO MODE BYPASS (Comment this OUT when going LIVE)
      // =========================================================
      if (token === 'demo-admin-token-12345') {
        setIsVerified(true);
        setChecking(false);
        return;
      }
      // ======================= DEMO END ========================

      // =========================================================
      // 🔴 LIVE MODE API CHECK (Uncomment this when going LIVE)
      // =========================================================
      /*
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify-admin', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) setIsVerified(true); 
          else navigate('/login'); 
        } else {
          navigate('/login'); 
        }
      } catch (error) {
        console.error("Security Check Failed:", error);
        navigate('/login'); 
      } finally {
        setChecking(false);
      }
      */
      
      // ডেমো মোড চলাকালীন নিচের লাইনটা সরাতে হবে না। লাইভ করার সময় এটা ডিলিট করে দেবেন।
      setChecking(false); 
    };

    verifyAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // =========================================================
    // 🟢 DEMO MODE UPLOAD (Comment this OUT when going LIVE)
    // =========================================================
    if (token === 'demo-admin-token-12345') {
      alert(`[DEMO MODE] New Package Added: ${newPackage.title}`);
      setNewPackage({ title: '', type: 'Umrah', price: '', duration: '', img: '' });
      return;
    }
    // ======================= DEMO END ========================

    // =========================================================
    // 🔴 LIVE MODE UPLOAD (Uncomment this when going LIVE)
    // =========================================================
    /*
    try {
      const response = await fetch('http://localhost:5000/api/packages/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPackage)
      });

      if (response.ok) {
        alert(`New Package Added Successfully!`);
        setNewPackage({ title: '', type: 'Umrah', price: '', duration: '', img: '' });
      } else {
        alert("Failed to add package.");
      }
    } catch (error) {
      console.error("Error adding package", error);
    }
    */
  };

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--light-bg)' }}>
        <h2 style={{ color: 'var(--sheen-green)' }}>Verifying Security Check... 🔒</h2>
      </div>
    );
  }

  if (!isVerified) return null;

  return (
    <div style={{ padding: '40px 5%', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ color: 'var(--sheen-green)' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} className="login-btn" style={{ background: 'red', color: 'white', border: 'none' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '2px solid var(--gold-solid)', paddingBottom: '10px' }}>Add New Package</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="input-group">
              <label>Package Title</label>
              <input type="text" value={newPackage.title} placeholder="e.g. Luxury Umrah" required onChange={(e)=>setNewPackage({...newPackage, title: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Category</label>
              <select value={newPackage.type} onChange={(e)=>setNewPackage({...newPackage, type: e.target.value})}>
                <option value="Umrah">Umrah</option>
                <option value="Haj">Haj</option>
                <option value="Ziyarat">Ziyarat</option>
              </select>
            </div>
            <div className="input-group">
              <label>Price (INR)</label>
              <input type="number" value={newPackage.price} placeholder="95000" required onChange={(e)=>setNewPackage({...newPackage, price: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Duration</label>
              <input type="text" value={newPackage.duration} placeholder="15 Days" required onChange={(e)=>setNewPackage({...newPackage, duration: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input type="text" value={newPackage.img} placeholder="https://image-link.com" required onChange={(e)=>setNewPackage({...newPackage, img: e.target.value})} />
            </div>
            <button type="submit" className="search-btn">Upload Package</button>
          </form>
        </div>

        <div style={{ background: 'var(--sheen-green)', color: 'white', padding: '30px', borderRadius: '15px', height: 'fit-content' }}>
          <h3>Quick Stats</h3>
          <div style={{ marginTop: '20px', lineHeight: '2' }}>
            <p>Total Packages: <b>Dynamic</b></p>
            <p>Active Bookings: <b>Dynamic</b></p>
            <p>Database Status: <b style={{ color: 'orange' }}>Local Demo Mode ⚠️</b></p>
          </div>
          <button className="login-btn" style={{ marginTop: '30px', width: '100%', background: 'var(--gold-gradient)', color: 'black' }}>View All Bookings</button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;