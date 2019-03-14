import React, { Component } from 'react';

import './App.css';

import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';
import Geolocation from './components/Geolocation';
import Navbar from './components/Navbar';

function App() {
  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div className="GeolocationHeadAndFrom">
        <Geolocation />
        <Form />
      </div>
    </section>
  )
}

export default App;
