import React, { useEffect, useState } from 'react';
import { Col } from "react-bootstrap";
import AuthService from '../services/AuthService';
import Profile from '../components/Profile';
import Bookings from '../components/Bookings';

const Dashboard = () => {
  const [userType, setUserType] = useState(false);
  const [activeTab, setActiveTab] = useState("past");
  const [activeSection, setActiveSection] = useState("bookings");

  const getUserType = () => {
    setUserType(AuthService.getUserType());    
  };

  const handleLogout = () => {
    AuthService.logout().then(
      () => {        
        localStorage.removeItem('token');
        window.location.href = '/login';
      },
      error => {            
        console.log(error.response);
      }
    ); 
  };

  useEffect(() => {
    getUserType();
  }, []); 

  return (
    <>
      <Col md={3} className="sidebar">
          <nav className="nav flex-column">
            <a href="#" className={`nav-link ${activeSection === "bookings" ? "active" : ""}`} onClick={() => setActiveSection("bookings")}>
              Bookings made
            </a>
            <a href="#" className={`nav-link ${activeSection === "messages" ? "active" : ""}`} onClick={() => setActiveSection("messages")}>
              Messages
            </a>
            <a href="#" className={`nav-link ${activeSection === "billing" ? "active" : ""}`} onClick={() => setActiveSection("billing")}>
              Billing & withdrawals
            </a>
            <a href="#" className={`nav-link ${activeSection === "profile" ? "active" : ""}`} onClick={() => setActiveSection("profile")}>
              My profile
            </a>
            <a className="nav-link" onClick={handleLogout}>
              Log out
            </a>
          </nav>
        </Col>

      <Col md={9} className="content">
        {activeSection === "bookings" && <Bookings />}
        {activeSection === "profile" && <Profile />}
      </Col>

      {/* <Col md={9} className="content">
        <h2>My Bookings</h2>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="booking-tabs">
            <Nav.Item>
              <Nav.Link eventKey="in-progress">In progress</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="past">Past</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="in-progress">
              <EmptyState />
            </Tab.Pane>
            <Tab.Pane eventKey="upcoming">
              <EmptyState />
            </Tab.Pane>
            <Tab.Pane eventKey="past">
              <EmptyState />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Col> */}
    </>
  );
};

export default Dashboard;