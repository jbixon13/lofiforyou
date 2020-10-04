import React from 'react'
import Rain from './Rain'
import Cloud from './Cloud'

const Weather = () => {
    // functions to randomly assign cloud position
    const heightRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const positionRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const cloudHeight = heightRand(8, 10);
    const cloudPosition = positionRand(-8, 8);

    return(
        <group>
            <Cloud cloudHeight={cloudHeight} cloudPosition={cloudPosition} />
            <Rain rainCount={50} cloudPosition={cloudPosition}/>
        </group>

    )
}

export default Weather

    // return(
    //     <group>
    //         <Cloud cloudHeight={heightRand(3, 4)} cloudPosition={positionRand(-8, 8)} />
    //         <Cloud cloudHeight={heightRand(8, 10)} cloudPosition={positionRand(-8, 8)} />
    //     </group>
    // )