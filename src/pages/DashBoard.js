import React, { useEffect, useState } from 'react';
import { Col } from "react-bootstrap";
import AuthService from '../services/AuthService';
import Profile from '../components/Profile';
import Bookings from '../components/Bookings';
import Spots from '../components/Spots';

const Dashboard = () => {
  const [userType, setUserType] = useState(0);
  const [activeTab, setActiveTab] = useState("past");
  const [activeSection, setActiveSection] = useState("profile");

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
      <Col md={2} className="sidebar">
          <nav className="nav flex-column">
            {/* {userType == 1 && (   
              <a href="#" className={`nav-link ${activeSection === "users" ? "active" : ""}`} onClick={() => setActiveSection("users")}>
                Users
              </a>
            )} */}
            {(userType == 1 || userType == 2)  && (  
              <a href="#" className={`nav-link ${activeSection === "spots" ? "active" : ""}`} onClick={() => setActiveSection("spots")}>
                Spots
              </a>
            )}                       
            <a href="#" className={`nav-link ${activeSection === "bookings" ? "active" : ""}`} onClick={() => setActiveSection("bookings")}>
              Bookings
            </a>
            <a href="#" className={`nav-link ${activeSection === "profile" ? "active" : ""}`} onClick={() => setActiveSection("profile")}>
              My profile
            </a>
            <a className="nav-link" onClick={handleLogout}>
              Log out
            </a>
          </nav>
        </Col>

      <Col md={10} className="content">
        {activeSection === "bookings" && <Bookings userType={userType} />}
        {activeSection === "profile" && <Profile />}
        {activeSection === "spots" && <Spots userType={userType} />}
      </Col>
    </>
  );
};

export default Dashboard;