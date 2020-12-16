import React from 'react'
import Cloud from './Cloud'
import Rain from './Rain'
import Snow from './Snow'

const Weather = ({ weather }) => {
    const weatherString = JSON.stringify(weather).toLowerCase();
    
    // organize weather conditions into groups for point manipulation
    const weatherRainLightList = [
        'patchy light drizzle',
        'light drizzle',
        'freezing drizzle',
        'patchy light rain',
        'light rain',
        'light freezing rain',
        'light rain shower',
        'patchy light rain with thunder'
    ];
    const weatherRainList = [
        'heavy freezing drizzle',
        'moderate rain at times',
        'moderate rain'
    ];
    const weatherRainHeavyList = [
        'heavy rain at times',
        'heavy rain',
        'moderate or heavy freezing rain',
        'moderate or heavy rain shower',
        'torrential rain shower',
        'moderate or heavy rain with thunder'
    ];
    const weatherSnowLightList = [
        'patchy light snow',
        'light snow',
        'light snow showers',
        'patchy light snow with thunder'

    ];
    const weatherSnowList = [
        'patchy moderate snow',
        'moderate snow',
        'moderate or heavy snow showers',
        'moderate or heavy snow with thunder'
    ];
    const weatherSnowHeavyList = [
        'patchy heavy snow',
        'heavy snow'
    ];

    // boolean indicators of the weather
    const weatherRainLight = weatherRainLightList.some(el => weatherString.includes(el));
    const weatherRain = weatherRainList.some(el => weatherString.includes(el));
    const weatherRainHeavy = weatherRainHeavyList.some(el => weatherString.includes(el));
    const weatherSnowLight = weatherSnowLightList.some(el => weatherString.includes(el));
    const weatherSnow = weatherSnowList.some(el => weatherString.includes(el));
    const weatherSnowHeavy = weatherSnowHeavyList.some(el => weatherString.includes(el));

    // functions to randomly assign cloud position
    const heightRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const positionRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const cloudHeight = heightRand(8, 10);
    const cloudPosition = positionRand(-8, 8);

    if (weatherRainLight) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Rain pointCount={200} pointSpeed={15.8} />
            </group>
        )
    }

    else if (weatherRain) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Rain pointCount={1000} pointSpeed={10.8} />
            </group>
        )
    }

    else if (weatherRainHeavy) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Rain pointCount={1500} pointSpeed={20.8} />
            </group>
        )
    }

    else if (weatherSnowLight) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Snow pointCount={500} pointSpeed={2.8} />
            </group>
        )
    }

    else if (weatherSnow) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Snow pointCount={600} pointSpeed={5.8} />
            </group>
        )
    }

    else if (weatherSnowHeavy) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Snow pointCount={700} pointSpeed={7.8} />
            </group>
        )
    }

    else return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
            </group>
        )
    }

export default Weather