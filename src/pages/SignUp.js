import React, { useState } from 'react';
import { Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../services/AuthService'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'driver'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
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
  
      if (!formData.password) {
        errors.password = 'Password is required';
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
      setApiError('');

      AuthService.signup(formData.firstName, formData.lastName, formData.email, formData.password, formData.confirmPassword, formData.role).then(
        () => {
          navigate('/login');
          window.location.reload();
          
          setIsSubmitting(false);
        },
        error => {            
          error.response && error.response.data.error
            ? setApiError(error.response.data.error) 
            : setApiError('Network error. Please try again later.');
          setIsSubmitting(false);
        }
      );
    };

    return (
      <>
        <Col md={3}></Col>
        <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                  <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
                  <Form onSubmit={handleSignUp}>
                    
                    <Form.Group controlId="formFirstName" className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formLastName" className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
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
                    
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Confirm</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter the password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter the password again"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formRole" className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <div className="d-flex align-items-center">
                          <Form.Check 
                              type="radio" 
                              label="Driver" 
                              name="role" 
                              value="driver" 
                              checked={formData.role === 'driver'} 
                              onChange={handleChange} 
                              className="me-3"
                          />
                          <Form.Check 
                              type="radio" 
                              label="Parking Owner" 
                              name="role" 
                              value="parkingOwner" 
                              checked={formData.role === 'parkingOwner'} 
                              onChange={handleChange} 
                          />
                      </div>
                    </Form.Group>
                    
                    {apiError && <Alert variant="danger" className="mt-3">{apiError}</Alert>}

                    <Button type="submit" className="w-100 btn-lg primary-background" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                    </Button>
                  </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                  <small>Don't have an account? <a href="/login">Log In</a></small>
              </Card.Footer>
            </Card>
        </Col>        
        <Col md={3}></Col>
      </>
    );
};

export default SignUp;