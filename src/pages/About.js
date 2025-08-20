import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto text-center">
                            <h1 className="page-title">About Us</h1>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Main Content */}
            <section className="about-content py-5">
                <Container>
                    {/* Company Story */}
                    <Row className="mb-5">
                        <Col lg={12}>
                            <h2 className="section-title text-center mb-4">Our Story</h2>
                            <div className="title-underline mx-auto mb-5"></div>

                            <p className="lead text-center mb-4">
                                Pro Appliance Installation is a family-owned and operated business based in Campbell, California,
                                with over 30 years of combined experience in professional appliance installation services.
                            </p>

                            <Row>
                                <Col lg={6}>
                                    <p>
                                        Our stellar management and installation team is dedicated to excellent customer service.
                                        By incorporating the latest routing and tracking technologies with time-proven systems,
                                        we have the logistical capacity to service the appliance installation requirements of
                                        homeowners and retailers alike.
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <p>
                                        Our extensively trained installers are prepared for any situation regarding the delivery,
                                        installation, and responsible disposal of existing appliances. We pride ourselves on
                                        being licensed, insured, and background-checked professionals who treat every home
                                        with the respect and care it deserves.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Why Choose Us */}
                    <Row className="mb-5">
                        <Col lg={12}>
                            <h2 className="section-title text-center mb-4">Why Choose Pro Appliance Installation?</h2>
                            <div className="title-underline mx-auto mb-5"></div>

                            <Row>
                                <Col lg={4} className="mb-4">
                                    <Card className="feature-card h-100">
                                        <Card.Body className="text-center">
                                            <div className="feature-icon">
                                                <i className="fas fa-certificate"></i>
                                            </div>
                                            <Card.Title>Licensed & Insured</Card.Title>
                                            <Card.Text>
                                                CSLB License #816686. Fully licensed, insured, and bonded for your peace of mind.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col lg={4} className="mb-4">
                                    <Card className="feature-card h-100">
                                        <Card.Body className="text-center">
                                            <div className="feature-icon">
                                                <i className="fas fa-users"></i>
                                            </div>
                                            <Card.Title>Experienced Team</Card.Title>
                                            <Card.Text>
                                                Over 30 years of combined experience with background-checked, professional installers.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col lg={4} className="mb-4">
                                    <Card className="feature-card h-100">
                                        <Card.Body className="text-center">
                                            <div className="feature-icon">
                                                <i className="fas fa-home"></i>
                                            </div>
                                            <Card.Title>Family Owned</Card.Title>
                                            <Card.Text>
                                                Family-owned and operated business based in Campbell, serving the South Bay community.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Service Areas */}
                    <Row className="mb-5">
                        <Col lg={12}>
                            <h2 className="section-title text-center mb-4">Service Areas</h2>
                            <div className="title-underline mx-auto mb-4"></div>

                            <p className="text-center mb-4">
                                <strong>Serving the South Bay and Beyond</strong>
                            </p>

                            <Row>
                                <Col lg={8} className="mx-auto">
                                    <div className="service-areas">
                                        <div className="areas-grid">
                                            <span>Campbell</span>
                                            <span>Cupertino</span>
                                            <span>Gilroy</span>
                                            <span>Los Altos</span>
                                            <span>Los Altos Hills</span>
                                            <span>Los Gatos</span>
                                            <span>Milpitas</span>
                                            <span>Monte Sereno</span>
                                            <span>Morgan Hill</span>
                                            <span>Mountain View</span>
                                            <span>Palo Alto</span>
                                            <span>San Jose</span>
                                            <span>Santa Clara</span>
                                            <span>Saratoga</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Call to Action */}
                    <Row>
                        <Col lg={8} className="mx-auto text-center">
                            <div className="about-cta">
                                <h3>Ready to Get Started?</h3>
                                <p>Contact us today for your free custom quote and experience the Pro Appliance Installation difference.</p>
                                <a href="/quote" className="btn btn-primary btn-lg">Get Your Free Quote</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default About;