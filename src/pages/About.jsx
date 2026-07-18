import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  // Animation configuration for premium subtle fading
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="editorial-about-page py-5">
      <Container>
        
        {/* SECTION 1: MASTER HERO BLOCK */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="editorial-header-block text-center mb-5"
        >
          <span className="editorial-meta-tag">The EventHorizon Blueprint</span>
          <h1 className="editorial-giant-title">Architecting Real <span className="serif-italic">Experiences</span></h1>
          <div className="editorial-divider-line"></div>
          <p className="editorial-hero-lead mx-auto mt-4">
            EventHorizon is not a mere transactional ledger; it is a meticulously curated gateway to real-world gatherings. 
            We actively bridge the absolute frontier between modern digital choreography and tangible architectural communion.
          </p>
        </motion.div>

        {/* SECTION 2: THE GENESIS (WHY WE STARTED) */}
        <Row className="editorial-step-row align-items-center">
          <Col lg={3} className="step-meta-panel">
            <h2 className="step-huge-number">01</h2>
            <p className="step-meta-title">The Genesis</p>
          </Col>
          <Col lg={4} className="step-fields-panel mb-4 mb-lg-0">
            <h3 className="editorial-section-subtitle mb-3">Why We Gather</h3>
            <p className="editorial-paragraph">
              In an era overwhelmingly dominated by digital screen immersion, we recognized that human milestones 
              and transformative ideas carry exponential resonance only when people gather physically.
            </p>
            <p className="editorial-paragraph">
              Whether it is an exclusive underground classical acoustic session, an avant-garde technology summit, 
              or a bespoke curated gallery viewing, our objective is to make finding these exceptional physical moments seamless.
            </p>
          </Col>
          <Col lg={5} className="ps-lg-5">
            <div className="about-editorial-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" 
                alt="Curated Architecture Gathering" 
                className="about-premium-img" 
              />
              <div className="frame-attribution">EventHorizon Space Capture</div>
            </div>
          </Col>
        </Row>

        {/* SECTION 3: THE MANIFESTO (NEW ADDED CORE VALUES SECTION) */}
        <Row className="editorial-step-row">
          <Col lg={3} className="step-meta-panel">
            <h2 className="step-huge-number">02</h2>
            <p className="step-meta-title">Our Pillars</p>
          </Col>
          <Col lg={9} className="step-fields-panel">
            <h3 className="editorial-section-subtitle mb-4">The Absolute Manifesto</h3>
            <Row>
              <Col md={4} className="mb-4 mb-md-0">
                <span className="manifesto-mini-number">I // Curation</span>
                <p className="editorial-paragraph ps-0 mt-2">
                  We don’t believe in saturation. Every venue layout, menu option, and ambient footprint listed within our ecosystem undergoes architectural review to match luxury baselines.
                </p>
              </Col>
              <Col md={4} className="mb-4 mb-md-0">
                <span className="manifesto-mini-number">II // Seamless Execution</span>
                <p className="editorial-paragraph ps-0 mt-2">
                  Utilizing structural state management systems, we provide frictionless logistical tracking, real-time dynamic invoicing data, and predictive layout assembly metrics.
                </p>
              </Col>
              <Col md={4}>
                <span className="manifesto-mini-number">III // Human Communion</span>
                <p className="editorial-paragraph ps-0 mt-2">
                  Our core metrics are not bound to computational impressions. We evaluate our structural triumph explicitly based on real physical atmospheres generated.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* SECTION 4: METRIC FOOTPRINT (UPGRADED STATS CARDS) */}
        <Row className="editorial-step-row last-step">
          <Col lg={3} className="step-meta-panel">
            <h2 className="step-huge-number">03</h2>
            <p className="step-meta-title">The Ledger</p>
          </Col>
          <Col lg={9} className="step-fields-panel">
            <h3 className="editorial-section-subtitle mb-4">Historical Scaled Metrics</h3>
            <Row>
              <Col md={4} className="mb-4 mb-md-0">
                <div className="editorial-stat-tile">
                  <h4 className="stat-giant-digits">100+</h4>
                  <div className="stat-divider-hairline"></div>
                  <span className="stat-meta-label">Bespoke Galas Hosted</span>
                </div>
              </Col>
              <Col md={4} className="mb-4 mb-md-0">
                <div className="editorial-stat-tile">
                  <h4 className="stat-giant-digits">50K</h4>
                  <div className="stat-divider-hairline"></div>
                  <span className="stat-meta-label">Active Global Citizens</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="editorial-stat-tile">
                  <h4 className="stat-giant-digits">24/7</h4>
                  <div className="stat-divider-hairline"></div>
                  <span className="stat-meta-label">Consignment Support</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>
    </div>
  );
}