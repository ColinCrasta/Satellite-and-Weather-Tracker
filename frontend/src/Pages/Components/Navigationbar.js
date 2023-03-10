import React from 'react';
import {Link} from 'react-router-dom';

function Navigationbar(){
    return (
        <>
        <ul>
            {/* <li><Link to="/">Login</Link></li> */}
            <li><Link to="/positioning">Positioning</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/userpolicy">UserPolicy</Link></li>
        </ul>
        <button >
        Logout {}
      </button>
      </>
    )
}

export default Navigationbar;