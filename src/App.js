import React, { useState, useEffect } from 'react'
import YoutubeControls from './Components/YoutubeControls'
import ClientInfo from './Components/ClientInfo'
import LofiCanvas from './Components/LofiCanvas'

var SunCalc = require('suncalc');

const WEATHER_API = process.env.REACT_APP_WEATHER_API

function App() {
  const [time, setTime] = useState(new Date());
  const [{lat, lng}, setLocation] = useState({lat: 0, lng: 0});
  const [weather, setWeather] = useState([]);
  const [isDay, setIsDay] = useState(true);

    // get local time of client on set interval (every 10 minutes)
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 600000);
      return () => clearInterval(interval);
    }, [time]);

    // get location of client to determine local sun calculations & weather
    useEffect(() => {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }, 
          (err) => {
            console.log('Error getting location');
          });
      }
    }, [lat, lng]);

    // get current weather of client through API call to weatherapi.com
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${lat},${lng}`)
          const json = await response.json();
          setWeather(json.current.condition.text);
        } catch (error) {
          console.log('Weather API call failed');
          }
      }
      fetchData();
    }, [lat, lng, time])

    // get sun calculations based on prior functions
    const sunTimes = SunCalc.getTimes(time, lat, lng);

  return (
    <div>
      <h1>Lofi For You</h1>
      <YoutubeControls />
      <ClientInfo time={time} lat={lat} lng={lng} weather={weather} sunTimes={sunTimes} />
      <LofiCanvas />
    </div>
  );
}

export default App;
