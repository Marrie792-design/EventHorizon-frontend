import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import './EventDetail.css';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Slideshow Logic ---
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);

                if (response.data.gallery && response.data.gallery.length > 0) {
                    setImages(response.data.gallery);
                } else {
                    setImages([response.data.image_url]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };
        fetchEvent();
    } , [id]);

    // --- Automatic Transition (5 Seconds) ---
    useEffect(() => {
        if (images.length > 0) {
            const timer = setInterval(() => {
                handleNext();
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [images, currentImageIndex]);

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    if (loading) {
        return (
            <div className="editorial-loader-container">
                <Spinner animation="border" variant="dark" className="luxury-spinner" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="editorial-error-container text-center mt-5">
                <h3>Gathering Not Found</h3>
                <p>The requested event index does not exist in our active registry.</p>
                <Button className="btn-back mt-3" onClick={() => navigate('/events')}>
                    Return to Chronicle
                </Button>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="event-detail-wrapper">
            <Container className="py-5">
                <button className="btn-back mb-4 d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
                    <FaArrowLeft size={11} /> BACK TO CHRONICLE
                </button>

                <Row className="g-5">
                    <Col lg={7}>
                        {/* --- Image Slider Container --- */}
                        <div className="detail-img-container">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={`Slide ${currentImageIndex}`}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="img-fluid slideshow-img"
                                />
                            </AnimatePresence>

                            {/* Minimal Control Arrows */}
                            <button className="slider-arrow left" onClick={handlePrev} aria-label="Previous image">
                                <FaChevronLeft size={12} />
                            </button>
                            <button className="slider-arrow right" onClick={handleNext} aria-label="Next image">
                                <FaChevronRight size={12} />
                            </button>

                            <Badge className="category-badge-detail">{event.category}</Badge>
                            
                            {/* Minimal Strip Indicators */}
                            <div className="slider-dots">
                                {images.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Title & Editorial Description */}
                        <div className="mt-4 pt-2">
                            <h1 className="event-title-detail">{event.title}</h1>
                            <hr className="title-divider" />
                            <p className="event-full-desc">{event.description}</p>
                        </div>
                    </Col>

                    <Col lg={5}>
                        {/* Right Minimalist Sidebar Information Card */}
                        <div className="booking-card-detail">
                            <h3 className="card-heading-detail">Registry Info</h3>
                            
                            <div className="info-item">
                                <FaCalendarAlt className="info-icon" />
                                <div className="info-text-wrapper">
                                    <small>SCHEDULED DATE</small>
                                    <p>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} — 08:00 PM</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <FaMapMarkerAlt className="info-icon" />
                                <div className="info-text-wrapper">
                                    <small>SPATIAL LOCATION</small>
                                    <p>{event.location || "Main Pavilion, EventHorizon Center"}</p>
                                </div>
                            </div>
                            
                            <div className="info-item border-none pb-0">
                                <FaTicketAlt className="info-icon" />
                                <div className="info-text-wrapper">
                                    <small>REGISTRATION TARIFF</small>
                                    <p className="price-detail">${event.price}</p>
                                </div>
                            </div>

                            <Button
                                className="btn-book-now-large w-100 mt-4"
                                onClick={() => navigate('/booking')}>
                                ACQUIRE PASSES
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
};

export default EventDetail;