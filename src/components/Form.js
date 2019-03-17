import React from 'react';
import '../App.css';


const Form = (props) => {
  return (
      <form onSubmit={props.loadWeather} className="form">
        <input type="text" name="city" placeholder="City" className="input"/>
        <input type="text" name="country" placeholder="Country" className="input"/>
        <button>Get Weather</button>
      </form>
  )
}
export default Form;