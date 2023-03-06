import React from 'react';
//import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Projects from './Pages/Projects';
import About from './Pages/About';
import {Routes, Route} from 'react-router-dom';
import Navbar from "./Pages/Components/Navbar"

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>}> </Route>
      <Route exact path="/about" element={<About/>} ></Route>
      <Route exact path="/projects" element={<Projects/>} > </Route>
      <Route exact path="/contact" element={<Contact/>} > </Route>
      </Routes>

    </div>
  );
}

export default App;
