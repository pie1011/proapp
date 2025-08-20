import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import serviceMap from '../assets/images/service-map.png';
import './ServiceAreas.css';

const ServiceAreas = () => {
    const serviceData = {
        'Santa Clara County': [
            'Campbell', 'Cupertino', 'Gilroy', 'Los Altos', 'Los Altos Hills',
            'Los Gatos', 'Milpitas', 'Monte Sereno', 'Morgan Hill', 'Mountain View',
            'Palo Alto', 'San Jose', 'Santa Clara', 'Saratoga', 'Sunnyvale'
        ],
        'San Mateo County': [
            'Belmont', 'Brisbane', 'Burlingame', 'Daly City', 'Foster City',
            'Half Moon Bay', 'Menlo Park', 'Millbrae', 'Pacifica', 'Portola Valley',
            'Redwood City', 'San Bruno', 'San Carlos', 'San Mateo'
        ],
        'Santa Cruz Area': [
            'Santa Cruz', 'Capitola', 'Soquel', 'Aptos', 'Scotts Valley',
            'San Lorenzo Valley', 'Watsonville'
        ],
        'Alameda County': [
            'Select Areas'
        ]
    };

    return (
        <div className="service-areas-page">
            {/* Hero Section */}
            <section className="service-hero">
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto text-center">
                            <h1 className="page-title">Service Areas</h1>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Main Content */}
            <section className="service-content py-5">
                <Container>
                    {/* Introduction */}
                    <Row className="mb-5">
                        <Col lg={8} className="mx-auto text-center">
                            <h2 className="section-title">Serving the South Bay and Beyond</h2>
                            <div className="title-underline mx-auto mb-4"></div>
                            <p className="lead">
                                Pro Appliance Installation proudly serves multiple counties throughout the Bay Area
                                with professional appliance installation services.
                            </p>
                        </Col>
                    </Row>

                    {/* Service Areas by County */}
                    <Row className="mb-5">
                        <Col lg={12}>
                            <div className="counties-container">
                                {Object.entries(serviceData).map(([county, cities], index) => (
                                    <div key={index} className="county-section mb-4">
                                        <h3 className="county-title">{county}</h3>
                                        <div className="cities-list">
                                            {cities.map((city, cityIndex) => (
                                                <span key={cityIndex} className="city-item">
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Additional Information */}
                                <div className="additional-info">
                                    <p className="info-text">
                                        <strong>Other areas</strong> – <a href="/quote" className="quote-link">Inquire for availability</a>
                                    </p>
                                    <p className="info-text">
                                        Additional mileage fees may apply, dependent on installation location.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Map Section */}
                    <Row className="mb-5">
                        <Col lg={10} className="mx-auto">
                            <div className="map-container">
                                <h3 className="map-title text-center mb-4">Our Service Area Map</h3>
                                <div className="map-wrapper">
                                    <img
                                        src={serviceMap}
                                        alt="Pro Appliance Installation Service Areas Map"
                                        className="service-map"
                                    />
                                    <p className="map-disclaimer">
                                        This map is for general reference of our typical service areas. Contact us for more information.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Contact Information */}
                    <Row>
                        <Col lg={8} className="mx-auto">
                            <div className="service-contact">
                                <h3 className="text-center mb-4">Need Service in Your Area?</h3>

                                {/* Contact Info in Single Row */}
                                <div className="contact-info-row">
                                    <div className="contact-item-inline">
                                        <i className="fas fa-phone contact-icon"></i>
                                        <span className="contact-label">Call Us Today:</span>
                                        <a href="tel:4084265999" className="contact-link">
                                            (408) 426-5999
                                        </a>
                                    </div>

                                    <div className="contact-item-inline">
                                        <i className="fas fa-envelope contact-icon"></i>
                                        <span className="contact-label">Email Us:</span>
                                        <a href="mailto:info@proapplianceinstallation.com" className="contact-link">
                                            info@proapplianceinstallation.com
                                        </a>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <a href="/quote" className="quote-button">
                                      <i className="fas fa-calculator me-2"></i>  Request Your Free Quote
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </div>
    );
};

export default ServiceAreas;