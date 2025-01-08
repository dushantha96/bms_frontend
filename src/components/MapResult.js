import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../Constants";
import SpotService from "../services/SpotService";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const defaultCenter = { lat: 51.1537, lng: -0.1821 }; 

function MapResult() {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [locations, setLocations] = useState([]);

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

    SpotService.filterMap(11, 555, lat, lng).then(
      (response) => {
        setLocations(response.data);
      },
      error => {            
        error.response && error.response.data.error
          ? console.log(error.response.data.error) 
          : console.log('Network error. Please try again later.');
      }
    );
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={14}>
        
        <Marker 
          position={currentLocation} 
        />
        
        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={{ lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }} 
            label={loc.rate} 
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(70, 70), 
            }}
          />
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default MapResult;