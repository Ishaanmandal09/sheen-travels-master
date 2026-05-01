import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

import logo from '../logo.jpeg';
import meccaImg from '../mecca.jpg';
import medinaImg from '../medina.jpg';

import image1 from './image1.png';
import image2 from './image2.png';

const fallbackPackages = [
  { _id: '1', title: 'Premium Umrah 2026', type: 'Umrah', price: '110000', duration: '15 Days / 14 Nights', img: meccaImg },
  { _id: '2', title: 'Economy Umrah Package', type: 'Umrah', price: '75000', duration: '14 Days', img: medinaImg },
  { _id: '3', title: 'Haj Deluxe Package', type: 'Haj', price: '350000', duration: '40 Days', img: medinaImg },
  { _id: '4', title: 'Baghdad Ziyarat Special', type: 'Ziyarat', price: '65000', duration: '10 Days', img: meccaImg },
  { _id: '5', title: 'Ajmer Sharif Ziyarat', type: 'Ziyarat', price: '25000', duration: '5 Days', img: image1 },
  { _id: '6', title: 'Ramadan Special Umrah', type: 'Umrah', price: '145000', duration: '20 Days', img: medinaImg },
  { _id: '7', title: 'Short Haj Package', type: 'Haj', price: '280000', duration: '20 Days', img: meccaImg }
];

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Umrah');
  const [language, setLanguage] = useState('English');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchCity, setSearchCity] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTravelers, setSearchTravelers] = useState(1);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  useEffect(() => {
    setPackages(fallbackPackages);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/packages?type=${activeTab}&city=${searchCity}&date=${searchDate}&travelers=${searchTravelers}`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const companyEmail = 'contact@sheeninternational.com';
    const subject = `New Website Inquiry from ${contactName}`;
    const body = `Name: ${contactName}%0D%0APhone: ${contactPhone}%0D%0AEmail: ${contactEmail}%0D%0AMessage: ${contactMsg}`;
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const content = {
    English: {
      lang: 'Language',
      home: 'Home',
      packagesMenu: 'Packages',
      contact: 'Contact',
      h1: 'Embark on Your',
      span: 'Blessed Journey',
      subtitle: 'Tours & Travels',
      depCity: 'DEPARTURE CITY',
      date: 'DATE',
      travelers: 'TRAVELERS',
      btn: 'Search',
      exploreTitle: 'Explore Recent',
      exploreSubtitle: 'Here are some of our latest packages',
      loadingText: 'Loading Packages...',
      noPackage: 'No packages available for',
      viewBtn: 'View Details',
      footerTrust: 'Trust in every step'
    },
    Hindi: {
      lang: 'भाषा',
      home: 'होम',
      packagesMenu: 'पैकेज',
      contact: 'संपर्क',
      h1: 'अपनी बरकती',
      span: 'यात्रा शुरू करें',
      subtitle: 'टूर और ट्रेवल्स',
      depCity: 'प्रस्थान शहर',
      date: 'तारीख',
      travelers: 'यात्री',
      btn: 'खोजें',
      exploreTitle: 'हाल के पैकेज देखें - ',
      exploreSubtitle: 'यहां हमारे कुछ नवीनतम पैकेज हैं',
      loadingText: 'पैकेज लोड हो रहे हैं...',
      noPackage: 'के लिए कोई पैकेज उपलब्ध नहीं है।',
      viewBtn: 'विवरण देखें',
      footerTrust: 'हर कदम पर विश्वास'
    }
  };

  const t = content[language];
  const displayedPackages = packages.filter((pkg) => pkg.type === activeTab).slice(0, 6);

  return (
    <div>
      <div className="top-utility">
        <span>{t.lang}: </span>
        <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
        <span>📞 +91 93033-78692</span>
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="Logo" className="main-logo" />
          <h2 className="brand-title">SHEEN INTERNATIONAL</h2>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home" onClick={toggleMenu}>{t.home}</a></li>
            <li><Link to="/packages" onClick={toggleMenu}>{t.packagesMenu}</Link></li>
            <li><a href="#contact-section" onClick={toggleMenu}>{t.contact}</a></li>
            <li><Link to="/delete-my-data" onClick={toggleMenu}>Delete My Data</Link></li>
          </ul>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <h1>{t.h1}<br /><span>{t.span}</span></h1>
          <p className="hero-subtitle">{t.subtitle}</p>
        </div>
        <img src={meccaImg} alt="Mecca" className="side-img left-img" />
        <img src={medinaImg} alt="Medina" className="side-img right-img" />
      </header>

      <section className="booking-container">
        <div className="tabs">
          {['Umrah', 'Haj', 'Ziyarat'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <label>{t.depCity}</label>
            <input type="text" placeholder="e.g. Mumbai" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
          </div>

          <div className="input-group">
            <label>{t.date}</label>
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
          </div>

          <div className="input-group">
            <label>{t.travelers}</label>
            <input type="number" min="1" value={searchTravelers} onChange={(e) => setSearchTravelers(e.target.value)} />
          </div>

          <button className="search-btn">{t.btn} {activeTab}</button>
        </form>
      </section>

      <section style={{ padding: '70px 5% 50px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--sheen-green)', fontSize: '2rem', marginBottom: '12px' }}>
          Experience Our Premium Journey
        </h2>

        <p style={{ color: '#666', marginBottom: '35px' }}>
          Download our app for a smoother and more spiritual travel experience.
        </p>

        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}
        >
          {[image1, image2].map((img, index) => (
            <div
              key={index}
              className="animated-card"
              style={{
                background: '#fff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                border: '1px solid rgba(212,175,55,0.35)',
                padding: '10px'
              }}
            >
              <img
                src={img}
                alt={`App Preview ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '12px'
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '35px'
          }}
        >
          <button
            className="search-btn"
            onClick={() => window.open('https://play.google.com', '_blank')}
            style={{
              width: '220px',
              borderRadius: '30px',
              padding: '15px 25px'
            }}
          >
            📱 Download App
          </button>
        </div>
      </section>

      <section id="packages-section" className="packages-section">
        <h2 style={{ color: 'var(--sheen-green)', fontSize: '2rem', marginBottom: '10px' }}>
          {t.exploreTitle} {activeTab} Packages
        </h2>

        <p style={{ color: '#666', marginBottom: '30px' }}>{t.exploreSubtitle}</p>

        {loading ? (
          <p style={{ color: 'var(--sheen-green)', fontWeight: 'bold' }}>{t.loadingText}</p>
        ) : (
          <div className="package-grid">
            {displayedPackages.length > 0 ? (
              displayedPackages.map((pkg) => (
                <div key={pkg._id} className="package-card">
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    className="package-img"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div className="package-info">
                    <h3 className="package-title">{pkg.title}</h3>
                    <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '10px' }}>🕒 {pkg.duration}</p>
                    <p className="package-price">₹{Number(pkg.price).toLocaleString('en-IN')}</p>
                    <Link to={`/package/${pkg._id}`} className="book-btn">{t.viewBtn}</Link>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'red', gridColumn: '1 / -1' }}>{t.noPackage} {activeTab}</p>
            )}
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <Link
            to="/packages"
            className="login-btn"
            style={{ background: 'transparent', color: 'var(--sheen-green)', border: '2px solid var(--sheen-green)' }}
          >
            View All Packages ➔
          </Link>
        </div>
      </section>

      <footer
        id="contact-section"
        style={{
          backgroundColor: 'var(--white)',
          borderTop: '2px solid var(--gold-solid)',
          padding: '60px 5% 20px',
          color: 'var(--text-dark)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'left'
          }}
        >
          <div style={{ flex: '1', minWidth: '250px' }}>
            <img src={logo} alt="Sheen International" style={{ height: '70px', marginBottom: '10px' }} />
            <h2 style={{ color: 'var(--sheen-green)', marginBottom: '15px' }}>SHEEN INTERNATIONAL</h2>
            <p style={{ marginBottom: '15px', color: '#555', lineHeight: '1.6' }}>
              Your trusted partner for blessed journeys. We provide premium, hassle-free Umrah, Haj, and Ziyarat packages from India.
            </p>
            <p style={{ fontWeight: 'bold', color: 'var(--sheen-green)' }}>📍 Barasat, Kolkata, West Bengal</p>
            <p style={{ fontWeight: 'bold', color: 'var(--sheen-green)', marginTop: '10px' }}>📞 +91 93033-78692</p>
            <p style={{ fontWeight: 'bold', color: 'var(--sheen-green)', marginTop: '10px' }}>✉️ contact@sheeninternational.com</p>
          </div>

          <div style={{ flex: '1', minWidth: '220px' }}>
            <h3 style={{ color: 'var(--gold-solid)', marginBottom: '20px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.2' }}>
              <li><Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/packages" style={{ color: '#555', textDecoration: 'none' }}>Packages</Link></li>
              <li><Link to="/my-bookings" style={{ color: '#555', textDecoration: 'none' }}>My Bookings</Link></li>
              <li><Link to="/delete-my-data" style={{ color: '#555', textDecoration: 'none' }}>Delete My Data</Link></li>
            </ul>
          </div>

          <div style={{ flex: '1.5', minWidth: '300px', background: '#f8faf9', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
            <h3 style={{ color: 'var(--sheen-green)', marginBottom: '15px' }}>Send us a message</h3>
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Your Name" required value={contactName} onChange={(e) => setContactName(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <input type="email" placeholder="Email ID" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <input type="tel" placeholder="Phone" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <textarea placeholder="Your Message..." required value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', height: '90px', resize: 'none' }}></textarea>
              <button type="submit" className="login-btn" style={{ width: '100%', cursor: 'pointer', border: 'none', padding: '12px' }}>Send Mail</button>
            </form>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
          <p style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--sheen-green)' }}>{t.footerTrust}</p>
          <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#777' }}>© 2026 Sheen International. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;