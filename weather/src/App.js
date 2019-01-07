import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Chicago",
      temp: "Loading...",
      tempScale: 'F',
    }
  }

  componentDidMount() {
    this.handleSubmit(this.state.city)
    // if I want polling every x seconds
    // https://stackoverflow.com/questions/46140764/polling-api-every-x-seconds-with-react
  }

  handleSubmit(city) {
    console.log('A city was submitted: ' + city);
    this.setState({
      city: city,
      temp: "Loading..."
    })
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e686eb81691141fa6168377f12b326cd`, {mode: 'cors'})
      .then(function(response){
        return response.json()
      })
      .then((response) => {
        this.setState({temp: response.main.temp})
        console.log(response)
      })
  }
  handleTempScaleChange(tempScale) {
    this.setState({tempScale: tempScale})
  }

  render() {
    let temp = this.state.temp;
    switch(this.state.tempScale){
      case 'F':
        temp = parseFloat(this.state.temp * 9 / 5 - 459.67).toFixed(2)
        break;
      case 'C':
        temp = parseFloat(this.state.temp - 273.15).toFixed(2)
        break;
      default:
        temp = this.state.temp
      }
      temp = isNaN(temp) ? "Loading..." : temp
    return (
      <div className="App">
          <h1>
            Weather
          </h1>
          <CityForm
            city = {this.state.city}
            tempScale = {this.state.tempScale}
            onSubmit={(city) => this.handleSubmit(city)}
            onTempScaleChange={(tempScale) => this.handleTempScaleChange(tempScale)}
          />
          <p>
            {this.state.city} : {temp}
          </p>
          <a
            className="App-link"
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weather Data from OpenWeatherMap
          </a>
      </div>
    );
  }
}

// I think idealy you would move handleChange() upto App as we did with handleTempScaleChange()
class CityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city,
      //selectedTempScale: props.tempScale,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTempScaleChange = this.handleTempScaleChange.bind(this);
  }

  handleChange(event) {
    this.setState({city: event.target.value});
  }

  handleTempScaleChange(event) {
    //this.setState({selectedTempScale: event.target.value});
    this.props.onTempScaleChange(event.target.value)
    //console.log(event.target.value);
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.city)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          City:
          <input type="text" value={this.state.city} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <span>
          F
          <input type="radio" name="tempScale" value='F'
            checked={this.props.tempScale === 'F'}
            onChange={this.handleTempScaleChange} />
        </span>
        <span>
          C
          <input type="radio" name="tempScale" value='C'
            checked={this.props.tempScale === 'C'}
            onChange={this.handleTempScaleChange} />
        </span>
      </form>
    );
  }
}

export default App;
