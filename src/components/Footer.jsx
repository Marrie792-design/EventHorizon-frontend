import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="editorial-footer-core py-5">
      <Container>
        <Row className="pt-4 pb-5">
          {/* Brand Vision Column */}
          <Col md={4} className="mb-4 pe-md-5">
            <h4 className="editorial-footer-logo">
              EVENT<span className="serif-italic">HORIZON</span>
            </h4>
            <p className="editorial-footer-desc mt-3">
              A curated chronicle of premier architecture, cultural gatherings, and avant-garde event horizons. Elevating temporary spaces into permanent memories.
            </p>
          </Col>

          {/* Navigation Matrix */}
          <Col md={2} xs={6} className="mb-4">
            <h6 className="editorial-footer-heading">Quick Links</h6>
            <ul className="list-unstyled editorial-footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/events">All Gatherings</Link></li>
              <li><Link to="/about">Our Chronicle</Link></li>
            </ul>
          </Col>

          {/* Operational Support Matrix */}
          <Col md={2} xs={6} className="mb-4">
            <h6 className="editorial-footer-heading">Support</h6>
            <ul className="list-unstyled editorial-footer-links">
              <li><Link to="/contact">Reach Out</Link></li>
              <li><Link to="#">Privacy Ledger</Link></li>
              <li><Link to="#">Terms of Use</Link></li>
            </ul>
          </Col>

          {/* Ledger Subscription */}
          <Col md={4} className="mb-4">
            <h6 className="editorial-footer-heading">Newsletter Ledger</h6>
            <p className="editorial-footer-desc mb-3" style={{ fontSize: '0.78rem' }}>
              Subscribe to receive private updates and exclusive registry catalogs.
            </p>
            <div className="editorial-newsletter-box d-flex">
              <input 
                type="email" 
                className="editorial-footer-input" 
                placeholder="name@organization.com" 
                required 
              />
              <button className="editorial-footer-btn">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>

        {/* Bottom Metadata */}
        <div className="editorial-footer-bottom pt-4 text-center">
          <p className="editorial-copyright-text m-0">
            &copy; {new Date().getFullYear()} EVENT HORIZON. All structural signatures reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}