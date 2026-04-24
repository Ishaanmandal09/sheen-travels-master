import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const fallbackPackages = [
  { 
    _id: '1', title: 'Premium Umrah 2026', type: 'Umrah', price: '110000', duration: '15 Days / 14 Nights', 
    img: 'https://images.unsplash.com/photo-1565552643952-b4b159f81216?auto=format&fit=crop&q=80&w=1000',
    description: 'Experience a blessed and luxurious journey to the Holy Cities. This package offers 5-star accommodations near the Haram, VIP transport, and guided Ziyarat.',
    features: ['5-Star Hotel (Makkah & Madinah)', 'VIP Direct Flights', 'AC Transport', 'Guided Ziyarat', 'Visa Processing'],
    itinerary: ['Day 1: Arrival in Jeddah & Transfer to Makkah', 'Day 2-7: Perform Umrah & Stay in Makkah', 'Day 8: Transfer to Madinah', 'Day 9-14: Stay in Madinah & Ziyarat', 'Day 15: Departure from Jeddah']
  },
  { 
    _id: '2', title: 'Economy Umrah Package', type: 'Umrah', price: '75000', duration: '14 Days', 
    img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1000',
    description: 'A budget-friendly yet comfortable Umrah experience with essential amenities.',
    features: ['3-Star Hotel', 'Connecting Flights', 'Shared Transport', 'Visa Processing'],
    itinerary: ['Day 1: Arrival', 'Day 2-6: Makkah Stay', 'Day 7: Transfer to Madinah', 'Day 8-13: Madinah Stay', 'Day 14: Departure']
  }
];

function PackageDetails() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const foundPackage = fallbackPackages.find(pkg => pkg._id === id);
    if (foundPackage) {
      setPackageData(foundPackage);
    }
  }, [id]);

  if (!packageData) return <h2 style={{textAlign: 'center', marginTop: '100px'}}>Loading Package Details...</h2>;

  return (
    <div>
      <nav className="navbar" style={{ padding: '10px 5%' }}>
        <div className="nav-center">
          <Link to="/" style={{ textDecoration: 'none' }}><h2 className="brand-title" style={{ fontSize: '1rem' }}>SHEEN INTERNATIONAL</h2></Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 5%' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', background: 'var(--white)', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          
          <div style={{ flex: '1.5', minWidth: '300px' }}>
            <img src={packageData.img} alt={packageData.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }} />
          </div>

          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ color: 'var(--sheen-green)', fontSize: '2.5rem', lineHeight: '1.2' }}>{packageData.title}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', marginTop: '10px' }}>🕒 {packageData.duration}</p>
            
            <div style={{ margin: '20px 0', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
              <p style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Package Price (Per Person)</p>
              <h2 style={{ color: 'var(--gold-solid)', fontSize: '2.5rem', fontWeight: '800' }}>₹{Number(packageData.price).toLocaleString('en-IN')}</h2>
            </div>
            
            <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{packageData.description}</p>
            
            <Link to={`/book/${packageData._id}`} className="search-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '15px' }}>
              Proceed to Booking
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '40px' }}>
          
          <div style={{ flex: '1', minWidth: '300px', background: 'var(--white)', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--sheen-green)', borderBottom: '2px solid var(--gold-solid)', paddingBottom: '10px', marginBottom: '20px' }}>Included Features</h3>
            <ul style={{ listStyleType: 'none' }}>
              {packageData.features?.map((feature, index) => (
                <li key={index} style={{ marginBottom: '15px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--gold-solid)' }}>✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: '1.5', minWidth: '300px', background: 'var(--white)', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--sheen-green)', borderBottom: '2px solid var(--gold-solid)', paddingBottom: '10px', marginBottom: '20px' }}>Journey Itinerary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {packageData.itinerary?.map((day, index) => (
                <div key={index} style={{ padding: '15px', background: '#f8faf9', borderRadius: '8px', borderLeft: '4px solid var(--sheen-green)' }}>
                  <p style={{ fontWeight: '600' }}>{day}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PackageDetails;