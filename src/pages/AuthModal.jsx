import React, { useState } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AuthModal.css';

export default function AuthModal({ show, handleClose }) {
  // Switch seamlessly between 'login', 'register', and 'forgot'
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Switch between views cleanly and reset dynamic alerts
  const switchView = (targetView) => {
    setView(targetView);
    setError('');
    setSuccess('');
    setFormData({ username: '', email: '', password: '' });
  };

  // Handle Input Alterations
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submission Flow for Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess(response.data.message || 'Account successfully instantiated.');
      setTimeout(() => {
        switchView('login'); // Automatically slide back to login view
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration framework failed.');
    }
  };

  // Submission Flow for Login Portal
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      handleClose(); // Close popup immediately upon verification

      Swal.fire({
        title: 'Access Granted',
        text: `Welcome to the pavilion ledger, ${response.data.user.username}.`,
        icon: 'success',
        background: '#fcfbfa',
        color: '#111111',
        confirmButtonColor: '#111111',
        customClass: {
          popup: 'editorial-alert-popup',
          confirmButton: 'editorial-alert-btn'
        }
      }).then(() => {
        navigate('/');
      });

    } catch (err) {
      Swal.fire({
        title: 'Access Denied',
        text: err.response?.data?.message || 'Invalid credentials verified.',
        icon: 'error',
        background: '#fcfbfa',
        color: '#111111',
        confirmButtonColor: '#111111',
        customClass: {
          popup: 'editorial-alert-popup',
          confirmButton: 'editorial-alert-btn'
        }
      });
    }
  };

  // Submission Flow for Forgot Password Recovery
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: formData.email
      });

      setSuccess(response.data.message || 'Recovery coordinates dispatched to email.');
      setTimeout(() => {
        switchView('login'); // Redirect safely back to access portal
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Recovery architecture failed.');
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static"
      contentClassName="luxury-auth-modal"
    >
      <div className="auth-modal-wrapper">
        <button className="auth-modal-close-btn" onClick={handleClose}>
          <FaTimes />
        </button>

        <AnimatePresence mode="wait">
          {view === 'login' && (
            /* ================= LOGIN VIEW ================= */
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="auth-view-container"
            >
              <div className="auth-header-block text-center mb-4">
                <span className="auth-meta-tag">Secure Portal Entry</span>
                <h2 className="auth-main-title">Account <span className="serif-italic">Verification</span></h2>
                <div className="auth-divider-hairline"></div>
              </div>

              <Form onSubmit={handleLoginSubmit} className="editorial-form-core">
                <Form.Group className="mb-3">
                  <Form.Label>Electronic Mail</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@organization.com" 
                    className="editorial-input-field" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password Signature</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="••••••••" 
                    className="editorial-input-field" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <div className="text-end mb-4">
                  {/* 💡 Ab ye page link nahi karega, balki modal ke andar hi view switch karega */}
                  <span onClick={() => switchView('forgot')} className="editorial-forgot-link" style={{ cursor: 'pointer' }}>
                    Forgot Password Signature?
                  </span>
                </div>

                <button type="submit" className="editorial-auth-submit-btn w-100 mb-3">
                  <span>Enter Portal</span>
                  <FaArrowRight className="ms-2 button-arrow" />
                </button>

                <p className="auth-switch-text text-center m-0">
                  New to the platform? <span onClick={() => switchView('register')} className="editorial-toggle-action">Join the Horizon</span>
                </p>
              </Form>
            </motion.div>
          )}

          {view === 'register' && (
            /* ================= REGISTER VIEW ================= */
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="auth-view-container"
            >
              <div className="auth-header-block text-center mb-4">
                <span className="auth-meta-tag">New Ledger Institution</span>
                <h2 className="auth-main-title">Create <span className="serif-italic">Credentials</span></h2>
                <div className="auth-divider-hairline"></div>
              </div>

              {error && <Alert variant="danger" className="editorial-alert-box">{error}</Alert>}
              {success && <Alert variant="success" className="editorial-alert-box-success">{success}</Alert>}

              <Form onSubmit={handleRegisterSubmit} className="editorial-form-core">
                <Form.Group className="mb-3">
                  <Form.Label>Selected Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="username"
                    placeholder="e.g. Alexander_792" 
                    className="editorial-input-field" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Electronic Mail Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@domain.com" 
                    className="editorial-input-field" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Secure Password Code</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="••••••••" 
                    className="editorial-input-field" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <button type="submit" className="editorial-auth-submit-btn w-100 mb-3">
                  <span>Instantiate Registry</span>
                  <FaArrowRight className="ms-2 button-arrow" />
                </button>

                <p className="auth-switch-text text-center m-0">
                  Already a registered user? <span onClick={() => switchView('login')} className="editorial-toggle-action">Access Verification</span>
                </p>
              </Form>
            </motion.div>
          )}

          {view === 'forgot' && (
            /* ================= FORGOT PASSWORD VIEW ================= */
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="auth-view-container"
            >
              <div className="auth-header-block text-center mb-4">
                <span className="auth-meta-tag">Credential Retrieval</span>
                <h2 className="auth-main-title">Recover <span className="serif-italic">Signature</span></h2>
                <div className="auth-divider-hairline"></div>
              </div>

              {error && <Alert variant="danger" className="editorial-alert-box">{error}</Alert>}
              {success && <Alert variant="success" className="editorial-alert-box-success">{success}</Alert>}

              <Form onSubmit={handleForgotPasswordSubmit} className="editorial-form-core">
                <p className="text-muted text-center mb-4" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                  Enter your registered electronic mail address below. We will transmit instructions to reset your secure identity matrix.
                </p>

                <Form.Group className="mb-4">
                  <Form.Label>Electronic Mail Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@organization.com" 
                    className="editorial-input-field" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>

                <button type="submit" className="editorial-auth-submit-btn w-100 mb-3">
                  <span>Send Recovery Mail</span>
                  <FaArrowRight className="ms-2 button-arrow" />
                </button>

                <p className="auth-switch-text text-center m-0">
                  Remember your parameters? <span onClick={() => switchView('login')} className="editorial-toggle-action">Return to Login</span>
                </p>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}