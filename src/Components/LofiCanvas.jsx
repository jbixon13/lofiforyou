import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, Sky, Stars, MeshDistortMaterial } from 'drei'

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
        <Canvas className={isDay ? 'day' : 'night'} colorManagement shadowMap camera={{ position: [0, 8, 15] }}>
            <OrbitControls autoRotate={false} />
            <Clouds />
            <Plane />
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