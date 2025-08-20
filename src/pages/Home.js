// Update your Home.js hero section
import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import './Home.css';

// Import your hero images
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import checkListImage from '../assets/images/img-check-list.png';
import brandsImage from '../assets/images/brands.jpg';

function Home() {
  return (
    <div className="home-page">

      {/* Hero Carousel Section */}
      <Carousel
        fade
        interval={5000}
        controls={false}
        indicators={true}
        className="hero-carousel"
      >
        <Carousel.Item>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url('${hero1}')` }}
          >
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
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url('${hero2}')` }}
          >
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
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Main Content Section */}
      <section className="main-content py-5">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="home-section-title">PRO APPLIANCE INSTALLATION SPECIALIZES IN THE INSTALLATION OF ALL MAJOR HOUSEHOLD APPLIANCES.</h2>
              <div className="home-title-underline"></div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <p className="home-lead text-center mb-5">
                If you are looking for professional and experienced installers to assist you with your home appliance installation needs,
                our highly skilled team is ready to assist you with the efficiency and professionalism we have built our reputation upon.
              </p>
            </Col>
          </Row>

          {/* Features and Description Section */}
          <Row className="features-section">

            <Col lg={6}>
              <div className="features-image text-center">
                <img
                  src={checkListImage}
                  alt="Our Services: Fast Response Time, Dedicated to Customer Satisfaction, Professional Experienced Installers, Fast Custom Quotes"
                  className="img-fluid"
                />
              </div>
            </Col>

            {/* General info section */}
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
              <h2 className="home-section-title">BRANDS</h2>
              <div className="home-title-underline"></div>
              <div className="brands-image-container">
                <img
                  src={brandsImage}
                  alt="Our Services: Fast Response Time, Dedicated to Customer Satisfaction, Professional Experienced Installers, Fast Custom Quotes"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Appliance Showcase Section */}
      {/* Appliance Showcase Carousel */}
      <section className="appliance-showcase">
        <Container>
          <Carousel
            interval={6000}
            controls={true}
            indicators={true}
            className="appliance-carousel"
          >
            <Carousel.Item>
              <div className="appliance-content text-center text-white">
                <h2 className="appliance-title">Microwaves</h2>
                <p className="appliance-description">
                  For fast, easy cooking, microwaves have become a valuable appliance in homes today.
                  To save counter space, they can be installed over ranges and provide ventilation, or built into cabinets.
                  There are even easily accessible microwave drawers. For the sleek look of your built-in microwave,
                  we can help you order a standard or custom trim kit with one of our trusted trim kit company partners.
                </p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="appliance-content text-center text-white">
                <h2 className="appliance-title">Hoods</h2>
                <p className="appliance-description">
                  Installing a range hood for your stove or cooktop helps the ventilation process by sucking up smoke,
                  grease, steam, and other odors. Proper ventilation is key to a healthy home and an essential part of
                  the cooking process. Whether you need an under cabinet range hood, downdraft hood, or chimney hood,
                  Pro Appliance Installation can install your unit expertly and quickly!
                </p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="appliance-content text-center text-white">
                <h2 className="appliance-title">Cooktops</h2>
                <p className="appliance-description">
                  There are a variety of gas and electric cooktops available today. Having a cooktop can save space
                  and allow for more adaptability in kitchen configuration. From simmer burners to power burners,
                  island cooktops to counter cooktops, and downdraft cooktops to cooktops with range hoods,
                  we can handle any job.
                </p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="appliance-content text-center text-white">
                <h2 className="appliance-title">Ranges & Wall Ovens</h2>
                <p className="appliance-description">
                  With many sizes and styles of modern gas and electric range ovens on the market today,
                  finding a unit to fit your kitchen space is no problem. Pro Appliance Installation is comfortable
                  installing any brand, make, or model of stove or oven. We can help you move your old stove or oven unit out,
                  making space for your new gas or electric unit.
                </p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="appliance-content text-center text-white">
                <h2 className="appliance-title">Dishwashers</h2>
                <p className="appliance-description">
                  Dishwashers bring speedy cleanliness to a kitchen relieving stress and hours of tedious work from the homeowner.
                  Pro Appliance Installation can help you install a top of the line dishwasher which will become the kitchen
                  helpmate of your dreams! Dishwashers are one of our most commonly installed appliances.
                </p>
              </div>
            </Carousel.Item>
          </Carousel>
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