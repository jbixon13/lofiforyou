import React, { useState, useEffect } from 'react'

var SunCalc = require('suncalc');

function GetClientInfo() {
    const [time, setTime] = useState(new Date());
    const [{lat, lng}, setLocation] = useState({lat: 0, lng: 0});

    const sunTimes = SunCalc.getTimes(time, lat, lng);
    console.log(sunTimes)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            console.log(time)
        }, 60000);
        return () => clearInterval(interval);
    }, [time]);

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

    return(
        <div>
            <p>The user's current time is: {time.toLocaleTimeString()}</p>
            <p>The user's location is: {[lat, lng]}</p>
            <p>The sunrise time at the user's location is: {sunTimes.sunrise.toLocaleTimeString()}</p>
            <p>The sunset time at the user's location is: {sunTimes.sunset.toLocaleTimeString()}</p>
        </div>
    )
}

export default GetClientInfo