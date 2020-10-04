import React, { useRef } from 'react'
import {useFrame } from 'react-three-fiber'
import { MeshDistortMaterial } from 'drei'

const Cloud = ({ cloudHeight, cloudPosition }) => {
    const group = useRef()
    
    // move the cloud across the canvas until at certain position, then reset
    useFrame(() => {
        if (group.current.position.x < 30) {
            group.current.position.x = group.current.position.x += 0.01
        }
        else group.current.position.x = -30;
    })

    return(
        <group ref={group}>
            <mesh castShadow recieveShadow position={[cloudPosition, cloudHeight, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[2, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[cloudPosition - 2, cloudHeight, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[1.5, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[cloudPosition + 2, cloudHeight, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[1.5, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
        </group>
    )
}

export default Cloud

// const Clouds = () => {
//     // functions to randomly assign cloud position
//     const heightRand = (min, max) => {
//         return Math.random() * (max - min) + min
//     }

//     const positionRand = (min, max) => {
//         return Math.random() * (max - min) + min
//     }

//     return(
//         <group>
//             <Cloud cloudHeight={heightRand(3, 4)} cloudPosition={positionRand(-8, 8)} />
//             <Cloud cloudHeight={heightRand(8, 10)} cloudPosition={positionRand(-8, 8)} />
//         </group>
//     )
// }