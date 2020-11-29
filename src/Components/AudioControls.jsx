import React, { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

function AudioControls({getLocation}) {
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=5qap5aO4i9A');
    const [playing, setPlaying] = useState(false);

    const playHandler = () => {
        setPlaying(!playing);
    }

    const urlHandler = (event) => {
        setUrl(event.target.value)
    }

    return(
        <div className='audio-controls'>
            <ReactPlayer className='audio-player'
                url={url} 
                playing={playing}
                width={0}
                height={0}
            />
            <button onClick={getLocation}>Create Scene</button>
            <button onClick={playHandler}>{playing ? 'Pause' : 'Play'}</button>
            <input onChange={urlHandler} type='text' placeholder='Paste any Youtube video or playlist url here' />
        </div>
    )
}

export default AudioControls