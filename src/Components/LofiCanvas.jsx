import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import Skybox from './Skybox'
import Weather from './Weather'
import Fog from './Fog'
import Grass from './Grass'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[250, 100]} />
        <meshPhysicalMaterial attach='material' color='pink' />
    </mesh>
)

function LofiCanvas({ isDay, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 8, 15] }}>
            <OrbitControls autoRotate={false} />
            <Weather weather={weather} />
            {/* <Fog isDay={isDay} /> */}
            <Plane />
            {/* <Grass /> */}
            <ambientLight args={['white', 0.5]} />
            <pointLight
                castShadow
                args={['white', 0.7]}
                position={[0, 15, 8]}
            />
            <Skybox isDay={isDay} weather={weather} />
            <gridHelper args={[30, 30, 30]} />
        </Canvas>
    )
}

export default LofiCanvas