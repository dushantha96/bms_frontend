import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  
  // If token doesn't exist, redirect to login page
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;