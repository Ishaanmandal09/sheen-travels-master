import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg';
import '../App.css';

function DeleteMyData() {
  return (
    <div style={{ background: 'var(--light-bg)', minHeight: '100vh' }}>
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Sheen International" className="main-logo" />
            <h2 className="brand-title">SHEEN INTERNATIONAL</h2>
          </Link>
        </div>

        <Link to="/" className="login-btn" style={{ background: 'transparent', color: 'var(--sheen-green)', border: '2px solid var(--sheen-green)' }}>
          Back to Home
        </Link>
      </nav>

      <section className="policy-page">
        <div className="policy-card animated-card">
          <h1>Delete My Data</h1>
          <p>
            At Sheen International, we respect your privacy. You may request deletion of your personal data collected through our website or app.
          </p>

          <div className="policy-block">
            <h3>What data can be deleted?</h3>
            <p>Your name, phone number, email address, booking inquiry details, and app-related account information.</p>
          </div>

          <div className="policy-block">
            <h3>How to request deletion?</h3>
            <p>
              Send an email to <b>contact@sheeninternational.com</b> with the subject line:
              <br />
              <b>Delete My Data Request</b>
            </p>
          </div>

          <div className="policy-block">
            <h3>Processing time</h3>
            <p>We will review and process your request within 7 business days.</p>
          </div>

          <div className="policy-block">
            <h3>Contact</h3>
            <p>
              📞 +91 93033-78692 <br />
              ✉️ contact@sheeninternational.com
            </p>
          </div>
        </div>
      </section>

      <footer className="simple-footer">
        <img src={logo} alt="Sheen International" style={{ height: '60px', marginBottom: '10px' }} />
        <p><b>SHEEN INTERNATIONAL</b></p>
        <p>Trust in every step</p>
        <p>© 2026 Sheen International. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default DeleteMyData;