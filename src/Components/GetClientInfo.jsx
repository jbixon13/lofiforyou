import React, { useState, useEffect } from 'react'

var SunCalc = require('suncalc');

const WEATHER_API = process.env.REACT_APP_WEATHER_API

function GetClientInfo() {
    const [time, setTime] = useState(new Date());
    const [{lat, lng}, setLocation] = useState({lat: 0, lng: 0});
    const [weather, setWeather] = useState([]);

    // get local time of client on set interval (every minute)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000);
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
    }, [lat, lng])

    // get sun calculations based on prior functions
    const sunTimes = SunCalc.getTimes(time, lat, lng);

    return(
        <div>
            <p>The user's current time is: {time.toLocaleTimeString()}</p>
            <p>The user's location is: {[lat, lng]}</p>
            <p>The sunrise time at the user's location is: {sunTimes.sunrise.toLocaleTimeString()}</p>
            <p>The sunset time at the user's location is: {sunTimes.sunset.toLocaleTimeString()}</p>
            <p>The weather at the user's location is: {weather}</p>
        </div>
    )
}

export default GetClientInfo