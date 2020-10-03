import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, MeshDistortMaterial, shaderMaterial } from 'drei'
import Skybox from './Skybox'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshPhysicalMaterial attach='material' color='pink' />
    </mesh>
)

const Cloud = ({height, position}) => {
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
            <mesh castShadow recieveShadow position={[position, height, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[2, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[position - 2, height, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[1.5, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
            <mesh castShadow recieveShadow position={[position + 2, height, 0]}>
                <icosahedronBufferGeometry attach='geometry' args={[1.5, 2]}/>
                <MeshDistortMaterial attach='material' color='white' speed={0.5} />
            </mesh>
        </group>
    )
}

const Clouds = () => {
    // functions to randomly assign cloud position
    const heightRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    const positionRand = (min, max) => {
        return Math.random() * (max - min) + min
    }

    return(
        <group>
            <Cloud height={heightRand(3, 4)} position={positionRand(-8, 8)} />
            <Cloud height={heightRand(8, 10)} position={positionRand(-8, 8)} />
        </group>
    )
}

const Rain = ({ rainCount }) => {
    const initialPositions = []
    const initialVelocities = []
    const initialAccelerations = []
    for (let i=0; i < rainCount; i++) {
        initialPositions.push(-5 + Math.random() * 10)
        initialPositions.push(10 + Math.random() * 2)
        initialPositions.push(Math.random() * 5)
        initialVelocities.push(0)
        initialVelocities.push(-1)
        initialVelocities.push(0)
        initialAccelerations.push(0)
        initialAccelerations.push(3.8)
        initialAccelerations.push(0)
    }

    const positions = useMemo(() => new Float32Array(initialPositions), [initialPositions])
    const velocities = useMemo(() => new Float32Array(initialVelocities), [initialVelocities])
    const accelerations = useMemo(() => new Float32Array(initialAccelerations), [initialAccelerations])
    const uniforms = useMemo(() => ({ time: { value: 1.0 } }), [])

    const geom = useRef()

    const vert = `uniform float time;
    attribute vec3 velocity;
    attribute vec3 acceleration;
    void main() {
        vec3 pos = position;
        gl_Position = projectionMatrix 
            * modelViewMatrix
            * vec4(
                vec3(
                    pos[0],
                    pos[1] + (time * velocity[1] * acceleration[1]),
                    pos[2]), 1.0);
        gl_PointSize = 5.0;
    }`

    const frag = `uniform float time;
    void main() {
        float z = 1.0 - (gl_FragCoord.z / gl_FragCoord.w) / 20.0;
        gl_FragColor = vec4(sin(time * 2.0) * z, cos(time) * z, atan(time) * z, 1.0);
    }`

    useFrame(({ clock }) => {
        if (geom.current) {
            geom.current.material.uniforms.time.value = clock.getElapsedTime()
            geom.current.geometry.attributes.position.needsUpdate = true
            console.log(geom.current.geometry.attributes.position.array[1])            
        }
    });

    return(
        <points ref={geom}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attachObject={["attributes", "position"]} count={positions.length / 3} array={positions} itemSize={3} />
                <bufferAttribute attachObject={["attributes", "velocity"]} count={velocities.length / 3} array={velocities} itemSize={3} />
                <bufferAttribute attachObject={["attributes", "acceleration"]} count={accelerations.length / 3} array={accelerations} itemSize={3} />
            </bufferGeometry>
            <shaderMaterial attach="material" uniforms={uniforms} vertexShader={vert} fragmentShader={frag} vertexColors />
        </points>
    )
}

function LofiCanvas({isDay}) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 8, 15] }}>
            <OrbitControls autoRotate={false} />
            <Clouds />
            <Plane />
            <Rain rainCount={50} />
            <ambientLight args={['white', 0.5]} />
            <pointLight
                castShadow
                args={['white', 0.7]}
                position={[0, 15, 8]}
            />
            <Skybox isDay={isDay}/>
            <gridHelper args={[30, 30, 30]} />
        </Canvas>
    )
}

export default LofiCanvas