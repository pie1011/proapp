import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="white" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" className="brand-container">
            {/* Placeholder for your logo */}
            <div className="logo-placeholder">
              <i className="fas fa-wrench text-primary me-2"></i>
              <span className="brand-text">
                <span className="brand-pro">PRO</span>
                <span className="brand-appliance">Appliance</span>
                <span className="brand-installation">Installation</span>
              </span>
            </div>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="nav-item">HOME</Nav.Link>
              <Nav.Link href="/about" className="nav-item">ABOUT US</Nav.Link>
              <Nav.Link href="/service-areas" className="nav-item">SERVICE AREAS</Nav.Link>
              <Nav.Link href="/partnerships" className="nav-item">PARTNERSHIPS</Nav.Link>
              <Nav.Link href="/quote" className="nav-item quote-link">CUSTOM QUOTE</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;