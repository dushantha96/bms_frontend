import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from './logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-between">
          
          <Col md={3}>
            <div>
              <img className="footer-logo" src={logo} alt="BMS Logo" />
            </div>
          </Col>

          <Col md={6}>
            <Row>
              <Col sm={4}>
                <h5>Information</h5>
                <ul>
                  <li><a href="#">About BMS</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </Col>
              <Col sm={4}>
                <h5>Quik Links</h5>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/search">Search Spot</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Sign Up</a></li>
                </ul>
              </Col>
              <Col sm={4}>
                <h5>Get in touch</h5>
                <div className="address">
                  <p>BOOk MY SPOT(PVT) LTD.</p>
                  <p>Dunn's Hat Factory</p>
                  <p>106 - 110 Kentish Town Road,</p>
                  <p>London,</p>
                  <p>NW1 9PX</p>
                  <p>UK.</p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <h5>Follow Us</h5>
            <div className="d-flex mt-3">
              <a href="#" className="social-icon-circle me-2" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon-circle me-2" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon-circle me-2" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon-circle me-2" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />
        
        <Row className="justify-content-between">
          <Col md={12} className="text-md-end">
            <p>© Copyright BMS 2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;