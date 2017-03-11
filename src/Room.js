import React, { Component } from 'react';
import Card from './Card.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomData: props.roomData,
      audioReady: true,  // Assume that the audio has loaded already
      videoReady: false
    }
  }

  onVideoReady() {
    this.setState({ videoReady: true });
  }

  componentWillLeave(callback) {
    this.setState({ isExiting: true });
  }

  render() {
    return (
      <Card
        cardTitle={this.state.roomData.title}
        contentReady={this.state.videoReady && this.state.audioReady}
        children={

          <div>
            <VideoPlayer
              ref={player => this.player = player}
              id={this.state.roomData.slug}
              videoSettings={this.state.roomData.videoSettings}
              isMobile={this.props.isMobile}
              onVideoReady={(e) => this.onVideoReady(e)}
              ready={this.state.videoReady}
              pauseMedia={this.props.pauseMedia}/>

            <AudioPlayer
              title={this.state.roomData.title}
              audioSettings={this.state.roomData.audioSettings}
              ready={this.state.videoReady}
              pauseMedia={this.props.pauseMedia}/>
          </div>

        }/>
    )
  }
}

export default Room;
