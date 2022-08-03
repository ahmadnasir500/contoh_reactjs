import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth, logoutFromApp } from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const logoutHandler = () => {
    logoutFromApp();
    navigate("/login");
  };
  const initialEmail = user ? user.email.charAt(0) : "A";
  return (
    <Navbar className="fixed-top" expand="lg" id="nav-header">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
          </svg>{" "}
          Moon Stars
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white"/>
        <div className="order-lg-2 d-flex justify-content-between">
          {user ? (
            <DropdownButton
              title={user.email.charAt(0).toUpperCase()}
              id="input-group-dropdown"
              className="dropstart"
            >
              <Dropdown.Item href="#" className="text-white">
                My Profil
              </Dropdown.Item>
              <Dropdown.Item href="#" className="text-white">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler} className="text-white">
                Log out
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Nav.Link as={Link} to="/login">
              Log in
            </Nav.Link>
          )}
        </div>
        {user? (
          <div className="order-lg-1 justify-content-md-center">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/about"
                  className="text-decoration-none text-white"
                >
                  About
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="text-decoration-none text-white"
                >
                  Holy Quran
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/blog"
                  className="text-decoration-none text-white"
                >
                  Blog
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
