import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PackagesPage from './pages/PackagesPage';
import PackageDetails from './pages/PackageDetails';
import BookingPage from './pages/BookingPage'; 
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/package/:id" element={<PackageDetails />} /> 
          <Route path="/book/:id" element={<BookingPage />} /> 
          <Route path="/my-bookings" element={<MyBookings />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;