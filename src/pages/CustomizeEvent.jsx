import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes, FaCalculator } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Events.css';

const CustomizeEvent = () => {
    // 1. DYNAMIC DATA STATES FROM DATABASE
    const [locations, setLocations] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. ALL REACT HOOKS / STATES
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        eventType: '',
        eventDate: '',
        guests: 100,
        theme: '',
        preferredPlace: '',
        selectedMenus: [],
        services: [],
        additionalInfo: '',
        calculatedBudget: 0
    });

    const [sliderIndex, setSliderIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [stepSize, setStepSize] = useState(33.33);
    const [maxIndex, setMaxIndex] = useState(0);

    const serviceOptions = [
        { name: 'Premium Mixology Bar', price: 800 },
        { name: 'Cinematic Photography', price: 1200 },
        { name: 'Live Jazz Band', price: 950 },
        { name: 'Intelligent Lighting', price: 600 },
        { name: 'Immersive Floral Setup', price: 1500 },
        { name: 'Valet Logistics', price: 400 }
    ];

    // FETCH LOCATIONS AND MENUS FROM DATABASE
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                // Adjust endpoints matching your backend routing
                const locationsRes = await axios.get('https://eventhorizon-backend-production-242a.up.railway.app/api/locations');
                const menusRes = await axios.get('https://eventhorizon-backend-production-242a.up.railway.app/api/menus');
                
                setLocations(locationsRes.data);
                setMenuOptions(menusRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event configurations:", error);
                Swal.fire({
                    title: 'Fetch Error',
                    text: 'Failed to load custom layouts or catering options.',
                    icon: 'error'
                });
                setLoading(false);
            }
        };

        fetchEventData();
    }, []);

    // Responsive Slider Adjustments
    useEffect(() => {
        const handleResize = () => {
            if (locations.length === 0) return;
            if (window.innerWidth <= 768) {
                setStepSize(50);
                setMaxIndex(locations.length - 2 > 0 ? locations.length - 2 : 0);
            } else {
                setStepSize(33.33);
                setMaxIndex(locations.length - 3 > 0 ? locations.length - 3 : 0);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [locations.length]);

    // Helper Functions
    const getTodayDateString = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const getCostBreakdown = () => {
        const venueObj = locations.find(l => l.name === formData.preferredPlace);
        const venueCost = venueObj ? venueObj.basePrice : 0;

        const guestsCount = parseInt(formData.guests) || 0;
        const menuCostEach = formData.selectedMenus.reduce((sum, menuName) => {
            const item = menuOptions.find(m => m.name === menuName);
            return sum + (item ? item.price : 0);
        }, 0);
        const totalCateringCost = menuCostEach * guestsCount;

        const servicesCost = formData.services.reduce((sum, serviceName) => {
            const service = serviceOptions.find(s => s.name === serviceName);
            return sum + (service ? service.price : 0);
        }, 0);

        const absoluteTotal = venueCost + totalCateringCost + servicesCost;
        return { venueCost, totalCateringCost, servicesCost, absoluteTotal };
    };

    const { venueCost, totalCateringCost, servicesCost, absoluteTotal } = getCostBreakdown();

    // Slider Mechanics
    const nextSlide = () => {
        if (sliderIndex < maxIndex) {
            setSliderIndex(sliderIndex + 1);
        }
    };

    const prevSlide = () => {
        if (sliderIndex > 0) {
            setSliderIndex(sliderIndex - 1);
        }
    };

    const triggerModalView = (loc, e) => {
        e.stopPropagation();
        setModalData(loc);
        setShowModal(true);
    };

    const handleMenuChange = (menuName) => {
        const updatedMenus = [...formData.selectedMenus];
        if (updatedMenus.includes(menuName)) {
            updatedMenus.splice(updatedMenus.indexOf(menuName), 1);
        } else {
            updatedMenus.push(menuName);
        }
        setFormData({ ...formData, selectedMenus: updatedMenus });
    };

    const handleServiceChange = (serviceName) => {
        const updatedServices = [...formData.services];
        if (updatedServices.includes(serviceName)) {
            updatedServices.splice(updatedServices.indexOf(serviceName), 1);
        } else {
            updatedServices.push(serviceName);
        }
        setFormData({ ...formData, services: updatedServices });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, userEmail, userPhone, eventType, eventDate, guests, theme, preferredPlace, selectedMenus } = formData;

        if (
            !userName.trim() || 
            !userEmail.trim() || 
            !userPhone.trim() || 
            !eventType || 
            !eventDate || 
            !guests ||          
            !preferredPlace || 
            !theme ||            
            selectedMenus.length === 0 
        ) {
            Swal.fire({
                title: 'Required Details Missing',
                text: 'Please complete Steps 1 to 4 entirely before launching your request.',
                icon: 'warning',
                confirmButtonColor: '#111'
            });
            return;
        }

        const exactSubmissionData = { ...formData, calculatedBudget: absoluteTotal };

        try {
            const response = await axios.post('https://eventhorizon-backend-production-242a.up.railway.app/api/bookings/custom', exactSubmissionData);
            Swal.fire({
                title: 'Proposal Generated',
                text: response.data.message || 'Your layout and custom rates have been registered.',
                icon: 'success',
                confirmButtonColor: '#111'
            });
        } catch (error) {
            Swal.fire({ title: 'Error!', text: 'Submission failed.', icon: 'error' });
        }
    };

    const todayStr = getTodayDateString();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', color: '#111' }}>
                <h4>Loading Exclusive Assets...</h4>
            </div>
        );
    }

    return (
        <div className="luxury-editorial-page py-5">
            <Container>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="editorial-header-block text-center mb-5">
                    <span className="editorial-meta-tag">Bespoke Management</span>
                    <h1 className="editorial-giant-title">Customize Your <span className="serif-italic">Dream Event</span></h1>
                    <div className="editorial-divider-line"></div>
                </motion.div>

                <Form onSubmit={handleSubmit} className="editorial-form-core">

                    {/* STEP 01: CONTACT */}
                    <Row className="editorial-step-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number">01</h2>
                            <p className="step-meta-title">Contact Information</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel">
                            <Row>
                                <Col md={4} className="mb-4">
                                    <Form.Label>Full Name *</Form.Label>
                                    <Form.Control type="text" placeholder="e.g. Alexander Black" className="editorial-input-field" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Label>Email Address *</Form.Label>
                                    <Form.Control type="email" placeholder="name@domain.com" className="editorial-input-field" value={formData.userEmail} onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })} />
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control type="text" placeholder="+92 300 0000000" className="editorial-input-field" value={formData.userPhone} onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* STEP 02: LOGISTICS */}
                    <Row className="editorial-step-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number">02</h2>
                            <p className="step-meta-title">Event Logistics</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel">
                            <Row>
                                <Col md={4} className="mb-4">
                                    <Form.Label>Event Type *</Form.Label>
                                    <Form.Select className="editorial-input-field" onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} value={formData.eventType}>
                                        <option value="">Select Ceremony</option>
                                        <option>Birthday Party</option>
                                        <option>Wedding Ceremony</option>
                                        <option>Corporate Gala</option>
                                    </Form.Select>
                                </Col>

                                <Col md={4} className="mb-4">
                                    <Form.Label>Event Date *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className="editorial-input-field"
                                        value={formData.eventDate}
                                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                        min={todayStr}
                                    />
                                </Col>

                                <Col md={4} className="mb-4">
                                    <Form.Label>Estimated Guests *</Form.Label>
                                    <Form.Control type="number" min="1" className="editorial-input-field" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* STEP 03: SLIDER VENUE LOOKBOOK */}
                    <Row className="editorial-step-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number">03</h2>
                            <p className="step-meta-title">Vibe & Location</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel position-relative">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Form.Label className="m-0">Select Venue Location * (Click card to select)</Form.Label>
                                <div className="editorial-slider-controls">
                                    <button type="button" className={`slider-arrow-btn ${sliderIndex === 0 ? 'disabled' : ''}`} onClick={prevSlide}><FaChevronLeft /></button>
                                    <button type="button" className={`slider-arrow-btn ${sliderIndex >= maxIndex ? 'disabled' : ''}`} onClick={nextSlide}><FaChevronRight /></button>
                                </div>
                            </div>

                            <div className="editorial-slider-window">
                                <motion.div
                                    className="editorial-slider-track"
                                    animate={{ x: `-${sliderIndex * stepSize}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    {locations.map((loc) => (
                                        <div
                                            key={loc._id || loc.id}
                                            className={`editorial-slider-card ${formData.preferredPlace === loc.name ? 'is-selected' : ''}`}
                                            onClick={() => setFormData({ ...formData, preferredPlace: loc.name })}
                                        >
                                            <div className="card-img-frame">
                                                <img src={loc.img} alt={loc.name} className="card-editorial-img" />
                                                <div className="card-selection-overlay"><span>Selected Venue (${loc.basePrice})</span></div>
                                            </div>
                                            <div className="card-info-row">
                                                <h4 className="card-editorial-title">{loc.name}</h4>
                                                <button type="button" className="editorial-view-btn" onClick={(e) => triggerModalView(loc, e)}>View Info</button>
                                            </div>
                                            <div className="card-price-badge">${loc.basePrice}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <Row className="mt-4">
                                <Col md={6} className="mb-4">
                                    <Form.Label>Preferred Theme *</Form.Label>
                                    <Form.Select className="editorial-input-field" onChange={(e) => setFormData({ ...formData, theme: e.target.value })} value={formData.theme}>
                                        <option value="">Select Layout Theme</option>
                                        <option>Classic Royal & Traditional</option>
                                        <option>Elegant Minimalist Monochrome</option>
                                        <option>Boho Chic Aesthetic</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* STEP 04: CATERING GRID */}
                    <Row className="editorial-step-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number">04</h2>
                            <p className="step-meta-title">Menu & Add-ons</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel">
                            <div className="mb-5">
                                <Form.Label className="d-block mb-1">Select Custom Catering Dishes *</Form.Label>
                                <small className="text-muted d-block mb-3" style={{ textTransform: 'none' }}>Dishes are charged per guest count: {formData.guests} guests active.</small>

                                <div className="editorial-lookbook-grid">
                                    {menuOptions.map((menu) => (
                                        <div key={menu._id || menu.id} className={`editorial-menu-card ${formData.selectedMenus.includes(menu.name) ? 'is-active' : ''}`} onClick={() => handleMenuChange(menu.name)}>
                                            <div className="menu-card-img-frame">
                                                <img src={menu.img} alt={menu.name} className="menu-editorial-img" />
                                            </div>
                                            <div className="menu-card-details">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className="menu-item-title">{menu.name}</h5>
                                                    <span className="menu-item-price">${menu.price}/pp</span>
                                                </div>
                                                <p className="menu-item-desc">{menu.desc}</p>
                                            </div>
                                            <div className="menu-custom-checkbox"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-4 rgba-line" />

                            {/* OPTIONAL SECTION */}
                            <Form.Label className="d-block mb-3">Premium Service Enhancements <span className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'none' }}>(Optional)</span></Form.Label>
                            <div className="editorial-checkbox-grid">
                                {serviceOptions.map((service) => (
                                    <label key={service.name} className={`editorial-checkbox-tile ${formData.services.includes(service.name) ? 'is-active' : ''}`}>
                                        <input type="checkbox" checked={formData.services.includes(service.name)} onChange={() => handleServiceChange(service.name)} />
                                        <span className="tile-custom-box"></span>
                                        <span className="tile-text">{service.name} (${service.price})</span>
                                    </label>
                                ))}
                            </div>
                        </Col>
                    </Row>

                    {/* STEP 05: ADDITIONAL */}
                    <Row className="editorial-step-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number">05</h2>
                            <p className="step-meta-title">Special Requests</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel">
                            <Form.Control as="textarea" rows={4} placeholder="Describe specific details..." className="editorial-input-field text-area-custom" value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} />
                        </Col>
                    </Row>

                    {/* DYNAMIC BILLING STATEMENT & SUBMISSION */}
                    <Row className="editorial-step-row dynamic-billing-row">
                        <Col lg={3} className="step-meta-panel">
                            <h2 className="step-huge-number"><FaCalculator style={{ fontSize: '2.5rem' }} /></h2>
                            <p className="step-meta-title">Live Rate Statement</p>
                        </Col>
                        <Col lg={9} className="step-fields-panel">
                            <div className="premium-invoice-card">
                                <div className="invoice-line">
                                    <span>Venue Destination ({formData.preferredPlace || 'None Selected'})</span>
                                    <span>${venueCost.toLocaleString()}</span>
                                </div>
                                <div className="invoice-line">
                                    <span>Premium Catering ({formData.selectedMenus.length} Items × {formData.guests} Guests)</span>
                                    <span>${totalCateringCost.toLocaleString()}</span>
                                </div>
                                <div className="invoice-line">
                                    <span>Enhancements & Logistics ({formData.services.length} Added)</span>
                                    <span>${servicesCost.toLocaleString()}</span>
                                </div>
                                <div className="invoice-total-divider"></div>
                                <div className="invoice-line total-amount-line">
                                    <span>Estimated Investment</span>
                                    <span className="grand-total-digits">${absoluteTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="editorial-action-wrapper text-end mt-4">
                                <button type="submit" className="editorial-submit-btn">
                                    <span>Launch Custom Request</span>
                                    <FaArrowRight className="ms-3 button-arrow" />
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>

            {/* EDITORIAL MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="luxury-editorial-modal" backdrop="static">
                {modalData && (
                    <>
                        <div className="modal-editorial-image-frame">
                            <img src={modalData.img} alt={modalData.name} />
                            <button className="modal-close-icon-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
                        </div>
                        <Modal.Body className="modal-editorial-body">
                            <span className="modal-meta-tag">Venue Dossier — Base Rate: ${modalData.basePrice}</span>
                            <h3 className="modal-venue-title">{modalData.name}</h3>
                            <div className="modal-divider-hairline"></div>
                            <div className="modal-info-spec-row">
                                <div><span className="spec-label">Capacity Specs</span><p className="spec-value">{modalData.capacity}</p></div>
                                <div><span className="spec-label">Atmosphere Vibe</span><p className="spec-value">{modalData.vibe}</p></div>
                            </div>
                            <div className="modal-desc-block">
                                <span className="spec-label">Architectural Features & Utilities</span>
                                <p className="modal-features-text">{modalData.features}</p>
                            </div>
                            <button className="modal-select-action-btn" onClick={() => { setFormData({ ...formData, preferredPlace: modalData.name }); setShowModal(false); }}>
                                Select This Venue Destination
                            </button>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default CustomizeEvent;