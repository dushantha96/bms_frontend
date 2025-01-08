import React, { useState } from "react";
import EmptyState from "./EmptyState"
import Star from "./Star";
import { Modal } from "react-bootstrap";
import Details from "./Details";

const ListResult = (spots) => {
  const [show, setShow] = useState(false);
  const [spot, setSpot] = useState({});

  const handleClose = () => {
    setSpot({});
    setShow(false);
  };

  const handleShow = (spot) => {
    setSpot(spot);
    setShow(true);
  };

  return (
    <>
      <div className="container parking-container">
        <div className="parking-list">
          {spots.length > 0 ? (spots.map((spot) => (
            <div key={spot.id} className="card parking-card mb-3">
              <div className="row g-0">
                <div className="col-md-3 parking-img-container">
                  <img src={spot.image} className="img-fluid rounded-start parking-img" alt={spot.name} onClick={() => handleShow(spot)}/>
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#" className="text-decoration-none parking-link" onClick={() => handleShow(spot)} >{spot.name}</a>
                    </h5>
                    <p className="card-text text-muted">
                      {Star(spot.rating)} ({(Number(spot.rating) || 0).toFixed(1)}) &nbsp;
                      <span role="img" aria-label="walk">🚶</span> <strong>{(spot.distance).toFixed(2)} km</strong> to destination
                    </p>
                    <button className="btn primary-background w-100 parking-button" onClick={() => handleShow(spot)}>Reserve</button>
                  </div>
                </div>
              </div>
            </div>
          ))) : <EmptyState />}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> {spot?.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>       
          {Details(spot)}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListResult;