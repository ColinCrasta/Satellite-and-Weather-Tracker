import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Login from "../Login";

function Navigationbar() {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  const getAdmin = () => {
    console.log(typeof localStorage.getItem("admin"));
    return localStorage.getItem("admin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" onClick={handleLogout}>
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
              {getAdmin() === "true" ? (
                <li className="nav-item">
                  <Link to="/userpolicy" className="nav-link">
                    User Policy
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <button
              onClick={handleLogout}
              className="btn btn-outline-secondary me-2"
            >
              Logout {localStorage.getItem("name")}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigationbar;
