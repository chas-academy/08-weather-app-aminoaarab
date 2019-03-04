import React from 'react';



const Weather = (props) => {
    //const date = new Date()
    const sunrise = Date(props.sunrise).toString();
    const sunset = Date(props.sunset).toString();
    //const sunrise = date.getDate(props.sunrise) 
    //const sunset = date.getDate(props.sunset) 
    return (
        <div>
            <div>
                {props.country && props.city && <p>Location: {props.city}, {props.country}</p>}
                {props.temperature && <p>Temperature: {props.temperature}</p>}
                {props.humidity && <p>Humidity: {props.humidity}</p>}
                {props.description && <p>Conditions:  {props.description}</p>}
                {props.wind && <p>Wind: {props.wind}</p>}
                {props.sunrise && <p>Sunrise: {sunrise}</p>}
                {props.sunset && <p>Sunset: {sunset}</p>}
                {props.error && <p>{props.error}</p>}
            </div>
        </div>
    )
}
export default Weather;