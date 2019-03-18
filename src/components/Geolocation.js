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
        isCelsius: true
    }


    componentDidMount() {
        this.toggleTemp()
    }

    toggleTemp = () => {


        this.setState(prevState => ({
            isCelsius: !prevState.isCelsius
        }))

        let tempApi

        if (this.state.isCelsius) {
            tempApi = "?units=si"
        } else {
            tempApi = ""
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                axios.get(`${darkskyBaseUrl}/${darkKey}/${position.coords.latitude},${position.coords.longitude}${tempApi}`)
                    .then(res => {
                        this.setState({
                            sunriseTime: res.data.daily.data[0].sunriseTime,
                            sunsetTIme: res.data.daily.data[0].sunsetTime,
                            temperature: res.data.currently.temperature,
                            windGust: res.data.currently.windGust,
                            humidity: res.data.currently.humidity,
                            timezone: res.data.timezone,
                            weeklyWeather: res.data.daily.data.slice(0, 5),
                            hourlyWeather: res.data.hourly.data.filter((_, i) => i % 3 === 0)
                        })
                        console.log(res);
                    })
            })
        }
    }

    render() {
        const { windGust, humidity, timezone, temperature, sunriseTime, sunsetTIme, weeklyWeather, hourlyWeather } = this.state;

        const weekWeather = weeklyWeather.map((week, index) =>
            <ul key={index} className="weekSum">
                <li>{new Date(week.time * 1000).toLocaleDateString('it-IT')}</li>
                <li>{week.summary}</li>
                <li>Max: {week.temperatureMax}°</li>
                <li>Min: {week.temperatureMin}°</li>
            </ul>


        )
        const hourWeather = hourlyWeather.map((hour, index) =>
               <ul key={index}  >
                    <li className="hourlyWeather">Time: {new Date(hour.time * 1000).toLocaleString('it-IT')} Temperature: {hour.temperature}°</li>
                    
                </ul>      
        )

        return (
            <section className="GeolocationHead">
                <h3>Hello, the current weather at your location.</h3>
                <div className="infoGeoLoc">
                    <button onClick={this.toggleTemp} type="button" className="btn btn-primary">°F/°C</button>
                    <h5>Location: {timezone}</h5>
                    <ul>
                        <li>Temperature: {temperature}°</li>
                        <li>Wind gust: {windGust}Km/h</li>
                        <li>Humidity: {humidity}%</li>
                        <li>Sunrise: {new Date(sunriseTime * 1000).toLocaleTimeString('it-IT')}</li>
                        <li>Sunset: {new Date(sunsetTIme * 1000).toLocaleTimeString('it-IT')}</li>
                    </ul>
                </div>

                <div>
                    <h3>Every 3rd hour</h3>
                    <ul>
                        <li className="hourlyWeather">{hourWeather}</li>
                    </ul>
                </div>

                <div>
                    <h3>Weekly Summary</h3>
                    <ul>
                        <li>{weekWeather}</li>
                    </ul>
                </div>
            </section>
        );
    }
}


export default Geolocation;