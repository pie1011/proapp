import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <div className="hero-content">
                  <h1 className="hero-title">WELCOME</h1>
                  <div className="hero-divider"></div>
                  <p className="hero-subtitle">Quality Service. Expert Installers.</p>
                  <p className="hero-tagline">Serving the South Bay and Beyond.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-content py-5">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title">PRO APPLIANCE INSTALLATION SPECIALIZES IN THE INSTALLATION OF ALL MAJOR HOUSEHOLD APPLIANCES.</h2>
              <div className="title-underline"></div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={12}>
              <p className="lead text-center mb-5">
                If you are looking for professional and experienced installers to assist you with your home appliance installation needs, 
                our highly skilled team is ready to assist you with the efficiency and professionalism we have built our reputation upon.
              </p>
            </Col>
          </Row>

          {/* Features and Description Section */}
          <Row className="features-section">
            <Col lg={6}>
              {/* NOTE: Replace these checkmark icons with your actual wrench-logo checkmark images */}
              <div className="feature-item d-flex align-items-center mb-4">
                <div className="feature-icon">
                  {/* TODO: Replace with your wrench checkmark image */}
                  <i className="fas fa-check-circle"></i>
                </div>
                <span className="feature-text">Fast Response Time</span>
              </div>
              
              <div className="feature-item d-flex align-items-center mb-4">
                <div className="feature-icon">
                  {/* TODO: Replace with your wrench checkmark image */}
                  <i className="fas fa-check-circle"></i>
                </div>
                <span className="feature-text">Dedicated to Customer Satisfaction</span>
              </div>
              
              <div className="feature-item d-flex align-items-center mb-4">
                <div className="feature-icon">
                  {/* TODO: Replace with your wrench checkmark image */}
                  <i className="fas fa-check-circle"></i>
                </div>
                <span className="feature-text">Professional, Experienced Installers</span>
              </div>
              
              <div className="feature-item d-flex align-items-center mb-4">
                <div className="feature-icon">
                  {/* TODO: Replace with your wrench checkmark image */}
                  <i className="fas fa-check-circle"></i>
                </div>
                <span className="feature-text">Fast Custom Quotes</span>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="description-content">
                <p className="description-text">
                  Our stellar management and installation team is dedicated to excellent customer service. 
                  By incorporating the latest routing and tracking technologies with time proven systems, 
                  we have the logistical capacity to service the appliance installation requirements of 
                  homeowners and retailers alike. Our extensively trained installers are prepared for any 
                  situation regarding the delivery, installation, and responsible disposal of existing appliances.
                </p>
                
                <div className="action-buttons mt-4">
                  <Button variant="dark" className="me-3 mb-2">
                    <i className="fas fa-download me-2"></i>
                    Download Flyer
                  </Button>
                  <Button variant="dark" className="mb-2">
                    <i className="fas fa-calculator me-2"></i>
                    Get Quote
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      
   {/* Brands Section */}
      <section className="brands-section py-5 bg-white">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <h2 className="section-title">BRANDS</h2>
              <div className="title-underline"></div>
              <div className="brands-image-container">
                <div className="brands-placeholder">
                  {/* TODO: Replace with your single brand logos image */}
                  <p className="text-muted">Brand Logos Image Placeholder</p>
                  <p className="text-muted small">(Single image with all brand logos)</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Appliance Showcase Section */}
      <section className="appliance-showcase py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div className="appliance-item">
                <div className="appliance-icon mb-4">
                  <i className="fas fa-sink fa-4x text-white"></i>
                </div>
                <h3 className="appliance-title text-white mb-4">Dishwashers</h3>
                <p className="appliance-description text-white">
                  Dishwashers bring speedy cleanliness to a kitchen relieving stress and hours of tedious work from the homeowner. 
                  Pro Appliance Installation can help you install a top of the line dishwasher which will become the kitchen helpmate of your dreams! 
                  Dishwashers are one of our most commonly installed appliances.
                </p>
                <div className="carousel-dots mt-4">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot active"></span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Custom Quote CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="cta-title">CUSTOM QUOTE</h2>
              <p className="cta-description">
                We provide quotes in writing for every project. Contact us today for a custom quote.
              </p>
              <Button variant="outline-light" size="lg" className="cta-button">
                GET QUOTE
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;