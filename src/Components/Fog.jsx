import React from 'react'

const Fog = ({ isDay }) => {
    if (isDay) {
        return(
            <fog attach='fog' args={['white', 5, 60]} />
        )
    }
    else return(
        <fog attach='fog' args={['#272730', 5, 60]} />
    )
}

export default Fog