import React, { useState, useEffect } from 'react'
import AudioControls from './Components/AudioControls'
import ClientInfo from './Components/ClientInfo'
import ThreeCanvas from './Components/ThreeCanvas'

var SunCalc = require('suncalc');

const WEATHER_API = process.env.REACT_APP_WEATHER_API

function App() {
  const [time, setTime] = useState(new Date());
  const [isDay, setIsDay] = useState(true);
  const [sunPhase, setSunPhase] = useState('day');
  const [{lat, lng}, setLocation] = useState({lat: 0, lng: 0});
  const [weather, setWeather] = useState([]);
  const [renderScene, setRenderScene] = useState(false);

  // get sun calculations based on date & location
  const sunTimes = SunCalc.getTimes(time, lat, lng);

  // get local time of client on set interval (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 300000);
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
  }, [time, sunTimes.sunrise, sunTimes.dusk]);

  // get phase of the day for use in Skybox
  useEffect(() => {
    if (time > sunTimes.sunrise && time < sunTimes.sunriseEnd) {
      setSunPhase('sunrise')
    }
    else if (time > sunTimes.sunriseEnd && time < sunTimes.goldenHour) {
      setSunPhase('day')
    }
    else if (time > sunTimes.goldenHour && time < sunTimes.sunsetStart) {
      setSunPhase('golden hour')
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
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        setRenderScene(true);
      },
      (err) => {
        console.log('Error getting location');
      });
    }
  }

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

  if (renderScene) {
    return (
      <div>
        <h1>Lofi for You</h1>
        <h2>Watch the day pass by as you relax to your favorite music</h2>
        <AudioControls getLocation={getLocation} renderScene={renderScene} />
        <ClientInfo time={time} isDay={isDay} sunPhase={sunPhase} lat={lat} lng={lng} weather={weather} sunTimes={sunTimes} />
        <ThreeCanvas isDay={isDay} sunPhase={sunPhase} weather={weather} />
    </div>      
    );
  }

  else return (
    <div>
      <h1>Lofi for You</h1>
      <h2>Watch the day pass by as you relax to your favorite music</h2>
      <AudioControls getLocation={getLocation}/>
    </div>
  );
}

export default App;