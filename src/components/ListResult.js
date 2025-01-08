import React, { useState, useEffect } from "react";
import SpotService from "../services/SpotService";
import EmptyState from "./EmptyState"

function ListResult() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {    
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));

    SpotService.filterList(11, 555, lat, lng).then(
      (response) => {
        setSpots(response.data);
      },
      error => {            
        error.response && error.response.data.error
          ? console.log(error.response.data.error) 
          : console.log('Network error. Please try again later.');
      }
    );
  }, []);

  return (
    <div className="container parking-container">
      <div className="parking-list">
        {spots.length > 0 ? (spots.map((spot) => (
          <div key={spot.id} className="card parking-card mb-3">
            <div className="row g-0">
              <div className="col-md-3 parking-img-container">
                <img src={spot.image} className="img-fluid rounded-start parking-img" alt={spot.name} />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title">
                    <a href="#" className="text-decoration-none parking-link">{spot.name}</a>
                  </h5>
                  <p className="card-text text-muted">
                    {/* ⭐ {spot.rating} ({spot.reviews}) &nbsp; */}
                    <span role="img" aria-label="walk">🚶</span> <strong>{(spot.distance).toFixed(2)}</strong> to destination
                  </p>
                  <button className="btn primary-background w-100 parking-button">Reserve for {spot.rate} $</button>
                </div>
              </div>
            </div>
          </div>
        ))) : <EmptyState />}
      </div>
    </div>
  );
}

export default ListResult;