import React from 'react'
import { Sky, Stars } from '@react-three/drei'

const Skybox = ({ isDay, sunPhase, weather }) => {
    const weatherString = JSON.stringify(weather).toLowerCase();
    const weatherCloudyList = ['cloudy', 'overcast', 'mist'];
    const weatherRainList = ['rain'];
    const weatherSnowList = ['snow'];
    const weatherCloudy = weatherCloudyList.some(el => weatherString.includes(el));
    const weatherRain = weatherRainList.some(el => weatherString.includes(el));
    const weatherSnow = weatherSnowList.some(el => weatherString.includes(el));

    if (isDay && weatherCloudy) {
        console.log('debug 1')
        return(
            <Sky
                inclination={1}
                azimuth={0.25} 
            />
        )
    }
    else if (isDay && weatherRain) {
        console.log('debug 2')
        return(
            <Sky
            inclination={1}
            azimuth={0.75}
            rayleigh={0}
            />
        )
    }
    else if (isDay && weatherSnow) {
        console.log('debug 3')
        return(
            <Sky
            inclination={1}
            azimuth={0.75}
            />
        )
    }
    else if (sunPhase === 'sunrise') {
        console.log('debug 4')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (sunPhase === 'day') {
        console.log('debug 5')
        return(
            <Sky 
                inclination={1}
                azimuth={0.75}
            />
        )
    }
    else if (sunPhase === 'sunset') {
        console.log('debug 6')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else return <Stars />
}

export default Skybox