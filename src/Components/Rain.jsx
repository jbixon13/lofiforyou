import React, { useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'
  
const Rain = ({ pointCount, pointSpeed }) => {

    const [positions, velocities, accelerations] = useMemo(() => {
        // set initial vertex variables for use in shaders
        const setInitialPositions = (pointCount) => {
            const initialPositions = [];
            const initialVelocities = [];
            const initialAccelerations = [];
            for (let i = 0; i < pointCount; i++) {
              initialPositions.push(Math.random() * 6);
              initialPositions.push(Math.random() * 15);
              initialPositions.push(-15 + Math.random() * 30);
              initialVelocities.push(0);
              initialVelocities.push(-1);
              initialVelocities.push(0);
              initialAccelerations.push(0);
              initialAccelerations.push(pointSpeed);
              initialAccelerations.push(0);
            }
            return [initialPositions, initialVelocities, initialAccelerations];
        };

        // apply initials over each vertex
        const [
            initialPositions,
            initialVelocities,
            initialAccelerations
        ] = setInitialPositions(pointCount);

        const positions = new Float32Array(initialPositions);
        const velocities = new Float32Array(initialVelocities);
        const accelerations = new Float32Array(initialAccelerations);

        return [positions, velocities, accelerations];
    }, [pointCount, pointSpeed]);

    const uniforms = useMemo(() => ({ time: { value: 1.0 } }), []);

    const geom = useRef();

    const vert = `uniform float time;
    attribute vec3 velocity;
    attribute vec3 acceleration;
    void main() {
        vec3 pos = position;

        gl_Position = projectionMatrix 
            * modelViewMatrix
            * vec4(
                vec3(
                    mod(pos[0] * time, 40.) - 20.,
                    mod(pos[1] + (time * velocity[1] * acceleration[1]), 15.),
                    pos[2]), 1.0);
        gl_PointSize = 3.0;
    }`

    const frag = `uniform float time;
    void main() {
        gl_FragColor = vec4(0.323, 0.615, 1.0, 1.0);
    }`

    useFrame(({ clock }) => {
        if (geom.current) {
            geom.current.material.uniforms.time.value = clock.getElapsedTime()
            geom.current.geometry.attributes.position.needsUpdate = true
        }
    });

    return(
        <points ref={geom}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute 
                    attachObject={["attributes", "velocity"]}
                    count={velocities.length / 3}
                    array={velocities}
                    itemSize={3}
                />
                <bufferAttribute
                    attachObject={["attributes", "acceleration"]}
                    count={accelerations.length / 3}
                    array={accelerations}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                attach="material"
                uniforms={uniforms}
                vertexShader={vert}
                fragmentShader={frag}
                vertexColors
            />
        </points>
    )
}

export default Rain