import React from 'react'

const Fog = ({ isDay }) => {
    if (isDay) {
        return(
            <fog attach='fog' args={['#f4f5f9', 5, 30]} />
        )
    }
    else return(
        <fog attach='fog' args={['#272730', 5, 60]} />
    )
}

export default Fog