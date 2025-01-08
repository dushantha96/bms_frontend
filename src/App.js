import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './pages/SignUp';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Header /> 
      <div className="hero-section bg-light py-5">
        <Container>
          <Row className="align-items-center">   
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search" element={<Search />} />

              <Route 
                path="/dashboard" 
                element={<PrivateRoute element={<Dashboard />} />} 
              />
            </Routes>             
          </Row>
        </Container>
      </div>
      <Footer />
    </Router>
  );
}

export default App;