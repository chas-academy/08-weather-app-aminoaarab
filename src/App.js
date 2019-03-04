import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';


const apiKey = 'd40af4df2e41f1f1f3a68c4092b6a163';




class App extends React.Component {
  getWeather = async (e) => {
    e.preventDefault();

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${apiKey}`);
    
    const response = await api_call.json();

    
    console.log(response);
  
  }
  

  render() {
    return (
      <div>
        <Titles />
        <Form loadWeather={this.getWeather} />
        <Weather />
      </div>
    );
  }
}

export default App;
