import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: 'Incomplete Entry',
        text: 'Please write down all required credentials before dispatching your communication.',
        icon: 'warning',
        confirmButtonColor: '#111'
      });
      return;
    }

    // Success response placeholder matching backend layout architecture
    Swal.fire({
      title: 'Transmission Successful',
      text: 'Your memo has been filed into our system ledger. Our concierge will review it shortly.',
      icon: 'success',
      confirmButtonColor: '#111'
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="editorial-contact-page py-5">
      <Container>
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="editorial-header-block text-center mb-5"
        >
          <span className="editorial-meta-tag">Direct Correspondence</span>
          <h1 className="editorial-giant-title">Initiate the <span className="serif-italic">Conversation</span></h1>
          <div className="editorial-divider-line"></div>
          <p className="editorial-hero-lead mx-auto mt-4">
            Have questions regarding ticketing allocations, customized event architectures, or exclusive venue reservations? 
            Our digital transmission gates and on-site concierge desks remain universally accessible.
          </p>
        </motion.div>

        {/* SECTION 01: CONCIERGE DIRECTORIES */}
        <Row className="editorial-step-row">
          <Col lg={3} className="step-meta-panel">
            <h2 className="step-huge-number">01</h2>
            <p className="step-meta-title">The Concierge Desk</p>
          </Col>
          <Col lg={9} className="step-fields-panel">
            <Row>
              <Col md={6} className="mb-4 mb-md-0">
                <h3 className="editorial-section-subtitle mb-3">Communication Channels</h3>
                <div className="contact-info-block">
                  <span className="info-mini-label">General Operations Ledger</span>
                  <p className="info-main-detail">concierge@eventhorizon.com</p>
                </div>
                <div className="contact-info-block mt-3">
                  <span className="info-mini-label">Bespoke Layout Consultation</span>
                  <p className="info-main-detail">curator@eventhorizon.com</p>
                </div>
                <div className="contact-info-block mt-3">
                  <span className="info-mini-label">Telephonic Portal Hotline</span>
                  <p className="info-main-detail">+92 (300) 000-0792</p>
                </div>
              </Col>
              
              <Col md={6}>
                <h3 className="editorial-section-subtitle mb-3">Physical Headquarters</h3>
                <div className="contact-info-block">
                  <span className="info-mini-label">Architectural Studio & Space</span>
                  <p className="info-main-detail">
                    The Horizon Pavilion, Floor 7,<br />
                    Gulberg Creative District,<br />
                    Lahore, Pakistan
                  </p>
                </div>
                <div className="contact-info-block mt-3">
                  <span className="info-mini-label">Operating Registry Hours</span>
                  <p className="info-main-detail">Monday — Friday // 09:00 - 18:00 PKT</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* SECTION 02: THE CORRESPONDENCE FORM */}
        <Row className="editorial-step-row last-step">
          <Col lg={3} className="step-meta-panel">
            <h2 className="step-huge-number">02</h2>
            <p className="step-meta-title">The Memo Ledger</p>
          </Col>
          <Col lg={9} className="step-fields-panel">
            <h3 className="editorial-section-subtitle mb-4">File a Formal Request</h3>
            
            <Form onSubmit={handleFormSubmit} className="editorial-form-core px-0">
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label>Your Identity / Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="e.g. Sterling Archer" 
                    className="editorial-input-field" 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} className="mb-4">
                  <Form.Label>Electronic Mail Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@organization.com" 
                    className="editorial-input-field" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={12} className="mb-4">
                  <Form.Label>Statement / Message Core</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="message"
                    rows={5} 
                    placeholder="Describe the precise core architectural specs or assistance coordinates required..." 
                    className="editorial-input-field text-area-custom" 
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>

              <div className="editorial-action-wrapper text-end mt-2">
                <button type="submit" className="editorial-submit-btn">
                  <span>Dispatch Correspondence</span>
                  <FaArrowRight className="ms-3 button-arrow" />
                </button>
              </div>
            </Form>

          </Col>
        </Row>

      </Container>
    </div>
  );
}