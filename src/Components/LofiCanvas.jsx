import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Sky, Stars } from 'drei'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshPhysicalMaterial attach='material' color='pink' />
    </mesh>
)

const Box = () => (
    <mesh castShadow position={[0, 2.5, 0]}>
        <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
        <meshPhysicalMaterial attach='material' color='gray' />
    </mesh>
)

const Skybox = ({isDay}) => {

    if (isDay) {
        return <Sky />
    }

    return <Stars />
}

function LofiCanvas({isDay}) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 10, 15] }}>
            <OrbitControls autoRotate={true} />
            <Box />
            <Plane />
            <ambientLight />
            <pointLight
                castShadow
                position={[5, 5, 10]}
                distance={50}
            />
            <Skybox isDay={isDay}/>
            <gridHelper args={[30, 30, 30]} />
        </Canvas>
    )
}

export default LofiCanvas