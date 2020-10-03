import React, { useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { shaderMaterial } from 'drei'

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

export default Rain