import React, { useRef } from 'react'
import {useFrame } from 'react-three-fiber'
import { MeshDistortMaterial } from '@react-three/drei'

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
                <icosahedronBufferGeometry args={[2, 2]}/>
                <MeshDistortMaterial color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[cloudPosition - 2, cloudHeight, 0]}>
                <icosahedronBufferGeometry args={[1.5, 2]}/>
                <MeshDistortMaterial color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[cloudPosition + 2, cloudHeight, 0]}>
                <icosahedronBufferGeometry args={[1.5, 2]}/>
                <MeshDistortMaterial color='white' speed={0.5} />
            </mesh>
        </group>
    )
}

export default Cloud