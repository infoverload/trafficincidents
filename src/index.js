import React, { Component } from "react";
import ReactDOM from "react-dom";
import publicIP from "public-ip";
import geoPoint from "geopoint";
import IncidentCategory from './components/incident_category';
import IncidentData from './components/incident_data';
import IncidentLegend from './components/incident_legend';

// Your API KEY can be hardcoded, but I recommend setting it as an env variable.
const API_KEY = '*****';

class App extends Component {
  constructor() {
    super();
    this.state = { 
        error: null,
        isLoaded: false,
        trafficData: []
    };
  }

  componentDidMount() {
    publicIP.v4()
    .then(ip => fetch(`https://ipapi.co/${ip}/json`))
    .then(res => res.json())
    .then(result => this.getBoundingBox(result.latitude, result.longitude))
    .then(
        values => 
        fetch(`https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?key=${API_KEY}&projection=EPSG4326`)
    )  
    .then(res => res.json())
    .then(
        payload => {
            this.setState({
                isLoaded: true,
                trafficData: payload["tm"]["poi"]
            });
        },
        error => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
  }

  getBoundingBox(latitude, longitude) {
    const bboxValues = new geoPoint(latitude, longitude).boundingCoordinates(10, true);
    return bboxValues;
  }

  render() {
    const { error, isLoaded, trafficData } = this.state;
    let date = new Date();
    let currentDate = date.toDateString();
    let currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }  
    else {
        return (
            <div>
                <h1>Traffic Incidents</h1>
                <h5>{currentDate}</h5>
                <h5>Time: {currentTime}</h5>
                <table>
                    <IncidentCategory />
                    <IncidentData data={trafficData} />
                </table>
                <IncidentLegend />
            </div>
        );
    }
  }
}

export default App;
ReactDOM.render(<App />, document.querySelector('.container'));
