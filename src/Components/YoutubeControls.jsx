import React, { useState } from 'react'
import Youtube from 'react-youtube'

function YoutubeControls() {
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
        <div>
            <Youtube videoId='5qap5aO4i9A' onReady={onReady}/>
            <button onClick={onPlayVideo}>Play</button>
            <button onClick={onPauseVideo}>Pause</button>
        </div>
    )
}

export default YoutubeControls