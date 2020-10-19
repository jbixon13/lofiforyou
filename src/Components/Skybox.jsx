import React from 'react'
import { Sky, Stars } from '@react-three/drei'

const Skybox = ({isDay}) => {

    if (isDay) {
        return(
            <Sky />
        )
    }
    else return <Stars />
}

export default Skybox