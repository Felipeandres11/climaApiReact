import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from '../src/app_component/weather.component'
import 'weather-icons/css/weather-icons.css'

import Form from './app_component/form.component';

// API CALL api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "e7b4b725a8e4df3990b502f162ba11e7"


class App extends Component {

    constructor(){
      super();
      this.state={
        city: undefined, 
        country: undefined,
        icon: undefined,
        main: undefined,
        celsius: undefined,
        temp_max : undefined,
        temp_min : undefined,
        description: "",
        error: false
      };
      
      
      
      this.weatherIcon = {

          Thunderstorm: "wi-thunderstorm",
          Drizzle: "wi-sleet",
          Rain: "wi-storm-showers",
          Snow: "wi-snow",
          Atmosphere: "wi-fog",
          Clear: "wi-day-sunny",
          Clouds: "wi-day-fog"
      };
    }

    calCelcius(temp){
      let cell = Math.floor(temp - 273.15);
      return cell;
    }

    get_WeatherIcon(icons,rangeID){
      switch(true){
        case rangeID >=200 && rangeID <=232:
          this.setState({icon: this.weatherIcon.Thunderstorm})
        break;

        case rangeID >=300 && rangeID <=321:
          this.setState({icon: this.weatherIcon.Drizzle})
        break;

        case rangeID >=500 && rangeID <=531:
          this.setState({icon: this.weatherIcon.Rain})
        break;

        case rangeID >=600 && rangeID <=622:
          this.setState({icon: this.weatherIcon.Snow})
        break;

        case rangeID >=701 && rangeID <=781:
          this.setState({icon: this.weatherIcon.Atmosphere})
        break;

        case rangeID === 800: 
          this.setState({icon: this.weatherIcon.Clear})
        break;

        case rangeID >= 801 && rangeID <=804: 
           this.setState({icon: this.weatherIcon.Clouds})
        break;

        default: 
          this.setState({icon: this.weatherIcon.Clouds});
        
      }
    }

    getWeather = async(e)=>{

      e.preventDefault();

      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      if(city && country){

      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
      
      const response = await api_call.json();
      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelcius(response.main.temp),
        temp_max: this.calCelcius(response.main.temp_max),
        temp_min: this.calCelcius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
        

      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    }else{
      this.setState({error : true});
    }
  };


  render(){

    return(
      <div className="App">
          <Form loadweather={this.getWeather} error={this.state.error}/>
          <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} weatherIcon={this.state.icon}></Weather>
      </div>
    );

  }

}


export default App;
