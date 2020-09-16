import React from 'react'
import { Canvas } from 'react-three-fiber'

function LofiCanvas() {
    return(
        <Canvas>
            <mesh>
                <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
                <meshBasicMaterial attach='material' color='red' />
            </mesh>
        </Canvas>
    )
}

export default LofiCanvas