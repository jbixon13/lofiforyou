import React from 'react'
import { Sky, Stars } from '@react-three/drei'

const Skybox = ({ isDay, sunPhase, weather }) => {
    const weatherString = JSON.stringify(weather).toLowerCase();

    // organize weather conditions into groups for skybox manipulation
    const weatherClearList = ['sunny', 'clear', 'partly cloudy'];
    const weatherCloudyList = ['cloudy', 'overcast', 'mist'];
    const weatherRainList = ['rain'];
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
                    azimuth={0.25}
                />
                <ambientLight args={['white', 0.5]} />
                {/* shadow will face the wrong side, need to think about more */}
                <pointLight
                    castShadow
                    args={['white', 0.5]}
                    position={[0, 15, 8]}
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
                    position={[0, 15, 8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'sunset') {
        console.log('clear sunset')
        return(
            <group>
                <Sky
                    inclination={0.49}
                    azimuth={0.25}
                />
                <ambientLight args={['white', 0.5]} />
                {/* shadow will face the wrong side, need to think about more */}
                <pointLight
                    castShadow
                    args={['white', 0.5]}
                    position={[0, 15, 8]}
                />
            </group>
        )
    }
    else if (weatherClear && sunPhase === 'dusk') {
        console.log('clear dusk')
        return(
            <Sky
                inclination={0.50}
                azimuth={0.25}                
            />
        )
    }
    else if (weatherCloudy && sunPhase === 'sunrise') {
        console.log('cloudy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherCloudy && sunPhase === 'day') {
        console.log('cloudy daytime')
        return(
            <group>
                <Sky 
                    inclination={1}
                    azimuth={0.25} 
                />
                <ambientLight args={['white', 0.5]} />
                <pointLight
                    castShadow
                    args={['white', 0.5]}
                    position={[0, 15, 8]}
                />
            </group>
        )
    }
    else if (weatherCloudy && sunPhase === 'sunset') {
        console.log('cloudy sunset')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherCloudy && sunPhase === 'dusk') {
        console.log('cloudy dusk')
        return(
            <Sky
                inclination={0.50}
                azimuth={0.25}                
            />
        )
    }
    else if (weatherRain && sunPhase === 'sunrise') {
        console.log('rainy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherRain && sunPhase === 'day') {
        console.log('rainy daytime')
        return(
            <Sky 
                inclination={1}
                azimuth={0.75}
                rayleigh={0}
            />
        )
    }
    else if (weatherRain && sunPhase === 'sunset') {
        console.log('rainy sunset')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherRain && sunPhase === 'dusk') {
        console.log('rainy dusk')
        return(
            <Sky
                inclination={0.50}
                azimuth={0.25}                
            />
        )
    }
    else if (weatherSnow && sunPhase === 'sunrise') {
        console.log('snowy sunrise')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherSnow && sunPhase === 'day') {
        console.log('snowy daytime')
        return(
            <Sky 
                inclination={1}
                azimuth={0.75}
            />
        )
    }
    else if (weatherSnow && sunPhase === 'sunset') {
        console.log('snowy sunset')
        return(
            <Sky
                inclination={0.49}
                azimuth={0.25}
            />
        )
    }
    else if (weatherSnow && sunPhase === 'dusk') {
        console.log('snowy dusk')
        return(
            <Sky
                inclination={0.50}
                azimuth={0.25}                
            />
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
                    position={[0, 15, 8]}
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
                    rayleigh={10}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, 8]}
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
                    rayleigh={10}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, 8]}
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
                    rayleigh={10}
                />
                <ambientLight args={['#272730', 0.2]} />
                <pointLight
                    args={['#272730', 0.3]}
                    position={[0, 15, 8]}
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