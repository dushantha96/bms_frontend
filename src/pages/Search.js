import React from 'react';
import { Col } from 'react-bootstrap';
import Filter from '../components/Filter';
import MapResult from '../components/MapResult';
import ListResult from '../components/ListResult';

const Search = () => {
  return (
    <>
      <Col lg={5} className="text-center text-lg-start">
        <Filter />
        <ListResult />
      </Col>      
      <Col lg={7} className="text-center">
        <MapResult />
      </Col>
    </>
  );
};

export default Search;