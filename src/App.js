import React, {Component} from 'react';

import './App.css';
import Geolocation from './components/Geolocation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



class App extends Component {
  render () {
  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div>
        <Geolocation />
        <Footer />
      </div>
    </section>

  )
}
}


export default App;
