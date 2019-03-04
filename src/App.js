import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';


const apiKey = 'd40af4df2e41f1f1f3a68c4092b6a163';




class App extends React.Component {
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
    
    const response = await api_call.json();

   
    
    console.log(response);

    if(city && country){
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      sunrise: response.sys.sunrise,
      sunset: response.sys.sunset,
      description: response.weather[0].description,
      error: ""
    })
  } else {
    this.setState({
      error: "Please enter the values..."
  })
}
  }
  
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    wind: undefined,
    sunrise: undefined,
    sunset: undefined,
    description: undefined,
    error: undefined
  }

  render() {
    return (
      <div>
        <Titles />
        <Form loadWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          wind={this.state.wind}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          description={this.state.description}
          error={this.state.error} />
      </div>
    );
  }
}

export default App;
