import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import Skybox from './Skybox'
import Weather from './Weather'
// import Fog from './Fog'
// import Grass from './Grass'
import Forest from './Forest'
// import ForestSimple from './ForestSimple'

// const Plane = () => (
//     <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//         <planeBufferGeometry args={[250, 100]} />
//         <meshPhysicalMaterial color='lightgreen' />
//     </mesh>
// )

function LofiCanvas({ isDay, sunPhase, weather }) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 2, 15] }}>
            <OrbitControls autoRotate={false} target={[0, 3, 0]} />
            <Weather weather={weather} />
            {/* <Fog isDay={isDay} /> */}
            {/* <Plane /> */}
            <Suspense fallback={null} >
                {/* <ForestSimple position={[-6, 0, 4]} rotation={[0, Math.PI / 2, 0]} /> */}
                <Forest position={[-3, 0, 4]} rotation={[0, Math.PI / 2, 0]} />
            </Suspense>
            {/* <Grass /> */}
            <Skybox isDay={isDay} sunPhase={'dusk'} weather={weather} />
            {/* <gridHelper args={[30, 30, 30]} /> */}
        </Canvas>
    )
}

export default LofiCanvas