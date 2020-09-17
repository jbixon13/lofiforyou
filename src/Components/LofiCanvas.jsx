import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Sky } from 'drei'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshPhysicalMaterial attach='material' color='pink' />
    </mesh>
)

const Box = () => (
    <mesh castShadow>
        <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
        <meshBasicMaterial attach='material' color='black' />
    </mesh>
)

function LofiCanvas() {
    return(
        <Canvas shadowMap camera={{ position: [0, 10, 15] }}>
            <OrbitControls />
            <Box />
            <Plane />
            <ambientLight />
            <spotLight
                castShadow
                penumbra={1}
                position={[0, 5, 10]}
            />
            <Sky />
        </Canvas>
    )
}

export default LofiCanvas