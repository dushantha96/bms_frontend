import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../Constants";
import { Modal } from 'react-bootstrap'; // Correct import from react-bootstrap
import Details from "./Details";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const defaultCenter = { lat: 51.1537, lng: -0.1821 };

const MapResult = (locations) => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));

    if (lat && lng) {
      setCurrentLocation({ lat, lng });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => console.warn("Geolocation not available")
    );    
  }, []);

  return (
    <>
      <LoadScriptNext googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={12}>
          <Marker position={currentLocation} />

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={{ lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }}
              label={loc.rate}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                scaledSize: new window.google.maps.Size(70, 70),
              }}
              onClick={() => {
                handleShow(loc);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScriptNext>
      
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

export default MapResult;