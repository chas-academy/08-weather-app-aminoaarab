import React, { Component } from 'react';
import axios from 'axios';

import '../App.css';


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
        hourlyWeather: []
    }

    componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                axios.get(`${darkskyBaseUrl}/${darkKey}/${position.coords.latitude},${position.coords.longitude}`)
                    .then(res => {
                        this.setState({
                            sunriseTime: res.data.daily.data[0].sunriseTime,
                            sunsetTIme: res.data.daily.data[0].sunsetTime,
                            temperature: res.data.currently.temperature,
                            windGust: res.data.currently.windGust,
                            humidity: res.data.currently.humidity,
                            timezone: res.data.timezone,
                            weeklyWeather: res.data.daily.data,
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
            <ul key={index}>
                <li>{new Date(week.time * 1000).toLocaleDateString('it-IT')}</li>
                <li>{week.summary}</li>
            </ul>


        )
        const hourWeather = hourlyWeather.map((hour, index) =>
            <ul key={index}>
                <li className="hourlyWeather">{new Date(hour.time * 1000).toLocaleTimeString('it-IT')}</li>
                <li className="hourlyWeather">{hour.temperature}</li>
            </ul>
        )
        return (
            <section className="GeolocationHead">
                <div className="infoCurrentLocation">
                    <h3>Hello, the current weather information at your location.</h3>
                    <h5>Location: {timezone}</h5>
                    <ul>
                        <li>Temperature: {temperature}F</li>
                        <li>Wind gust: {windGust}</li>
                        <li>Humidity: {humidity}</li>
                        <li>Sunrise: {new Date(sunriseTime * 1000).toLocaleTimeString('it-IT')}</li>
                        <li>Sunset: {new Date(sunsetTIme * 1000).toLocaleTimeString('it-IT')}</li>
                    </ul>
                </div>

                <div>
                    <ul>
                        <li className="weekSum">Week Summary:{weekWeather}</li>
                    </ul>

                </div>

                <div>
                    <h3>Every 3rd hour:</h3>
                    <ul>
                        <li className="hourlyWeather">{hourWeather}</li>
                    </ul>
                </div>
            </section>
        );
    }


}


export default Geolocation;