import React, { Component } from 'react';

import './App.css';

import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';
import Geolocation from './components/Geolocation';
import Navbar from './components/Navbar';

function App () {
  return (
    <div>
    <Navbar />
    <Geolocation />
    </div>
  )
}

export default App;
