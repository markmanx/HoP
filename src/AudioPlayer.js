import React, { Component } from 'react';
import Sound from 'react-sound';

class AudioPlayer extends Component {
  render() {
    return (
      <div>
        <Sound
          url='http://freshly-ground.com/data/audio/sm2/birds-in-kauai-128kbps-aac-lc.mp4'
          playStatus={Sound.status.PLAYING} />
      </div>
    )
  }
}

export default AudioPlayer;
