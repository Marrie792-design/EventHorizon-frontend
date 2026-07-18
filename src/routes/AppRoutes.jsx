import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages Import
import Home from '../pages/Home';
import Events from '../pages/Events';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Booking from '../pages/Booking';
import EventDetail from '../pages/EventDetail'; 
import CustomizeEvent from '../pages/CustomizeEvent';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      
      {/* Event Detail Route */}
      <Route path="/event/:id" element={<EventDetail />} />
      
      {/* Customization Page Route */}
      <Route path="/customize" element={<CustomizeEvent />} />

      {/* ❌ Standalone login aur register routes ko yahan se permanent remove kar diya hai */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      
      {/* Fallback for 404 - Refactored to match Luxury Editorial Theme */}
      <Route path="*" element={
        <div 
          className="text-center py-5 d-flex flex-column align-items-center justify-content-center" 
          style={{ backgroundColor: '#fcfbfa', minHeight: '75vh', color: '#111111' }}
        >
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '6rem', fontWeight: '400', margin: 0 }}>
            404
          </h1>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#111111', margin: '15px 0' }}></div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.72rem', fontWeight: '700', color: '#555555' }}>
            The horizon you are looking for does not exist in this ledger.
          </p>
        </div>
      } />
    </Routes>
  );
}