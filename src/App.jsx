import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout & Navigation Components
import NavigationBar from './components/Navigation'; 
import AppRoutes from './routes/AppRoutes'; 
import AuthModal from './pages/AuthModal';

// 1. 💡 Footer component ko yahan top par import karein
import Footer from './components/Footer'; // Apne folder path ke mutabik check kar lein

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <Router>
      {/* Navigation section */}
      <NavigationBar openAuth={() => setShowAuthModal(true)} />
      
      {/* Main content view rendering routes */}
      <main className="main-content-wrapper">
        <AppRoutes /> 
      </main>

      {/* 2. 💡 Footer ko routes ke neechay yahan render karein */}
      <Footer />

      {/* Global Auth Popup Overlay */}
      <AuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
    </Router>
  );
}