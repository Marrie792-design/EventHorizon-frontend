import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navigation.css';

export default function Navigation({ toggleTheme, currentTheme, openAuth }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    closeMenu();
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar expand="lg" expanded={expanded} className="editorial-navbar py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="editorial-brand-logo" onClick={closeMenu}>
          EVENT<span className="serif-italic">HORIZON</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="editorial-navbar-nav" 
          className="border-0 shadow-none p-0"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="editorial-custom-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </Navbar.Toggle>
        
        {/* transition-container class hata di hai taake conflict na ho */}
        <Navbar.Collapse id="editorial-navbar-nav">
          <Nav className="ms-auto align-items-center" onClick={closeMenu}>
            <Nav.Link as={Link} to="/" className="editorial-nav-item mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/events" className="editorial-nav-item mx-2">Events</Nav.Link>
            <Nav.Link as={Link} to="/customize" className="editorial-nav-item mx-2">Customize Event</Nav.Link>
            <Nav.Link as={Link} to="/about" className="editorial-nav-item mx-2">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="editorial-nav-item mx-2">Contact</Nav.Link>

            {/* Auth Section */}
            {localStorage.getItem('user') ? (
              <div className="d-flex align-items-center ms-3 backend-user-badge">
                <div className="user-profile d-flex align-items-center me-3" style={{ color: '#555' }}>
                  <FaUserCircle className="me-2" style={{ fontSize: '1.4rem' }} />
                  <span className="fw-bold">{JSON.parse(localStorage.getItem('user')).username}</span>
                </div>
                <span onClick={handleLogout} className="nav-link editorial-nav-btn logout-accent" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </div>
            ) : (
              <span onClick={() => { openAuth(); closeMenu(); }} className="nav-link editorial-nav-btn ms-3" style={{ cursor: 'pointer' }}>
                Login / Register
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}