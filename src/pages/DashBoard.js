import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Profile from "../components/Profile";
import Bookings from "../components/Bookings";
import Spots from "../components/Spots";

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
        localStorage.removeItem("token");
        window.location.href = "/login";
      },
      (error) => {
        console.log(error.response);
      }
    );
  };

  useEffect(() => {
    getUserType();
  }, []);

  return (
    <>
      <Col md={2} className="sidebar search-container">
        <nav className="nav flex-column dashboardColor">
          {/* {userType == 1 && (   
              <a href="#" className={`nav-link ${activeSection === "users" ? "active" : ""}`} onClick={() => setActiveSection("users")}>
                Users
              </a>
            )} */}
          {(userType == 1 || userType == 2) && (
            <a
              href="#"
              className={`nav-link text-muted ${
                activeSection === "spots" ? "active" : ""
              }`}
              onClick={() => setActiveSection("spots")}
            >
              Spots
            </a>
          )}
          <a
            href="#"
            className={`nav-link text-muted ${
              activeSection === "bookings" ? "active" : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            Bookings
          </a>
          <a
            href="#"
            className={`nav-link text-muted ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            My profile
          </a>
          <a className="nav-link text-muted" onClick={handleLogout} style={{ cursor: "pointer" }}>
            Log out
          </a>
        </nav>
      </Col>

      <Col md={10} className="content pt-0">
        <div className="search-container">
          {activeSection === "bookings" && <Bookings userType={userType} />}
          {activeSection === "profile" && <Profile />}
          {activeSection === "spots" && <Spots userType={userType} />}
        </div>
      </Col>
    </>
  );
};

export default Dashboard;
