import React from 'react'

function ClientInfo({time, isDay, lat, lng, sunTimes, weather}) {
    return(
        <div>
            <p>The user's current time is: {time.toLocaleTimeString()}</p>
            <p>The user's time of day is: {isDay ? 'daytime' : 'nighttime'}</p>
            <p>The user's location is: {lat}, {lng}</p>
            <p>The sunrise time at the user's location is: {sunTimes.sunrise.toLocaleTimeString()}</p>
            <p>The sunset time at the user's location is: {sunTimes.sunset.toLocaleTimeString()}</p>
            <p>The weather at the user's location is: {weather}</p>
        </div>
    )
}

export default ClientInfo