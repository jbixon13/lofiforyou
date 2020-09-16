import React from 'react'
import YoutubeControls from './Components/YoutubeControls'
import GetClientInfo from './Components/GetClientInfo'
import LofiCanvas from './Components/LofiCanvas'

function App() {
  return (
    <div>
      <h1>Lofi For You</h1>
      <YoutubeControls />
      <GetClientInfo />
      <LofiCanvas />
    </div>
  );
}

export default App;
