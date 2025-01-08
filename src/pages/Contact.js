import React from "react";
import { Col } from "react-bootstrap";
import home from "../assests/contactUs.png";
import AllCollapse from "../components/accordian";

const Contact = () => {
  return (
    <>
      <Col lg={12} className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-2">
          <span className="primary-color">{"{ Contact }"}</span> Us!
        </h1>
      </Col>
      <Col lg={6} className="text-center mb-5">
        <img src={home} alt="Happy driver" style={{ height: "25em" }} />
      </Col>
      <Col lg={6} className="text-center">
        <h4 className="mb-4 fw-bold primary-color">BOOk MY SPOT (PVT) LTD</h4>
        <p className="text-muted mb-4 fw-bold">
          Dunn's Hat Factory
          <br />
          106 - 110 Kentish Town Road,
          <br />
          London,
          <br />
          NW1 9PX UK.
        </p>
        <p className="d-flex align-items-center justify-content-center">
          <a
            href="tel:+1234567890"
            className="social-icon-circle me-2"
            aria-label="Telephone"
          >
            <i className="fas fa-phone"></i>
          </a>
          <a
            href="tel:+44 1234 123456"
            aria-label="Telephone"
            className="contactNo txt-muted"
          >
            <span className="fw-bold contactNumber">call us on +44 1234 123456</span>{" "}
          </a>
        </p>
      </Col>
      <Col lg={12} className="text-center mb-5">
        <AllCollapse />
      </Col>
    </>
  );
};

export default Contact;
