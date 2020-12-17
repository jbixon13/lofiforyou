import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import Skybox from './Skybox'
import Weather from './Weather'
// import Fog from './Fog'
import Lowpoly from './Lowpoly'

function ThreeCanvas({ isDay, sunPhase, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 2, 12] }}>
            <OrbitControls 
                autoRotate={false}
                target={[0, 3, 0]}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                enableZoom={false}
                enablePan={false}
            />
            <Weather weather={weather} />
            {/* <Fog isDay={isDay} /> */}
            <Suspense fallback={null} >
                <Lowpoly position={[1, 0, 8]}/>
            </Suspense>
            <Skybox isDay={isDay} sunPhase={sunPhase} weather={weather} />
            {/* <gridHelper args={[30, 30, 30]} /> */}
        </Canvas>
    )
}

export default ThreeCanvas