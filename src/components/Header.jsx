
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import "./headerfooter.scss";

const Header = () => {
  const navigate = useNavigate();
  const token = useToken();

  return (
    <>
      <div className="main_header">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Link to="/">LOGO </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Item>
                  <NavLink to="/home">Home</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/shop">Shop</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={token ? "/shirt-customization" : "/login"}>
                    Customize Your Design
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/about-us">About Us</NavLink>
                </Nav.Item>
              </Nav>

              <Nav className="align-items-center gap-3">
                <Link
                  to="/signup"
                  onClick={() => navigate("/signup")}
                  className="btn-theme "
                >
                  Register
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
