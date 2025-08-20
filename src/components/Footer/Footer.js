import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/img-logo.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    {/* Logo Section */}
                    <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                        <img
                            src={logo}
                            alt="Pro Appliance Installation"
                            className="footer-logo"
                        />
                    </Col>

                    {/* Contact Info Section */}
                    {/* Contact Info Section */}
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <div className="footer-contact">
                            <div className="contact-item">
                                <i className="fas fa-phone me-2"></i>
                                <a href="tel:4084265999" className="contact-link">
                                    (408) 426-5999
                                </a>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope me-2"></i>
                                <a href="mailto:info@proapplianceinstallation.com" className="contact-link">
                                    info@proapplianceinstallation.com
                                </a>
                            </div>
                            <div className="license-info">
                                CSLB License # 816686
                            </div>

                            {/* Social Media Links */}
                            <div className="social-links">
                                <a
                                    href="https://www.linkedin.com/company/pro-appliance-installation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="LinkedIn"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a
                                    href="https://www.yelp.com/biz/pro-appliance-installation-campbell?sort_by=date_desc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Yelp"
                                >
                                    <i className="fab fa-yelp"></i>
                                </a>
                                <a
                                    href="https://www.facebook.com/proapplianceinstallation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </div>
                        </div>
                    </Col>

                    {/* Quote Link Section */}
                    <Col md={4} className="text-center text-md-end">
                        <Link to="/quote" className="btn btn-outline-light footer-quote-btn">
                            Request a Custom Quote
                        </Link>
                    </Col>
                </Row>

                <hr className="footer-divider" />

                <Row>
                    <Col className="text-center">
                        <p className="footer-copyright">
                            © {currentYear} <a href="https://proapplianceinstallation.com" className="footer-link">Pro Appliance Installation</a>. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;