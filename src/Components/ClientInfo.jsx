import React from 'react'

function ClientInfo({time, isDay, sunPhase, sunPosition, lat, lng, sunTimes, weather}) {
    return(
        <div className='client-info'>
            <h4>Debugging:</h4>
            <p><strong>Local time:</strong> {time.toLocaleTimeString()}</p>
            <p><strong>Location:</strong> {lat}, {lng}</p>
            <p><strong>Day or night:</strong> {isDay ? 'daytime' : 'nighttime'}</p>
            <p><strong>Time of day:</strong> {sunPhase}</p>
            <p><strong>Phases of day:</strong></p>
            <ul>
                <li><strong>Sunrise:</strong> {sunTimes.sunrise.toLocaleTimeString()} - {sunTimes.sunriseEnd.toLocaleTimeString()}</li>
                <li><strong>Daytime:</strong> {sunTimes.sunriseEnd.toLocaleTimeString()} - {sunTimes.sunsetStart.toLocaleTimeString()}</li>
                <li><strong>Sunset:</strong> {sunTimes.sunsetStart.toLocaleTimeString()} - {sunTimes.sunset.toLocaleTimeString()}</li>
                <li><strong>Dusk:</strong> {sunTimes.sunset.toLocaleTimeString()} - {sunTimes.dusk.toLocaleTimeString()}</li>
                <li><strong>Night: </strong> {sunTimes.dusk.toLocaleTimeString()} - {sunTimes.sunrise.toLocaleTimeString()}</li>
            </ul>
            <p><strong>Weather:</strong> {weather}</p>
        </div>
    )
}

export default ClientInfo