import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import brandsImage from '../assets/images/brands.jpg';
import './Partnerships.css';

const Partnerships = () => {
  const partnershipBenefits = [
    {
      icon: 'fas fa-handshake',
      title: 'Retailer Partnerships',
      description: 'We work closely with appliance retailers to provide seamless installation services for their customers.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Manufacturer Expertise',
      description: 'Our team is trained on installations for all major appliance brands and maintains manufacturer relationships.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Warranty Support',
      description: 'Professional installations that protect manufacturer warranties and ensure proper appliance operation.'
    },
    {
      icon: 'fas fa-truck',
      title: 'Logistics Coordination',
      description: 'We coordinate with suppliers and retailers for efficient delivery and installation scheduling.'
    }
  ];

  return (
    <div className="partnerships-page">
      {/* Hero Section */}
      <section className="partnerships-hero">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="page-title">Partnerships</h1>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Content */}
      <section className="partnerships-content py-5">
        <Container>
          {/* Introduction */}
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="section-title">Working Together for Excellence</h2>
              <div className="title-underline mx-auto mb-4"></div>
              <p className="lead">
                Pro Appliance Installation builds strong relationships with retailers, manufacturers, 
                and suppliers to deliver the highest quality installation services to our customers.
              </p>
            </Col>
          </Row>

          {/* Partnership Benefits */}
          <Row className="mb-5">
            <Col lg={12}>
              <h3 className="partnerships-subtitle text-center mb-4">How We Partner</h3>
              <Row>
                {partnershipBenefits.map((benefit, index) => (
                  <Col lg={6} className="mb-4" key={index}>
                    <Card className="partnership-card h-100">
                      <Card.Body className="text-center">
                        <div className="partnership-icon">
                          <i className={benefit.icon}></i>
                        </div>
                        <Card.Title>{benefit.title}</Card.Title>
                        <Card.Text>{benefit.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Brands Section */}
          <Row className="mb-5">
            <Col lg={12}>
              <div className="brands-container">
                <h3 className="brands-title text-center mb-4">Trusted Brands We Install</h3>
                <div className="brands-wrapper">
                  <img 
                    src={brandsImage} 
                    alt="Appliance Brands: AIRE, Amana, Viking, Whirlpool, Spiralfix, Electrolux, Zephyr, Hotpoint" 
                    className="brands-display"
                  />
                  <p className="brands-description">
                    We are experienced in installing appliances from all major manufacturers, 
                    ensuring proper setup and warranty compliance for every brand.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Partnership Information */}
          <Row className="mb-5">
            <Col lg={6} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body>
                  <div className="info-icon">
                    <i className="fas fa-store"></i>
                  </div>
                  <Card.Title>For Retailers</Card.Title>
                  <Card.Text>
                    Partner with us to offer your customers professional installation services. 
                    We provide reliable, timely installations that enhance customer satisfaction 
                    and protect your reputation.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <Card className="info-card h-100">
                <Card.Body>
                  <div className="info-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <Card.Title>For Homeowners</Card.Title>
                  <Card.Text>
                    Benefit from our established relationships with manufacturers and retailers. 
                    This means better coordination, faster service, and installations that meet 
                    the highest industry standards.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Call to Action */}
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="partnerships-cta">
                <h3 className="text-center mb-4">Interested in Partnering With Us?</h3>
                <p className="text-center mb-4">
                  Whether you're a retailer looking for reliable installation services or a homeowner 
                  seeking professional appliance installation, we'd love to work with you.
                </p>
                <Row>
                  <Col md={6} className="text-center mb-3">
                    <div className="cta-contact">
                      <i className="fas fa-phone cta-icon"></i>
                      <h5>Call Us</h5>
                      <a href="tel:4084265999" className="cta-link">
                        (408) 426-5999
                      </a>
                    </div>
                  </Col>
                  <Col md={6} className="text-center mb-3">
                    <div className="cta-contact">
                      <i className="fas fa-envelope cta-icon"></i>
                      <h5>Email Us</h5>
                      <a href="mailto:info@proapplianceinstallation.com" className="cta-link">
                        info@proapplianceinstallation.com
                      </a>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <a href="/quote" className="btn btn-primary btn-lg">
                    Request a Quote
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

export default Partnerships;