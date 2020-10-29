import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import Skybox from './Skybox'
import Weather from './Weather'
// import Fog from './Fog'
// import Grass from './Grass'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[250, 100]} />
        <meshPhysicalMaterial attach='material' color='lightgreen' />
    </mesh>
)

function LofiCanvas({ isDay, sunPhase, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 2, 15] }}>
            <OrbitControls autoRotate={false} target={[0, 3, 0]} />
            <Weather weather={weather} />
            {/* <Fog isDay={isDay} /> */}
            <Plane />
            {/* <Grass /> */}
            <Skybox isDay={isDay} sunPhase={sunPhase} weather={weather} />
            <gridHelper args={[30, 30, 30]} />
        </Canvas>
    )
}

export default LofiCanvas