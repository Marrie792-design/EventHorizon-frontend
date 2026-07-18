import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMagic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const containerFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        const calculate = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    h: Math.floor((difference / (1000 * 60 * 60))),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ h: 0, m: 0, s: 0 });
            }
        };
        calculate();
        const timer = setInterval(calculate, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <span className="editorial-countdown-stamp">
            {timeLeft.h > 0 || timeLeft.m > 0 || timeLeft.s > 0
                ? `[ T-MINUS: ${String(timeLeft.h).padStart(2, '0')}H : ${String(timeLeft.m).padStart(2, '0')}M ]`
                : "[ STATUS: HAPPENING NOW ]"}
        </span>
    );
};

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const categories = ['All', 'Music', 'Tech', 'Workshop', 'Party'];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');

                // DEBUGGING LOG: Yeh console m check karein browser me
                console.log("=== BACKEND RESPONSE DATA ===", response.data);

                // Agar data direct array h to set karein, warna agar object h to sahi key check karein
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else if (response.data && Array.isArray(response.data.events)) {
                    setEvents(response.data.events);
                } else if (response.data && Array.isArray(response.data.data)) {
                    setEvents(response.data.data);
                } else {
                    console.error("Data array format m nahi mila:", response.data);
                }

                setLoading(false);
            } catch (error) {
                console.error("Fetch Error details:", error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Crash-Safe Filtering Logic
    const filteredEvents = Array.isArray(events) ? events.filter(event => {
        const title = event?.title ? event.title.toLowerCase() : '';
        const category = event?.category ? event.category.toLowerCase() : '';
        const search = searchTerm.toLowerCase();
        return title.includes(search) || category.includes(search);
    }) : [];

    if (loading) return (
        <div className="editorial-loader-viewport">
            <div className="editorial-spinner-element"></div>
            <span className="loader-text-editorial">RETRIEVING ARCHIVE LEDGER...</span>
        </div>
    );

    return (
        <div className="editorial-events-page">
            <Container fluid className="px-lg-5 py-5">

                <div className="events-editorial-meta mb-4">
                    <span>REGISTERS // ARCHIVE 2026</span>
                    <span className="d-none d-md-inline">TOTAL RELEASES: {filteredEvents.length}</span>
                </div>

                <Row className="align-items-end mb-5 g-4 border-bottom-clean pb-4">
                    <Col lg={6} md={12}>
                        <h1 className="editorial-page-title m-0">
                            Live <span className="serif-italic">Horizons</span>
                        </h1>
                        <p className="editorial-page-subtitle text-muted mt-2 m-0">
                            A curated layout of dynamic motion assemblies, brutalist sonic environments, and physical showcases.
                        </p>
                    </Col>

                    <Col lg={6} md={12} className="d-flex flex-wrap justify-content-lg-end align-items-center gap-3">
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="btn-editorial-outline-action"
                            onClick={() => navigate('/customize-event')}
                        >
                            <FaMagic className="me-2 fs-7" /> CUSTOMIZE ASSEMBLY —
                        </motion.button>

                        <div className="editorial-search-input-frame">
                            <FaSearch className="editorial-search-lens" />
                            <Form.Control
                                type="text"
                                placeholder="SEARCH LEDGERS..."
                                className="editorial-search-field"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>

                <div className="editorial-tabs-row mb-5 overflow-auto pb-2">
                    {categories.map(cat => {
                        const isActive = searchTerm === cat || (cat === 'All' && !searchTerm);
                        return (
                            <button
                                key={cat}
                                className={`editorial-filter-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => setSearchTerm(cat === 'All' ? '' : cat)}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                <motion.div
                    className="row g-5"
                    variants={containerFade}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="popLayout">


                        {filteredEvents.map((event, index) => (
                            <Col lg={4} md={6} sm={12} key={event._id || event.id || index}>
                                <motion.div
                                    layout
                                    variants={cardReveal}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="editorial-lookbook-card h-100 d-flex flex-column"
                                >
                                    {/* IMAGE VIEWPORT WITH ZOOM EFFECT */}
                                    <div className="lookbook-frame-viewport">
                                        <img
                                            src={event.image_url || event.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800'}
                                            alt={event.title}
                                            className="lookbook-frame-media"
                                        />
                                        <div className="lookbook-frame-category-pill">
                                            {event.category}
                                        </div>
                                    </div>

                                    {/* DETAILS CONTAINER */}
                                    <div className="lookbook-frame-details p-4 d-flex flex-column flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <CountdownTimer targetDate={event.date} />
                                            <span className="editorial-card-price-tag">${event.price}</span>
                                        </div>

                                        <h3 className="lookbook-card-title mb-2">{event.title}</h3>

                                        {/* Line clamped description for perfect symmetry */}
                                        <p className="lookbook-card-paragraph text-muted mb-4 flex-grow-1">
                                            {event.description || "Curated showcase structured carefully to emphasize spatial architecture and pristine acoustics."}
                                        </p>

                                        {/* FOOTER ACTION BAR - ALWAYS ALIGNED AT BOTTOM */}
                                        <div className="lookbook-card-action-bar border-top pt-3 mt-auto d-flex justify-content-between align-items-center">
                                            <span className="action-meta-date-location">
                                                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'AUG 24'}
                                            </span>
                                            <button
                                                className="btn-editorial-text-arrow"
                                                onClick={() => navigate(`/event/${event._id || event.id}`)}
                                            >
                                                VIEW DETAILS <span className="arrow-transition">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}



                    </AnimatePresence>
                </motion.div>

                {filteredEvents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5 my-5 border-dark-clean"
                    >
                        <h3 className="text-serif text-muted">No entries found within this timeline segment.</h3>
                        <p className="text-muted fs-7 font-sans tracking-wide mt-2">TRY CLEARING YOUR SEARCH CONTROLS</p>
                    </motion.div>
                )}
            </Container>
        </div>
    );
}