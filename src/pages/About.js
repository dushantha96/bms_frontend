import React from "react";
import { Col } from "react-bootstrap";
import home from "../assests/aboutUs.png";
import icon1 from "../assests/icon1.png";
import icon2 from "../assests/icon2.png";
import icon4 from "../assests/icon4.png";

const About = () => {
  return (
    <>
      <Col lg={12} className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Want to <span className="primary-color">{"{ let know }"}</span> about
          us!
        </h1>
      </Col>
      <Col lg={6} className="text-center">
        <img
          src={home}
          alt="Happy driver"
          className=" rounded"
          style={{ height: "35em" }}
        />
      </Col>
      <Col lg={6} className="text-center ps-5 mb-5">
        <h5 className="mb-4 secondary-color fw-bold">
          About <span className="primary-color">Us</span>
        </h5>
        <p className="text-muted text-start mb-4">
          Thousands of reservable spaces located right where you need them. Join
          over 13 million drivers and enjoy stress-free, cheaper parking.
        </p>
        <h5 className="mb-4 secondary-color fw-bold">
          <span className="primary-color">Who</span> We Are
        </h5>
        <p className="text-muted text-start mb-4">
          We are a team of passionate innovators who believe in simplifying
          life's daily hassles. Our mission is to bridge the gap between service
          providers and customers by creating a reliable, efficient, and
          user-friendly platform. At Book My Spot, convenience and customer
          satisfaction are at the heart of everything we do.
        </p>
        <h5 className="mb-4 secondary-color fw-bold">
          Our <span className="primary-color">Mission</span>
        </h5>
        <p className="text-muted text-start mb-4">
          To redefine the way people book spaces by offering a hassle-free,
          transparent, and secure solution. We aim to save you time, eliminate
          uncertainties, and ensure that finding the perfect spot is no longer a
          challenge.
        </p>
      </Col>
      <div className="row mt-5">
        <Col lg={4} className="text-center">
          <img
            src={icon1}
            alt="Happy driver"
            className="ms-4"
            style={{ height: "9em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">
            {"{Seamless}"}
            <span className="primary-color"> parking</span>
          </h4>
          <br />
          <p className="text-muted text-center mb-4">
            Reduces time spent circling around looking for a spot
          </p>
        </Col>
        <Col lg={4} className="text-center">
          <img
            src={icon2}
            alt="Happy driver"
            className="ms-4"
            style={{ height: "9em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">
            <span className="primary-color">{"{Anytime}"}, </span>anywhere
          </h4>
          <br />
          <p className="text-muted text-center mb-4">
            Real-time availability of parking spots, ensuring drivers can book a
            spot that is genuinely available
          </p>
        </Col>
        <Col lg={4} className="text-center">
          <img
            src={icon4}
            alt="Happy driver"
            className="ms-4"
            style={{ height: "9em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">
            <span className="primary-color">{"{Unlimited}"} </span>locations
          </h4>
          <br />
          <p className="text-muted text-center mb-4">
            Offering Unlimited Locations for a parking service
          </p>
        </Col>
      </div>
    </>
  );
};

export default About;
