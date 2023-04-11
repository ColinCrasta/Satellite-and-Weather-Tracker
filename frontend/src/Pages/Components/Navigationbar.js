import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Login from "../Login";

function Navigationbar(props) {
  const handleLogout = (e) => {
    e.preventDefault();
    props.setLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Login
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/positioning" className="nav-link">
                  Positioning
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/weather" className="nav-link">
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/lb" className="nav-link">
                  Load Balancing
                </Link>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              className="btn btn-outline-secondary me-2"
            >
              Logout {props.name}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigationbar;
