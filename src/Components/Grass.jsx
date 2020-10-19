import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

const object = new THREE.Object3D()

const Grass = () => {
    const ref = useRef();

    const geometry = new THREE.PlaneBufferGeometry(0.12, 1, 1, 4);
    const material = new THREE.MeshPhongMaterial({color: 'green'});

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        
        // control all instances as a group
        // ref.current.position.x = Math.cos(time);
        // ref.current.position.y = Math.sin(time);

        // control each individual instance
        // limit number of instances on x, y, z axis with x, y, z < number in each for loop
        let i = 0;
        for (let x = 0; x < 300; x++)
            for (let y = 0; y < 1; y++)
                for (let z = 0; z < 30; z++) {
                    object.position.set(16 - x, 1 - y, 15 - z)
                    object.rotation.z = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
                    // object.rotation.z = object.rotation.y * 2
                    object.updateMatrix()
                    ref.current.setMatrixAt(i++, object.matrix)
                }
        ref.current.instanceMatrix.needsUpdate = true
    })

    return(
        <instancedMesh ref={ref} args={[geometry, material, 1000]} >
        </instancedMesh>
    )
}

export default Grass