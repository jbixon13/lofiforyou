import React from 'react'
import Cloud from './Cloud'
import Rain from './Rain'
import Snow from './Snow'

const Weather = ({ weather }) => {

    // functions to randomly assign cloud position
    const heightRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const positionRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const cloudHeight = heightRand(8, 10);
    const cloudPosition = positionRand(-8, 8);

    if (JSON.stringify(weather).toLowerCase().includes('rain')) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Rain rainCount={1000} />
            </group>
        )
    }

    else if (JSON.stringify(weather).toLowerCase().includes('snow')) {
        return(
            <group>
                <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
                <Snow snowCount={500} />
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