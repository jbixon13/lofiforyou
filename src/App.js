import React, { useState, useEffect } from 'react'
import YoutubeControls from './Components/YoutubeControls'
import ClientInfo from './Components/ClientInfo'
import LofiCanvas from './Components/LofiCanvas'

var SunCalc = require('suncalc');

const WEATHER_API = process.env.REACT_APP_WEATHER_API

function App() {
  const [time, setTime] = useState(new Date());
  const [isDay, setIsDay] = useState(true);
  const [sunPhase, setSunPhase] = useState('day');
  const [{lat, lng}, setLocation] = useState({lat: 0, lng: 0});
  const [weather, setWeather] = useState([]);

  // get sun calculations based on date & location
  const sunTimes = SunCalc.getTimes(time, lat, lng);
  const sunPosition = SunCalc.getPosition(time, lat, lng);

  // get local time of client on set interval (every 10 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 600000);
    return () => clearInterval(interval);
  }, [time]);

  // get day/night indicator for use in Skybox
  useEffect(() => {
    if(time > sunTimes.sunrise && time < sunTimes.dusk) {
      setIsDay(true);
    }
    else {
      setIsDay(false);
    }
  }, [time, sunTimes.sunrise, sunTimes.sunset]);

  // get phase of the day for use in Skybox
  useEffect(() => {
    if (time > sunTimes.sunrise && time < sunTimes.sunriseEnd) {
      setSunPhase('sunrise')
    }
    else if (time > sunTimes.sunriseEnd && time < sunTimes.sunsetStart) {
      setSunPhase('day')
    }
    else if (time > sunTimes.sunsetStart && time < sunTimes.sunset) {
      setSunPhase('sunset')
    }
    else if (time > sunTimes.sunset && time < sunTimes.dusk) {
      setSunPhase('dusk')
    }
    else setSunPhase('night')
  }, [time, sunTimes]);

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
  }, []);

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
  }, [lat, lng, time]);

  return (
    <div>
      <h1>Lofi For You</h1>
      <h3>Watch the day pass by as you relax to your favorite lofi music</h3>
      <YoutubeControls />
      <ClientInfo time={time} isDay={isDay} sunPhase={sunPhase} sunPosition={sunPosition} lat={lat} lng={lng} weather={weather} sunTimes={sunTimes} />
      <LofiCanvas isDay={isDay} weather={weather} time={time} />
    </div>
  );
}

export default App;