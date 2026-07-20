import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import './Booking.css';

// Dynamic Pricing Map matching Italian premium editorial vibe
const EVENT_PRICES = {
    'Neon Nights 2026': 75,
    'Cyber Beats Festival': 90,
    'Tech Pulse 2026': 60,
    'Midnight Gala': 120,
    'Startup Pitch Night': 45,
    'Retro Gaming Expo': 50,
    'Urban Art Workshop': 65,
    'Stellar Yoga Session': 40,
    'Code & Coffee Meetup': 30,
    'The Plum Jazz Night': 85,
    'Future Foodie Expo': 55
};

export default function Booking() {
    const [ticketCount, setTicketCount] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [transId, setTransId] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        eventName: 'Neon Nights 2026',
    });

    // Get live price for selected event
    const currentPricePerTicket = EVENT_PRICES[formData.eventName] || 50;
    const totalAmount = ticketCount * currentPricePerTicket;

    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingPayload = {
            user_name: formData.fullName,
            user_email: formData.email,
            user_phone: formData.phone,
            event_name: formData.eventName,
            tickets_count: ticketCount,
            payment_method: paymentMethod, 
            transaction_id: transId        
        };

        try {
            const response = await axios.post('https://eventhorizon-backend-production-242a.up.railway.app/api/bookings/standard', bookingPayload);

            Swal.fire({
                title: 'TICKET CONFIRMED',
                text: response.data.message || 'Your premium access pass has been compiled.',
                icon: 'success',
                background: '#fcfbfa',
                color: '#111111',
                confirmButtonColor: '#111111',
                customClass: {
                    popup: 'editorial-alert-popup',
                    confirmButton: 'editorial-alert-btn'
                }
            });

            // Reset Form states
            setFormData({ fullName: '', email: '', phone: '', eventName: 'Neon Nights 2026' });
            setTicketCount(1);
            setPaymentMethod('');
            setTransId('');
        } catch (error) {
            Swal.fire({
                title: 'ORDER ERROR',
                text: 'Something went wrong. Please check your inputs and try again.',
                icon: 'error',
                background: '#fcfbfa',
                color: '#111111',
                confirmButtonColor: '#111111'
            });
        }
    };

    return (
        <div className="luxury-booking-wrapper py-5">
            <Container className="py-5 mt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="booking-split-container"
                >
                    <Row className="g-0 row-eq-height">
                        {/* LEFT COLUMN: Premium Editorial Showcase Frame */}
                        <Col lg={5} className="editorial-meta-panel d-flex flex-column justify-content-between p-4 p-md-5">
                            <div className="meta-panel-top">
                                <span className="journal-tag">ACCESS PORTFOLIO</span>
                                <h2 className="magazine-huge-header mt-2">SECURE<br />YOUR<br /><span className="serif-italic-accent">Pass.</span></h2>
                            </div>
                            
                            <div className="meta-panel-center my-4">
                                <div className="live-ticket-stub">
                                    <span className="stub-label">SELECTED CURATION</span>
                                    <div className="stub-title">{formData.eventName}</div>
                                    
                                    <Row className="mt-4 pt-3 border-top-hairline">
                                        <Col xs={6}>
                                            <span className="stub-label">RATE</span>
                                            <div className="stub-value">${currentPricePerTicket} <span className="small-text">/ each</span></div>
                                        </Col>
                                        <Col xs={6}>
                                            <span className="stub-label">QTY</span>
                                            <div className="stub-value">× {ticketCount}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div className="meta-panel-bottom">
                                <div className="total-display-block">
                                    <span className="total-label-huge">TOTAL DUE</span>
                                    <div className="total-amount-huge">${totalAmount}.00</div>
                                </div>
                                <p className="editorial-legal-text mt-3">
                                    All entries are cataloged natively. Print verification receipt will be transmitted instantly via email.
                                </p>
                            </div>
                        </Col>

                        {/* RIGHT COLUMN: The Luxury Form System */}
                        <Col lg={7} className="editorial-form-panel p-4 p-md-5">
                            <Form onSubmit={handleBooking} className="h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="editorial-label">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="editorial-input"
                                            placeholder="e.g., John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="editorial-label">Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            className="editorial-input"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="editorial-label">Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="editorial-input"
                                            placeholder="+92 300 0000000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </Form.Group>

                                    <Row className="mb-4">
                                        <Col md={8} className="mb-4 mb-md-0">
                                            <Form.Group>
                                                <Form.Label className="editorial-label">Select Event</Form.Label>
                                                <Form.Select
                                                    className="editorial-input"
                                                    value={formData.eventName}
                                                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                                >
                                                    {Object.keys(EVENT_PRICES).map((event) => (
                                                        <option key={event} value={event}>{event}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label className="editorial-label">Quantity</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    className="editorial-input"
                                                    value={ticketCount}
                                                    onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                                                    min="1"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="editorial-label">Payment Method</Form.Label>
                                        <Form.Select
                                            className="editorial-input"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Method</option>
                                            <option value="JazzCash">JazzCash</option>
                                            <option value="EasyPaisa">EasyPaisa</option>
                                            <option value="Card">Credit/Debit Card</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Conditional Render Gateway Fields */}
                                    {(paymentMethod === 'JazzCash' || paymentMethod === 'EasyPaisa') && (
                                        <motion.Group initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                                            <Form.Label className="editorial-label gateway-notice-label">Transaction ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter TID Code"
                                                className="editorial-input gateway-notice-input"
                                                value={transId}
                                                onChange={(e) => setTransId(e.target.value)}
                                                required
                                            />
                                        </motion.Group>
                                    )}

                                    {paymentMethod === 'Card' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -5 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            className="editorial-nested-card p-3 mb-4"
                                        >
                                            <Form.Group className="mb-3">
                                                <Form.Label className="editorial-label-sub">Card Number</Form.Label>
                                                <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" className="editorial-input-sub" />
                                            </Form.Group>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Label className="editorial-label-sub">Expiry</Form.Label>
                                                    <Form.Control placeholder="MM/YY" className="editorial-input-sub" />
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Label className="editorial-label-sub">CVV</Form.Label>
                                                    <Form.Control placeholder="123" className="editorial-input-sub" />
                                                </Col>
                                            </Row>
                                        </motion.div>
                                    )}
                                </div>

                                <Button type="submit" className="editorial-submit-btn main-action-trigger w-100 py-3 mt-4">
                                    CONFIRM AND REGISTER SEAT
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </motion.div>
            </Container>
        </div>
    );
}