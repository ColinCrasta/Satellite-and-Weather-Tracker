import React from 'react';
import {Link} from 'react-router-dom';
import Login from "../Login";

function Navigationbar(props){



    const handleLogout = (e) => {
        e.preventDefault();
        props.setLoggedIn(false);
    
      };


    return (
        <>
        <ul>
            {/* <li><Link to="/">Login</Link></li> */}
            <li><Link to="/positioning">Positioning</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/userpolicy">UserPolicy</Link></li>
        </ul>
        <button onClick={handleLogout}>
        Logout {props.name}
      </button>
      </>
    )
}

export default Navigationbar;