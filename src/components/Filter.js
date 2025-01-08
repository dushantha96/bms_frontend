import React, { useState, useEffect } from "react";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import Form from "react-bootstrap/Form";
import { GOOGLE_API_KEY } from "../Constants";
import { GOOGLE_LIBRARIES } from "../Constants";

function Filter() {
  const [searchType, setType] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loc, setCoordinates] = useState({ lat: null, lng: null });

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setAddress(place.formatted_address);
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const handleClick = () => {
    if(!searchType || !from || !to || !loc.lat || !loc.lng || !address) return;
    const url = `search?type=${encodeURIComponent(searchType)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&lat=${encodeURIComponent(loc.lat)}&lng=${encodeURIComponent(loc.lng)}&address=${encodeURIComponent(address)}`;
    window.location = url;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const from = params.get("from");
    const to = params.get("to");
    const address = params.get("address");
    const lat = params.get("lat");
    const lng = params.get("lng");
    
    if(type){
      setType(type)
    }else{
      setType('hourly');
    }
      

    if(from) setFrom(from);

    if(to) setTo(to);
    
    if (address && lat && lng) {
      setAddress(address);
      setCoordinates({ lat: lat, lng: lng });
    }

  }, []);

  return (
    <>
      <LoadScriptNext googleMapsApiKey={GOOGLE_API_KEY} libraries={GOOGLE_LIBRARIES}>
        <Form.Group className="mb-3">        
          <div className="search-container">
            <div className="search-tabs">
              <button 
                className={searchType === "hourly" ? "active" : ""}
                onClick={() => setType("hourly")}
              >
                Hourly
              </button>
              <button 
                className={searchType === "daily" ? "active" : ""}
                onClick={() => setType("daily")}
              >
                Daily
              </button>
            </div>

            <Form.Group className="form-label search-input">
              <Form.Label>Park at</Form.Label>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Form.Control
                  type="text"
                  placeholder="Enter an address or postcode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Autocomplete>
            </Form.Group>
            
            <div className="date-time-container">
              <div className="w-50">
                <Form.Group className="form-label">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type={searchType === "hourly" ? "datetime-local" : "date"}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="w-50">
                <Form.Group className="form-label">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type={searchType === "hourly" ? "datetime-local" : "date"}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>       

            <button type="submit" className="search-button" onClick={handleClick}>Show parking spaces</button>
          </div>
        </Form.Group>
      </LoadScriptNext>
    </>
  );
}

export default Filter;