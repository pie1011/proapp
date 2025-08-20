import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Change header after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <Navbar 
        bg="white" 
        expand="lg" 
        className={`navbar-custom ${isScrolled ? 'navbar-scrolled' : ''}`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/" className="brand-container">
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