import React, {useState} from "react";
import { Card, Spinner, Button, Alert } from "react-bootstrap";
import Star from "./Star";
import BookingService from "../services/BookingService";
import AuthService from '../services/AuthService'; 
import { useNavigate } from "react-router-dom";
import AutoAlert from "./AutoAlert";

const Details = (spot) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMEssage] = useState({ title: '', message: '', type: ''});
    const navigate = useNavigate();

    const handleAlertClose = () => {
        setShowAlert(false); 
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        if(!AuthService.isLoggedIn()){
            setShowAlert(true);
            setAlertMEssage({
                title: 'Login Required',
                message: 'You must be logged in to make a booking. Please log in to continue.',
                type: 'warning'
            });
            setTimeout(() => {
                navigate('/login');
            }, 1000); 
            return;
        }

        setIsSubmitting(true);
        
        BookingService.book(spot.id, AuthService.getUserId(), spot.from_time, spot.to_time, spot.total_hours, spot.rate, spot.final_rate).then(
            () => {
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Success',
                    message: 'Your booking placed',
                    type: 'success'
                });
                
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000); 
                
                setIsSubmitting(false);
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
    return (
        <Card className="shadow-sm border-0 rounded">
            <div className="position-relative">
                <img
                    src={spot.img} 
                    alt="Spot Image"
                    className="w-100"
                />
            </div>
            <Card.Body>
                <Card.Title>{spot.name}</Card.Title>
                <div className="d-flex align-items-center mb-3">
                    {Star(spot.rating ?? 0)} ({(Number(spot.rating) || 0).toFixed(1)}) &nbsp;  {spot.reviews} + reviews <span role="img" aria-label="walk">🚶</span> <strong>{(Number(spot.distance) || 0).toFixed(2)} km </strong> to destination              
                </div>
                <div className="d-flex align-items-center">
                    <p>{spot.description}</p>         
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <span>Parking fee</span>
                    <strong>{spot.rate}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <span>Total Hours</span>
                    <strong>{spot.total_hours}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold">Final price</span>
                    <strong className="fw-bold">{spot.final_rate}</strong>
                </div>
                
                <Button className="btn primary-background w-100 parking-button" onClick={handleBooking} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <span>Reserve for {spot.final_rate}</span>
                    )}
                </Button>
            </Card.Body>
            {showAlert && (
                <AutoAlert
                    title={alertMessage.title}
                    message={alertMessage.message}
                    type={alertMessage.type}
                    onClose={handleAlertClose} 
                />
            )}
        </Card>
    );
};

export default Details;