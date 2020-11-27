import React, { useState } from 'react'
import Youtube from 'react-youtube'

function AudioControls({getLocation}) {
    const [player, setPlayer] = useState(null);

    const onReady = (event) => {
        setPlayer(event.target);
      };

    const onPlayVideo = () => {
        player.playVideo();
    }

    const onPauseVideo = () => {
        player.pauseVideo();
    }

    return(
        <div className='youtube-controls'>
            <Youtube videoId='5qap5aO4i9A' onReady={onReady}/>
            <button onClick={getLocation}>Create Scene</button>
            <button onClick={onPlayVideo}>Play</button>
            <button onClick={onPauseVideo}>Pause</button>
        </div>
    )
}

export default AudioControls