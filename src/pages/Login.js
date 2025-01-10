import React, { useState } from "react";
import { Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
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

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    AuthService.login(formData.email, formData.password).then(
      () => {
        navigate("/dashboard");
        window.location.reload();

        setIsSubmitting(false);
      },
      (error) => {
        error.response && error.response.data.error
          ? setApiError(error.response.data.error)
          : setApiError("Network error. Please try again later.");
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
            <h2 className="text-center mb-4 fw-bold">Log In</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the email"
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {apiError && (
                <Alert variant="danger" className="mt-3">
                  {apiError}
                </Alert>
              )}

              <Button
                variant="success"
                type="submit"
                className="w-100 btn-lg primary-background"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Log In"
                )}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <small>
              Already have an account? <a href="/signup">Sign Up</a>
            </small>
          </Card.Footer>
        </Card>
      </Col>
      <Col md={3}></Col>
    </>
  );
};

export default Login;
