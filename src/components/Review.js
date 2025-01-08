import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import ReviewService from '../services/ReviewService';
import AutoAlert from './AutoAlert';

const Review = (row) => {    
    const [rating, setRating] = useState(0);  
    const [comment, setComment] = useState('');  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMEssage] = useState({ title: '', message: '', type: ''});  

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAlertClose = () => {
        setShowAlert(false); 
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);

        ReviewService.rate(row.spot_id, row.user_id, rating, comment).then(
            (response) => {
                
                setIsSubmitting(false);
                
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Success',
                    message: 'Spot reviewed successfully.',
                    type: 'success'
                });
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000); 
            },
            (error) => {
                const apiError = error.response && error.response.data.error
                    ? console.log(error.response.data.error)
                    : console.log("Network error. Please try again later.");

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
        setRating(row.rating ?? 0);
        setComment(row.comment ?? '');
    }, [row]);

    return (          
        <Form>
            <Form.Group controlId="formReview">
                <Form.Label>Rate the Spot</Form.Label>
                <Row>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Col key={star}>
                    <span
                        onClick={() => handleStarClick(star)}
                        style={{
                        cursor: 'pointer',
                        color: star <= rating ? '#f39c12' : '#ccc',
                        fontSize: '2rem',
                        }}
                    >
                        ★
                    </span>
                    </Col>
                ))}
                </Row>
            </Form.Group>

            <Form.Group controlId="formComment">
                <Form.Label>Leave a Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write your review here..."
                />
            </Form.Group>

            <Button className="btn primary-background w-100 parking-button mt-3" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                ) : (
                    <span>Submit</span>
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
    );
};

export default Review;