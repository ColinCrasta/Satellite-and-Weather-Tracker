// Require and import statements
import React from 'react';
//import './App.css';
import Weather from './Pages/Weather';
import Positioning from './Pages/Positioning';
import Analytics from './Pages/Analytics';
import Login from './Pages/Login';
import UserPolicy from './Pages/UserPolicy';
import LB from './Pages/LB';
import {Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div id='appdiv'>
      
      <Routes>
      <Route exact path="/" element={<Login/>} ></Route>
      <Route exact path="/weather" element={<Weather/>}> </Route>
      <Route exact path="/analytics" element={<Analytics/>} > </Route>
      <Route exact path="/positioning" element={<Positioning/>} > </Route>
      <Route exact path="/userpolicy" element={<UserPolicy/>} > </Route>
      <Route exact path="/lb" element={<LB/>} > </Route>
      </Routes>

    </div>
  );
}

export default App;
