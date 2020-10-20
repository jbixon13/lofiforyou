import React from 'react'
import { Sky, Stars } from '@react-three/drei'

const Skybox = ({ isDay, weather }) => {

    if (isDay && JSON.stringify(weather).toLowerCase().includes('overcast')) {
        return(
            <Sky
                inclination={1}
                azimuth={0.25} 
            />
        )
    }
    else if (isDay && JSON.stringify(weather).toLowerCase().includes('rain')) {
        return(
            <Sky
            inclination={1}
            azimuth={0.75}
            rayleigh={0}
            />
        )
    }
    else if (isDay && JSON.stringify(weather).toLowerCase().includes('snow')) {
        return(
            <Sky
            inclination={1}
            azimuth={0.75}
            />
        )
    }
    else if (isDay) {
        return(
            <Sky 
                inclination={1}
                azimuth={0.75}
            />
        )
    }
    else return <Stars />
}

export default Skybox