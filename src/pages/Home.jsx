import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Premium smooth scroll animations variants
const textReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const imageReveal = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
};

// Stagger effect container for lists/grids
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};


const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};


// Define these outside your component
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
    const navigate = useNavigate();

    // Smooth scroll handler
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="luxury-editorial-page">

            {/* SECTION 1: THE MAGAZINE HERO */}
            <section className="magazine-hero-section">
                <div className="hero-top-meta">
                    <span className="meta-left">COLLECTIONSs // 2026</span>
                    <span className="meta-center">EVENT HORIZON</span>
                    <span className="meta-right" onClick={() => navigate('/events')}>ABOUT —</span>
                </div>

                <div className="magazine-hero-viewport">


                    <h1 className="magazine-giant-title">
                        <motion.span
                            variants={slideLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }} // Scroll karne par animation dobara trigger hogi
                            className="d-inline-block"
                        >
                            EVENT
                        </motion.span>
                        {' '}
                        <motion.span
                            variants={slideRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            className="serif-italic d-inline-block"
                        >
                            Horizon
                        </motion.span>
                    </h1>


                    <motion.div
                        className="magazine-centerpiece-wrapper"
                        initial="hidden"
                        animate="visible"
                        variants={imageReveal}
                    >
                        {/* <img
                            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200"
                            alt="Abstract Sound Architecture"
                            className="magazine-centerpiece-img"
                        /> */}
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
                            alt="Modern Architectural Horizon"
                            className="magazine-centerpiece-img"
                        />
                        <button className="magazine-inline-cta" onClick={() => navigate('/booking')}>
                            get pass
                        </button>
                    </motion.div>

                    <div className="hero-bottom-composition">
                        <div className="composition-left-text">
                            <p>
                                We believe an event should tell your story. Our curated line-ups reflect
                                progressive craftsmanship, acoustic quality, and a profound passion for creating
                                deep, inspiring spaces.
                            </p>
                        </div>
                        <div className="composition-center-scroll">
                            <span
                                className="scroll-text-btn"
                                onClick={() => scrollToSection('manifesto')}
                                style={{ cursor: 'pointer' }}
                            >
                                SCROLL DOWN
                            </span>
                        </div>
                        <div className="composition-right-card">
                            <div className="mini-card-frame">
                                <img
                                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600"
                                    alt="Upcoming Feature"
                                    className="mini-card-img"
                                />
                            </div>
                            <div className="mini-card-content mt-3">
                                <p className="mini-card-desc">
                                    From secret warehouse coordinates to open-air state-of-the-art architectures, explore pieces designed to elevate your perspective.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 2: THE SPATIAL PHILOSOPHY */}
            <section className="editorial-statement-section py-5" id="manifesto">
                <Container fluid className="px-lg-5 py-5 border-top-clean">
                    <Row className="align-items-start g-5">
                        {/* LEFT: TEXT BLOCK */}
                        <Col lg={6}>
                            <span className="grid-meta-tag">OUR MANIFESTO</span>
                            <h2 className="statement-large-title mt-3">
                                Curating moments that exist on the edge of memory and architecture.
                            </h2>
                            <div className="mt-4">
                                <p className="statement-paragraph lead">
                                    Event Horizon is not an organizer; it is an editorial lens for live experiences. We dismantle traditional assembly lines to construct brutalist sonic environments, sensory gatherings, and private summits.
                                </p>
                                <p className="statement-paragraph text-muted mt-4">
                                    Every venue is handpicked for its historical gravity and raw industrial beauty. Our production ethos is anchored in pure structural clarity—eliminating distracting neon elements to prioritize raw space, pure shadow, and pristine acoustics.
                                </p>
                            </div>
                        </Col>

                        {/* RIGHT: FEATURE IMAGE (Fills the gap) */}
                        <Col lg={5} className="offset-lg-1">
                            <div className="editorial-feature-card">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800"
                                    alt="Architecture"
                                    className="img-fluid editorial-img"
                                />
                                <p className="editorial-caption mt-3">
                        // Visualizing the structural clarity of sound.
                                    <br /> Location: Industrial District, 2026.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* SECTION 3: THE CURATED LINEUP */}
            <section className="lineup-editorial-section py-5">
                <Container fluid className="px-lg-5 py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5 border-bottom-clean pb-3">
                        <div>
                            <span className="grid-meta-tag">CURATED ARTISTS // SPEAKERS</span>
                            <h2 className="grid-main-title">The Sonic Curators</h2>
                        </div>
                        <span className="text-muted d-none d-md-block fs-7">PHASE 01 SELECTION</span>
                    </div>

                    <motion.div
                        className="row g-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {[
                            { name: "Amelie Lens", role: "Acoustic Architect", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800" },
                            { name: "Tale Of Us", role: "Ethereal Soundscapes", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800" },
                            { name: "Stephan Bodzin", role: "Hardware Live Synthesis", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800" }
                        ].map((artist, idx) => (
                            <Col lg={4} md={6} key={idx}>
                                <motion.div
                                    className="lineup-lookbook-card"
                                    variants={textReveal}
                                >
                                    <div className="lookbook-img-frame">
                                        <img src={artist.img} alt={artist.name} className="lookbook-img" />
                                    </div>
                                    <div className="lookbook-meta mt-3 d-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 className="artist-title-name">{artist.name}</h4>
                                            <p className="artist-sub-role">{artist.role}</p>
                                        </div>
                                        <span className="arrow-editorial">↗</span>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* NEW SECTION 4: CURATED INDUSTRIAL ARCHITECTURES */}
            <section className="venue-showcase-section py-5">
                <Container fluid className="px-lg-5 py-5 border-top-clean">
                    <div className="mb-5">
                        <span className="grid-meta-tag">EXPERIENCE FRAMEWORKS</span>
                        <h2 className="grid-main-title">Architectural Monoliths</h2>
                    </div>
                    <Row className="g-5">
                        <Col md={7}>
                            <motion.div className="venue-editorial-frame" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={imageReveal}>
                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" alt="Brutalist Vault" className="venue-img" />
                                <div className="venue-meta-overlay mt-3">
                                    <h3 className="venue-title">The Concrete Foundry</h3>
                                    <p className="venue-desc text-muted">An unmapped brutalist structure optimized for sub-bass response and atmospheric depth.</p>
                                </div>
                            </motion.div>
                        </Col>
                        <Col md={5} className="d-flex flex-column justify-content-between">
                            <motion.div className="venue-editorial-frame mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={imageReveal}>
                                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" alt="Subterranean Hub" className="venue-img-short" />
                                <div className="venue-meta-overlay mt-3">
                                    <h3 className="venue-title">Subterranean Vaults</h3>
                                    <p className="venue-desc text-muted">Intimate, acoustically isolated chambers crafted for structural raw audio sets.</p>
                                </div>
                            </motion.div>
                            <div className="editorial-cta-box p-4 border-dark-clean bg-light-bone">
                                <span className="mini-tag">COORDINATES SYSTEM</span>
                                <p className="mt-2 text-serif-italic">Exact locations are dispatched via encrypted ledgers 6 hours before the gates open.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* NEW SECTION 5: THE GLOBAL CALENDAR REGISTER */}
            <section className="global-register-section py-5">
                <Container fluid className="px-lg-5 py-5 border-top-clean">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <span className="grid-meta-tag">CHRONOLOGICAL REGISTER</span>
                            <h2 className="grid-main-title">Global Summits & Gatherings</h2>
                        </div>
                        <span className="text-muted tracking-wide fs-7">2026 CALENDAR</span>
                    </div>

                    <motion.div
                        className="editorial-ledger-table"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {[
                            { id: "01", date: "AUG 14", title: "Subterranean Convergence", location: "Berlin, DE", space: "Brutalist Vault", status: "Available" },
                            { id: "02", date: "SEP 02", title: "Hyper-Resonance Summit", location: "Tokyo, JP", space: "Industrial Sphere", status: "Low Allocation" },
                            { id: "03", date: "OCT 20", title: "Atmospheric Textures", location: "London, UK", space: "Concrete Foundry", status: "Sold Out" },
                            { id: "04", date: "DEC 11", title: "The Absolute Zero Void", location: "Milan, IT", space: "Muted Warehouse", status: "Opening Soon" }
                        ].map((event, index) => (
                            <motion.div
                                className="ledger-row d-flex flex-wrap align-items-center py-4 border-bottom-hairline"
                                key={index}
                                variants={textReveal}
                            >
                                {/* DESKTOP VIEW COLUMNS (Hidden on Mobile: d-none d-md-block) */}
                                <div className="ledger-col d-none d-md-block col-md-1 text-muted text-serif">{event.id}</div>
                                <div className="ledger-col col-4 col-md-2 date-stamp fw-bold">{event.date}</div>
                                <div className="ledger-col col-8 col-md-4">
                                    <h4 className="ledger-title m-0">{event.title}</h4>
                                    <span className="ledger-sub-text text-muted">{event.space}</span>
                                </div>
                                <div className="ledger-col d-none d-md-block col-md-2 text-muted">{event.location}</div>
                                <div className="ledger-col d-none d-md-block col-md-2 item-status text-uppercase font-sans tracking-wide fs-8">{event.status}</div>
                                <div className="ledger-col d-none d-md-block col-md-1 text-md-end">
                                    <button
                                        className="ledger-action-arrow"
                                        onClick={() => navigate('/booking')}
                                        disabled={event.status === "Sold Out"}
                                    >
                                        {event.status === "Sold Out" ? "✖" : "→"}
                                    </button>
                                </div>

                                {/* MOBILE VIEW BLOCK (Hidden on Desktop: d-md-none) */}
                                <div className="ledger-col d-md-none col-12 mt-3">
                                    <div className="mobile-status-row d-flex justify-content-between align-items-center">
                                        <span className="text-muted">{event.location}</span>
                                        <div className="d-flex align-items-center gap-3">
                                            <span className="item-status text-uppercase font-sans tracking-wide fs-8 m-0">{event.status}</span>
                                            <button
                                                className="ledger-action-arrow m-0"
                                                onClick={() => navigate('/booking')}
                                                disabled={event.status === "Sold Out"}
                                            >
                                                {event.status === "Sold Out" ? "✖" : "→"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* NEW SECTION 6: TIERED ACCESS MATRIX */}
            <section className="access-matrix-section py-5 bg-dark-editorial text-white">
                <Container fluid className="px-lg-5 py-5">
                    <div className="mb-5 text-center text-md-start">
                        <span className="grid-meta-tag text-muted-charcoal">SYSTEM ASSIGNMENT</span>
                        <h2 className="grid-main-title text-white">Passports & Tier Allocations</h2>
                    </div>
                    <Row className="g-4 justify-content-between">
                        {[
                            { title: "Primary Pass", price: "$120", info: "Standard entry ledger allocation for primary halls, access to architectural viewing zones, and standard lossless audio arenas." },
                            { title: "Horizon Tier", price: "$350", info: "Full spatial access tokens, unmapped stage clearances, private balcony structures, curated artist meet points, and physical print portfolio logs." }
                        ].map((tier, idx) => (
                            <Col lg={5} key={idx} className="d-flex flex-column justify-content-between border-left-editorial p-4 mb-4">
                                <div>
                                    <div className="d-flex justify-content-between align-items-baseline mb-4">
                                        <h3 className="matrix-tier-title text-serif">{tier.title}</h3>
                                        <span className="matrix-price text-serif-italic">{tier.price}</span>
                                    </div>
                                    <p className="matrix-description text-muted-charcoal fs-6 lh-lg">{tier.info}</p>
                                </div>
                                <button className="matrix-action-btn mt-5" onClick={() => navigate('/booking')}>
                                    REQUEST ACCREDITATION —
                                </button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* NEW SECTION 7: REGISTRATION ARCHIVE */}
            <section className="archive-dispatch-section py-5">
                <Container fluid className="px-lg-5 py-5">
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <span className="grid-meta-tag">LEDGER BROADCAST</span>
                            <h2 className="dispatch-title mt-3 text-serif">
                                Stay registered within the <span className="serif-italic">Horizon Archive</span>.
                            </h2>
                            <p className="text-muted mt-3 max-w-450">
                                We do not distribute newsletters. We only dispatch coordinate updates, lineup announcements, and private ticketing tokens.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <div className="editorial-input-wrapper">
                                <input type="email" placeholder="ENTER DIGITAL ARCHIVE ID (EMAIL)" className="editorial-clean-input" />
                                <button className="editorial-submit-arrow" aria-label="Submit ID">DISPATCH ↗</button>
                            </div>
                            <div className="mt-3 text-start">
                                <span className="fs-8 text-muted tracking-wide">SECURE ENCRYPTED LEDGER SYSTEM // NO NEON GUARANTEE</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    );
}