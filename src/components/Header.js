import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(false);

  const getUserName = () => {
    setUserName(AuthService.getUserName());
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
    getUserName();
  }, []);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="JustPark Logo" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={NavLink}
              to="/search"
              className={({ isActive }) =>
                isActive ? "me-3 text-primary" : "me-3"
              }
            >
              Search Spot
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className={({ isActive }) =>
                isActive ? "me-3 text-primary" : "me-3"
              }
            >
              About BMS
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? "me-3 text-primary" : "me-3"
              }
            >
              Contact Us
            </Nav.Link>

            {token ? (
              <>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    id="user-dropdown"
                    className="d-flex align-items-center primary-background-color border-0"
                  >
                    <span>Welcome, {userName}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/dashboard">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link href="/login">
                Log in
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link href="/signup">
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
