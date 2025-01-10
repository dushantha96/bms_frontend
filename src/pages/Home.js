import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Filter from "../components/Filter";
import home from "./homeee.gif";
import ReviewService from "../services/ReviewService";
import Star from "../components/Star";
import icon1 from "../assests/icon1.png";
import icon2 from "../assests/icon2.png";
import icon4 from "../assests/icon4.png";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    ReviewService.top().then(
      (response) => {
        setReviews(response.data);
      },
      (error) => {
        error.response && error.response.data.error
          ? console.log(error.response.data.error)
          : console.log("Network error. Please try again later.");
      }
    );
  }, []);
  return (
    <>
      <Col lg={6} className="text-center text-lg-start">
        <h1 className="display-4 fw-bold mb-4 secondary-color">
          Your <span className="primary-color">{"{ parking dream }"},</span>{" "}
          easy as it seems
        </h1>
        <ul className=" hero-benefits list-unstyled text-muted my-3 mb-4">
          <li className="hero-benefit">✅ Best price guarantee</li>
          <li className="hero-benefit">✅ Trusted by 13m+ drivers</li>
          <li className="hero-benefit">✅ 100k+ reservable spaces</li>
        </ul>
        <p className="text-muted mb-4">
          Thousands of reservable spaces located right where you need them. Join
          over 13 million drivers and enjoy stress-free, cheaper parking.
        </p>
        <Filter />
      </Col>
      <Col lg={6} className="text-center">
        <img src={home} alt="Happy driver" className="img-fluid rounded ms-4 mt-5" />
      </Col>

      <div className="row customMt customMb">
        <Col lg={4} className="text-center">
          <img
            src={icon1}
            alt="Happy driver"
            className="ms-4"
            style={{ height: "10em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">Seamless parking</h4>
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
            style={{ height: "10em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">Anytime, anywhere</h4>
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
            style={{ height: "10em", objectFit: "cover" }}
          />
          <br />
          <h4 className="mt-4 secondary-color fw-bold">Unlimited locations</h4>
          <br />
          <p className="text-muted text-center mb-4">
            Offering Unlimited Locations for a parking service
          </p>
        </Col>
      </div>
      <Col lg={12} className="text-center">
        <h1 className="display-4 fw-bold mb-4 secondary-color">
          What <span className="primary-color">{"{ clients say }"}</span>
        </h1>
      </Col>
      <Col lg={12} className="mt-5 customMb">
        <div className="d-flex justify-content-between">
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center me-4"
              >
                <div className="d-flex align-items-center mb-2">
                  {Star(review.rating)}
                </div>
                <p className="mb-0 text-muted">{review.comment}</p>
                <p className="mb-0 text-muted">{review.user}</p>
                <p className="mb-0 text-muted">{review.location}</p>
              </div>
            ))}
        </div>
      </Col>
    </>
  );
};

export default Home;
