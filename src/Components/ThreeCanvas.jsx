import React from 'react'
import { Canvas } from 'react-three-fiber'
import Scene from './Scene'

function ThreeCanvas({ isDay, sunPhase, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 2, 12] }}>
            <Scene isDay={isDay} sunPhase={sunPhase} weather={weather} />
        </Canvas>
    )
}

export default ThreeCanvas