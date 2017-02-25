import React, { Component } from 'react';
import Card from './Card.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';

class Room extends Component {
  state = {
    key: this.props.key
  }

  componentDidMount() {
    this.card.onEnter();
  }

  componentWillLeave(callback) {
    this.card.onExit(callback);
  }

  render() {
    return (
      <Card ref={card => this.card = card} key={this.state.key}>

        <div>
          <VideoPlayer
            videoSettings={this.props.roomData.videoSettings}
            isMobile={this.props.isMobile} />
          <AudioPlayer
            title={this.props.roomData.title}
            audioSettings={this.props.roomData.audioSettings}
            />
        </div>

      </Card>
    )
  }
}

export default Room;
