import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";
import { Navbar, Nav } from "react-bootstrap";

export default function HeaderAdmin() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuthentication();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to logout!");
    }
  }

  async function handleAdmin() {
    navigate("/adminPage");
  }

  async function handleAbout() {
    navigate("/");
  }

  async function updateProfile() {
    navigate("/update-profile");
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        width="100%"
        sticky="top"
        style={{
          paddingLeft: "4rem",
          boxShadow: "0px 0px 10px rgb(0,0,0, 0.5)",
        }}
      >
        <Navbar.Brand className="d-flex" onClick={handleAbout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-mortarboard"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
          </svg>
          <span className="ml-3">Univercity4U</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav.Link className="link-light" onClick={handleAdmin}>
            Gestionare platformă
          </Nav.Link>
          <Nav.Link className="link-light" onClick={handleAbout}>
            Vezi ca și utilizator
          </Nav.Link>
          <Nav.Link className="link-light" onClick={updateProfile}>
            {currentUser.email}
          </Nav.Link>
          <img
            id="img"
            src={currentUser.photoURL || "blank-profile-picture.png"}
            alt="Avatar"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              borderWidth: "2px",
              borderColor: "#0275d8",
              borderStyle: "outset",
              marginLeft: "15px",
            }}
            onClick={updateProfile}
          />
          <Nav.Link className="link-light" onClick={handleLogout}>
            Ieși din cont
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
