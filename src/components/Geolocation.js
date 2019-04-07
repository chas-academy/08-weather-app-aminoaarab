import React, { Component } from 'react';
import axios from 'axios';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const darkKey = '0d7a00fe566543ff233dab5e197a49ce';
const darkskyBaseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';

class Geolocation extends Component {

    state = {
        windGust: [],
        humidity: [],
        timezone: [],
        temperature: [],
        sunrise: [],
        sunset: [],
        weeklyWeather: [],
        hourlyWeather: [],
        status: [],
        isCelsius: false,

    }


    componentDidMount() {
        this.toggleTemp()
     }

    toggleTemp = () => {

        this.setState({
            isCelsius: !this.state.isCelsius
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                axios.get(`${darkskyBaseUrl}/${darkKey}/${position.coords.latitude},${position.coords.longitude}?units=si`)
                    .then(res => {
                        this.setState({
                            sunriseTime: res.data.daily.data[0].sunriseTime,
                            sunsetTime: res.data.daily.data[0].sunsetTime,
                            temperature: res.data.currently.temperature,
                            windGust: res.data.currently.windGust,
                            humidity: res.data.currently.humidity,
                            timezone: res.data.timezone,
                            weeklyWeather: res.data.daily.data.slice(0, 5),
                            hourlyWeather: res.data.hourly.data.filter((_, i) => i % 3 === 0).slice(0, 6),
                            status: res.status
                        })
                    })
                    .catch(error => console.log('Error', error));
            })
        }
        
    }

    render() {
        const { windGust, humidity, timezone, temperature, sunriseTime, sunsetTime, weeklyWeather, hourlyWeather, status } = this.state;

        if(status !='200'){
            return (
                <h2>Sometimes it takes 5 second for page to load. Otherwise something is wrong and location can't be found.</h2>
                
            )
        }
         
        const weekWeather = weeklyWeather.map((week, index) =>
            <ul key={index} className="weekSum">
                <li>{new Date(week.time * 1000).toLocaleDateString('it-IT')}</li>
                <li>{week.summary}</li>
                <li>Max: {this.state.isCelsius ? ((week.temperatureMax - 32) * 5 / 9).toFixed(0) + ' °F' : week.temperatureMax + ' °C'}</li>
                <li>Min: {this.state.isCelsius ? ((week.temperatureMin - 32) * 5 / 9).toFixed(0) + ' °F' : week.temperatureMin + ' °C'}</li>
            </ul>
        )
        const hourWeather = hourlyWeather.map((hour, index) =>
            <ul key={index} className="hourlyWeather" >
                <li>Date: {new Date(hour.time * 1000).toLocaleString('it-IT')}</li>
                <li>Temperature: {this.state.isCelsius ? ((hour.temperature - 32) * 5 / 9).toFixed(0) + ' °F' : hour.temperature + ' °C'}</li>
            </ul>
        )

        
        return (
            <section className="GeolocationHead">
                <h3>Hello, the current weather at your location.</h3>
                <div className="infoGeoLoc">
                    <button onClick={this.toggleTemp} type="button" className="btn btn-primary">{this.state.isCelsius ? 'Celsius °' : 'Fahrenheit °'}</button>
                    <h5>Location: {timezone}</h5>
                    <ul>
                        <li>Temperature: {this.state.isCelsius ? ((temperature - 32) * 5 / 9).toFixed(0) + ' °F' : temperature + ' C°'}</li>
                        <li>Wind gust: {windGust}Km/h</li>
                        <li>Humidity: {humidity}%</li>
                        <li>Sunrise: {new Date(sunriseTime * 1000).toLocaleTimeString('it-IT')}</li>
                        <li>Sunset: {new Date(sunsetTime * 1000).toLocaleTimeString('it-IT')}</li>
                    </ul>
                </div>

                <div>
                    <h3>Every 3rd hour</h3>
                    <ul>
                        <li className="hourCards">{hourWeather}</li>
                    </ul>
                </div>

                <div>
                    <h3>Weekly Summary</h3>
                    <ul>
                        <li className="weekCards" >{weekWeather}</li>
                    </ul>
                </div>
            </section>
        );
    }
}


export default Geolocation;