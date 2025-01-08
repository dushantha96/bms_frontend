import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Filter from "../components/Filter";
import home from "./homeee.gif";
import ReviewService from "../services/ReviewService";
import Star from "../components/Star";

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
        <img src={home} alt="Happy driver" className="img-fluid rounded" />
      </Col>
      <Col lg={12}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div>
              {Star(review.rating)}
              <p>{review.comment}</p>
              <p>{review.user}</p>
              <p>{review.location}</p>
            </div>
          ))}
      </Col>
    </>
  );
};

export default Home;
