import React, { useState, useEffect } from "react";
import { Col } from 'react-bootstrap';
import Filter from '../components/Filter';
import MapResult from '../components/MapResult';
import ListResult from '../components/ListResult';
import SpotService from "../services/SpotService";

const Search = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));

    if (!lat || !lng || !from || !to) return;

    SpotService.filterList(from, to, lat, lng).then(
      (response) => {
        setLocations(response.data);
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
      <Col lg={5} className="text-center text-lg-start">
        <Filter />
        { ListResult(locations) }
      </Col>      
      <Col lg={7} className="text-center">
        { MapResult(locations) }
      </Col>
    </>
  );
};

export default Search;