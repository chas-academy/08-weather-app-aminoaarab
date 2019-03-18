import React from 'react';


import './App.css';


import Geolocation from './components/Geolocation';
import Navbar from './components/Navbar';

function App(){
 

  
  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div>
        <Geolocation />
      </div>
    </section>
  )
}


export default App;
