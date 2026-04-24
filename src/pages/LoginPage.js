import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../logo.jpeg'; 
import '../App.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // live mode
      /*
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.role === 'admin' ? 'true' : 'false');
        alert("Login Successful!");
        navigate('/'); 
      } else {
        throw new Error("Invalid Credentials");
      }
      */

      // live mode  ses 
      // demo suru 
      
      if (email === 'admin@sheen.com' && password === 'admin123') {
        localStorage.setItem('token', 'demo-admin-token-12345');
        localStorage.setItem('isAdmin', 'true');
        alert("Demo Admin Login Successful!");
        navigate('/'); 
      } 
      else if (email === 'user@sheen.com' && password === 'user123') {
        localStorage.setItem('token', 'demo-user-token-67890');
        localStorage.setItem('isAdmin', 'false'); 
        alert("Demo User Login Successful!");
        navigate('/'); 
      } 
      else {
        throw new Error("Invalid Email or Password!"); 
      }
// demo mode ses
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(rgba(7, 74, 53, 0.9), rgba(7, 74, 53, 0.9)), url("https://www.transparenttextures.com/patterns/arabesque.png")' 
    }}>
      
      <div style={{
        background: 'var(--white)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        
        <img src={logo} alt="Sheen International" style={{ height: '70px', marginBottom: '10px' }} />
        <h2 style={{ color: 'var(--sheen-green)', marginBottom: '5px' }}>Welcome Back</h2>
        <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '20px' }}>Login to access your account</p>

        {error && (
          <div style={{ background: '#ffe6e6', color: '#d93025', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--sheen-green)', display: 'block', marginBottom: '5px' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. user@sheen.com"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontFamily: 'Poppins', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--sheen-green)', display: 'block', marginBottom: '5px' }}>PASSWORD</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontFamily: 'Poppins', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="search-btn" 
            style={{ width: '100%', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Verifying...' : 'Secure Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f8faf9', border: '1px dashed #ccc', borderRadius: '8px', fontSize: '0.8rem', color: '#555', textAlign: 'left' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '5px', color: 'var(--sheen-green)' }}>Demo Credentials:</p>
          <p><b>Admin:</b> admin@sheen.com / admin123</p>
          <p><b>User:</b> user@sheen.com / user123</p>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <Link to="/" style={{ color: 'var(--sheen-green)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
            ← Back to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;