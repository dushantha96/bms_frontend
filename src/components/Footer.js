import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./logo.png";

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
                <h5 className="text-uppercase">Information</h5>
                <ul>
                  <li>
                    <a href="#" className="fw-bold">About BMS</a>
                  </li>
                  <li>
                    <a href="#" className="fw-bold">Contact Us</a>
                  </li>
                </ul>
              </Col>
              <Col sm={4}>
                <h5 className="text-uppercase">Quick Links</h5>
                <ul>
                  <li>
                    <a href="/" className="fw-bold">Home</a>
                  </li>
                  <li>
                    <a href="/search" className="fw-bold">Search Spot</a>
                  </li>
                  <li>
                    <a href="/login" className="fw-bold">Login</a>
                  </li>
                  <li>
                    <a href="/signup" className="fw-bold">Sign Up</a>
                  </li>
                </ul>
              </Col>
              <Col sm={4}>
                <h5 className="text-uppercase">Get in touch</h5>
                <div className="address fw-bold">
                  <p>BOOk MY SPOT(PVT) LTD</p>
                  <p>Dunn's Hat Factory</p>
                  <p>100 - 107, Kent Road,</p>
                  <p>London, NM0 2GX</p>
                  <p>UK.</p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={3}>
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex mt-3">
              <a
                href="#"
                className="social-icon-circle me-2"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social-icon-circle me-2"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="social-icon-circle me-2"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="social-icon-circle me-2"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="justify-content-between">
          <Col md={12} className="text-center">
            <p>© Copyright BMS 2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
