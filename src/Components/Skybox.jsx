import React from 'react'
import { Sky, Stars } from '@react-three/drei'

const Skybox = ({ isDay, sunPhase, weather }) => {
    const weatherString = JSON.stringify(weather).toLowerCase();

    // organize weather conditions into groups for skybox manipulation
    const weatherClearList = ['sunny', 'clear', 'partly cloudy'];
    const weatherCloudyList = ['cloudy', 'overcast', 'mist'];
    const weatherRainList = ['rain', 'drizzle'];
    const weatherSnowList = ['snow'];

    // boolean indicators of the weather
    const weatherClear = weatherClearList.some(el => weatherString.includes(el));
    const weatherCloudy = weatherCloudyList.some(el => weatherString.includes(el));
    const weatherRain = weatherRainList.some(el => weatherString.includes(el));
    const weatherSnow = weatherSnowList.some(el => weatherString.includes(el));

    if (weatherClear && sunPhase === 'sunrise') {
        console.log('clear sunrise')
        return(
            <group>
                <Sky
                    inclination={0.49}
                    azimuth={0.27}
                />
                <ambientLight args={['white', 0.5]} />
                <pointLight
                    castShadow
                    args={['white', 0.5]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'day') {
        console.log('clear daytime')
        return(
            <group>
                <Sky 
                    inclination={1}
                    azimuth={0.75}
                />
                <ambientLight args={['white', 0.5]} />
                <pointLight
                    castShadow
                    args={['white', 0.5]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'golden hour') {
        console.log('clear golden hour')
        return(
            <group>
                <Sky
                    inclination={0.50}
                    azimuth={0.27}
                    turbidity={8}
                    rayleigh={2}
                />
                <ambientLight args={['pink', 0.3]} />
                <pointLight
                    castShadow
                    args={['hotpink', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'sunset') {
        console.log('clear sunset')
        return(
            <group>
                <Sky
                    inclination={0.50}
                    azimuth={0.27}
                    turbidity={8}
                    rayleigh={2}
                />
                <ambientLight args={['pink', 0.3]} />
                <pointLight
                    castShadow
                    args={['hotpink', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'dusk') {
        console.log('clear dusk')
        return(
            <group>
                <Sky
                    inclination={0.49}
                    azimuth={0.27}                
                />
                <ambientLight args={['#4e5484', 0.2]} />
                <pointLight
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'night') {
        console.log('clear night')
        return(
            <group>
                <Stars />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherCloudy && sunPhase === 'sunrise') {
        console.log('cloudy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.27}
            />
        )
    }
    else if (weatherCloudy && sunPhase === 'day') {
        console.log('cloudy daytime')
        return(
            <group>
                <Sky 
                    inclination={1}
                    azimuth={0.27}
                    rayleigh={0} 
                    turbidity={8}
                />
                <ambientLight args={['white', 0.3]} />
                <pointLight
                    castShadow
                    args={['white', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherCloudy && sunPhase === ('golden hour' || 'sunset')) {
        console.log('cloudy golden hour / sunset')
        return(
            <group>
                <Sky 
                    inclination={0.53}
                    azimuth={0.27}
                    rayleigh={0}
                    turbidity={8}
                    mieDirectionalG={0.5}
                />
                <ambientLight args={['#4e5484', 0.3]} />
                <pointLight
                    castShadow
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherCloudy && sunPhase === 'dusk') {
        console.log('cloudy dusk')
        return(
            <group>
                <Sky 
                    inclination={0.48}
                    azimuth={0.27}
                    rayleigh={0.4}
                />
                <ambientLight args={['#4e5484', 0.2]} />
                <pointLight
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherCloudy && sunPhase === 'night') {
        console.log('cloudy night')
        return(
            <group>
                <Stars />
                <Sky 
                    rayleigh={6}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherRain && sunPhase === 'sunrise') {
        console.log('rainy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.27}
            />
        )
    }
    else if (weatherRain && sunPhase === 'day') {
        console.log('rainy daytime')
        return(
            <group>
                <Sky 
                    inclination={1}
                    azimuth={0.27}
                    rayleigh={0}
                    turbidity={0.9}
                />
                <ambientLight args={['white', 0.3]} />
                <pointLight
                    castShadow
                    args={['white', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherRain && sunPhase === ('golden hour' || 'sunset')) {
        console.log('rainy golden hour / sunset')
        return(
            <group>
                <Sky 
                    inclination={0.53}
                    azimuth={0.27}
                    rayleigh={0}
                    turbidity={0.6}
                    mieDirectionalG={0.5}
                />
                <ambientLight args={['#4e5484', 0.3]} />
                <pointLight
                    castShadow
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherRain && sunPhase === 'dusk') {
        console.log('rainy dusk')
        return(
            <group>
                <Sky 
                    inclination={0.48}
                    azimuth={0.27}
                    rayleigh={0.4}
                />
                <ambientLight args={['#4e5484', 0.2]} />
                <pointLight
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherRain && sunPhase === 'night') {
        console.log('rainy night')
        return(
            <group>
                <Stars />
                <Sky 
                    rayleigh={6}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherSnow && sunPhase === 'sunrise') {
        console.log('snowy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.27}
            />
        )
    }
    else if (weatherSnow && sunPhase === 'day') {
        console.log('snowy daytime')
        return(
            <group>
                <Sky 
                    inclination={1}
                    azimuth={0.27}
                />
                <ambientLight args={['white', 0.3]} />
                <pointLight
                    castShadow
                    args={['white', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherSnow && sunPhase === ('golden hour' || 'sunset')) {
        console.log('snowy golden hour / sunset')
        return(
            <group>
                <Sky 
                    inclination={0.50}
                    azimuth={0.27}
                    rayleigh={0}
                    turbidity={0.6}
                    mieDirectionalG={0.5}
                />
                <ambientLight args={['#4e5484', 0.3]} />
                <pointLight
                    castShadow
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherSnow && sunPhase === 'dusk') {
        console.log('snowy dusk')
        return(
            <group>
                <Sky 
                    inclination={0.48}
                    azimuth={0.27}
                    rayleigh={0.4}
                />
                <ambientLight args={['#4e5484', 0.2]} />
                <pointLight
                    args={['#4e5484', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else if (weatherSnow && sunPhase === 'night') {
        console.log('snowy night')
        return(
            <group>
                <Stars />
                <Sky 
                    rayleigh={0}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, -8]}
                />
            </group>
        )
    }
    else {
        console.log('no if-else condition met', weather, sunPhase);
        return null
    }
}

export default Skybox