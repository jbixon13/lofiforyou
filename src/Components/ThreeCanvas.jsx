import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import Skybox from './Skybox'
import Weather from './Weather'
// import Fog from './Fog'
import Forest from './Forest'

// const Plane = () => (
//     <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//         <planeBufferGeometry args={[250, 100]} />
//         <meshPhysicalMaterial color='lightgreen' />
//     </mesh>
// )

function ThreeCanvas({ isDay, sunPhase, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 2, 15] }}>
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
            {/* <Plane /> */}
            <Suspense fallback={null} >
                <Forest position={[-3, 0, 4]} rotation={[0, Math.PI / 2, 0]} />
            </Suspense>
            <Skybox isDay={isDay} sunPhase={sunPhase} weather={weather} />
            {/* <gridHelper args={[30, 30, 30]} /> */}
        </Canvas>
    )
}

export default ThreeCanvas