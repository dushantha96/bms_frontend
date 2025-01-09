import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import AuthService from '../services/AuthService'; 
import AutoAlert from './AutoAlert';

const Profile = () => {
    const [formData, setFormData] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMEssage] = useState({ title: '', message: '', type: ''});
    const [isLoading, setPageLoad] = useState(true);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleAlertClose = () => {
      setShowAlert(false); 
    };

    const validateForm = () => {
      const errors = {};

      if (!formData.firstName) {
        errors.firstName = 'First Name is required';
      } 

      if (!formData.lastName) {
        errors.lastName = 'Last Name is required';
      } 
  
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
  
      return errors;
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      
      const validationErrors = validateForm();
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
      
      setIsSubmitting(true);

      AuthService.updateProfile(formData.id, formData.firstName, formData.lastName, formData.email, formData.currentPassword, formData.password, formData.confirmPassword).then(
        () => {
          setShowAlert(true);
          setAlertMEssage({
              title: 'Success',
              message: 'Profile Updated Successfully.',
              type: 'success'
          });
          
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

    useEffect(() => {  
      AuthService.getProfile(AuthService.getUserId()).then(
        (response) => {
          setFormData(prevData => ({
            ...prevData, 
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
          }));
        },
        (error) => {
          const apiError = error.response && error.response.data.error
            ? error.response.data.error 
            : 'Network error. Please try again later.';
          setShowAlert(true);
          setAlertMEssage({
            title: 'Error',
            message: apiError,
            type: 'error'
          });
        }
      );
    }, []);

    return (
      <Form>             
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label className='text-muted'>First Name</Form.Label>
                <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label className='text-muted'>Last Name</Form.Label>
                <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className='text-muted'>Email Address</Form.Label>
              <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
              {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label className='text-muted'>Current Password</Form.Label>
                <Form.Control
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                isInvalid={!!errors.currentPassword}
                />
                <Form.Control.Feedback type="invalid">
                {errors.currentPassword}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className='text-muted'>New Password</Form.Label>
                <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label className='text-muted'>Confirm Password</Form.Label>
              <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>   
        <Row>
          <Col md={12} className=''>           
            <Button type="submit" className="primary-background" disabled={isSubmitting}>
              {isSubmitting ? <><Spinner animation="border" size="sm" /> Updating..</>  : 'Update'}
            </Button>
          </Col>
        </Row>
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

export default Profile;