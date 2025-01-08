import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_API_KEY, GOOGLE_LIBRARIES } from "../Constants";
import AutoAlert from "./AutoAlert";
import SpotService from "../services/SpotService";
import AuthService from "../services/AuthService";

const Spot = (spot) => {
    const [formData, setFormData] = useState({
        id: 0,
        user_id: 0,
        name: "",
        description: "",
        rate: "",
        lat: "",
        lng: "",
    });

    const [autocomplete, setAutocomplete] = useState(null);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMEssage] = useState({ title: '', message: '', type: ''});  
    const [address, setAddress] = useState("");  

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                setFormData((prevData) => ({
                    ...prevData,
                    name: place.name,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }));
            } 
        } 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const isValidImage = file.type.startsWith('image/');
          if (!isValidImage) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              image: 'Please select a valid image file',
            }));
            return;
          }
          
          setFormData((prevData) => ({
            ...prevData,
            image: file,
          }));
    
          const imageUrl = URL.createObjectURL(file); 
          setImagePreview(imageUrl); 
          setErrors((prevErrors) => ({ ...prevErrors, image: '' })); 
        }
    }

    const handleAlertClose = () => {
        setShowAlert(false); 
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        
        SpotService.save(formData.id, AuthService.getUserId(), formData.name, formData.lat, formData.lng, formData.rate, formData.description).then(
            () => {
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Success',
                    message: 'Spot saved successfully.',
                    type: 'success'
                });
                
                setIsSubmitting(false);
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000); 
            },
            error => {            
                const apiError = error.response && error.response.data.error
                ? error.response.data.error
                : 'Network error. Please try again later.';
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Error',
                    message: apiError,
                    type: 'error'
                });
                setIsSubmitting(false);
            }
        );
    };

    useEffect(() => {
        setAddress(spot.name);
        setFormData(spot);
    }, [spot]);

    return (        
        <LoadScriptNext googleMapsApiKey={GOOGLE_API_KEY} libraries={GOOGLE_LIBRARIES}>
            <Form>
                <Row>
                    <Col md={12}>
                        <Form.Group className="form-label search-input">
                            <Form.Label>Location</Form.Label>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter an address or postcode"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Autocomplete>
                        </Form.Group>                        
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="formRate" className="mb-3">
                            <Form.Label>Rate £(Hourly)</Form.Label>
                            <Form.Control
                                type="text"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                isInvalid={!!errors.rate}
                            />
                            <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea" 
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                                rows={6}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formImage" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                isInvalid={!!errors.image}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%' }} />
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>                
                <Button className="btn primary-background w-100 parking-button" onClick={handleBooking} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <span>Save {spot.final_rate}</span>
                    )}
                </Button>
                {showAlert && (
                    <AutoAlert
                        title={alertMessage.title}
                        message={alertMessage.message}
                        type={alertMessage.type}
                        onClose={handleAlertClose} 
                    />
                )}
            </Form>
        </LoadScriptNext>
    );
};

export default Spot;