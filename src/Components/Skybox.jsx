import React from 'react'
import { Sky, Stars } from 'drei'

const Skybox = ({isDay}) => {

    var effectController = {
        inclination: 0,
        azimuth: 0.25,
    }

    var theta = Math.PI * (effectController.inclination - 0.5);
    var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

    if (isDay) {
        return(
            <Sky 
                sunPosition={
                    [
                        Math.cos(phi),
                        Math.sin(phi) * Math.sin(theta),
                        Math.sin(phi) * Math.cos(theta)
                    ]
                }
                turbidity={10}
                rayleigh={3}
                mieCoefficient={0.005}
                mieDirectionalG={0.7}
            />
        )
    }
    else return <Stars />
}

export default Skybox