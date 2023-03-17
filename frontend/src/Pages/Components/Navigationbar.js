import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import Login from "../Login";

function Navigationbar(props){
  const name = useRef(props.name);


    const handleLogout = (e) => {
        e.preventDefault();
        props.setLoggedIn(false);
    
      };


    return (
        <>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <Link to="/" class="navbar-brand">Login</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/positioning" class="nav-link">Positioning</Link>
        </li>
        <li class="nav-item">
          <Link to="/weather" class="nav-link">Weather</Link>
        </li>
        <li class="nav-item">
          <Link to="/analytics" class="nav-link">Analytics</Link>
        </li>
      </ul>
      <button onClick={handleLogout} class="btn btn-outline-secondary me-2">
        Logout {props.name}
      </button>
    </div>
  </div>
</nav>

      </>
    )
}

export default Navigationbar;