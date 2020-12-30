import React, { useRef, Suspense } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Skybox from "./Skybox";
import Weather from "./Weather";
import Lowpoly from './Lowpoly'
import * as THREE from "three";

const Scene = ({ isDay, sunPhase, weather }) => {
    const group = useRef();
    const rotationEuler = new THREE.Euler(0, 0, 0);
    const rotationQuaternion = new THREE.Quaternion(0, 0, 0, 0);
    const { viewport } = useThree();

    useFrame(({ mouse }) => {
        const x = (mouse.x * viewport.width) / 200;
        const y = (mouse.y * viewport.height) / 200;

        rotationEuler.set(y, x, 0);
        rotationQuaternion.setFromEuler(rotationEuler);

        group.current.quaternion.slerp(rotationQuaternion, 0.1);
    });

    return(
        <>
            <group ref={group}>
                <OrbitControls 
                    autoRotate={false}
                    target={[0, 3, 0]}
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
                <Weather weather={weather} />
                <Suspense fallback={null} >
                    <Lowpoly position={[1, 0, 8]}/>
                </Suspense>
                <Skybox isDay={isDay} sunPhase={sunPhase} weather={weather} />
                {/* <Fog isDay={isDay} /> */}
                {/* <gridHelper args={[30, 30, 30]} /> */}
            </group>
        </>
    )
}
export default Scene