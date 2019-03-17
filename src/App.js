import React, { Component } from 'react';

import './App.css';

import Form from './components/Form';
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
        <Form className="form"/>
      </div>
    </section>
  )
}

export default App;
