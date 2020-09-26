import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, Sky, Stars } from 'drei'

const Plane = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshPhysicalMaterial attach='material' color='pink' />
    </mesh>
)

const Box = () => {
    const group = useRef()
    
    // move the box across the canvas until at certain position, then reset
    useFrame(() => {
        if (group.current.position.x < 30) {
            group.current.position.x = group.current.position.x += 0.01
        }
        else group.current.position.x = -30;
    })

    return(
        <group ref={group} castShadow>
            <group position={[0, 3, 0]}>
                <mesh>
                    <sphereBufferGeometry attach='geometry' args={[2, 7, 8]}/>
                    <meshLambertMaterial attach='material' color='white' />
                </mesh>
            </group>
            <group position={[-2, 3, 0]}>
                <mesh>
                    <sphereBufferGeometry attach='geometry' args={[1.5, 7, 8]}/>
                    <meshLambertMaterial attach='material' color='white' />
                </mesh>
            </group>
            <group position={[2, 3, 0]}>
                <mesh>
                    <sphereBufferGeometry attach='geometry' args={[1.5, 7, 8]}/>
                    <meshLambertMaterial attach='material' color='white' />
                </mesh>
            </group>
        </group>
    )
}

const Skybox = ({isDay}) => {

    var effectController = {
        inclination:0.49,
        azimuth: 0.25,
    }

    var theta = Math.PI * (effectController.inclination - 0.5);
    var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

    if (isDay) {
        return(
            <Sky 
                sunPosition={
                    [
                        Math.cos(phi),
                        Math.sin(phi) * Math.sin(theta),
                        Math.sin(phi) * Math.cos(theta)
                    ]
                }
                turbidity={10}
                rayleigh={3}
                mieCoefficient={0.005}
                mieDirectionalG={0.7}
            />
        )
    }
    else return <Stars />
}

function LofiCanvas({isDay}) {
    return(
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 10, 15] }}>
            <OrbitControls autoRotate={false} />
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