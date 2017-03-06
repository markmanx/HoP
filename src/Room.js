import React, { Component } from 'react';
import Card from './Card.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomData: props.roomData,
      isExiting: false,
      audioReady: true,  // Assume that the audio has loaded already
      videoReady: false,
      cardEntered: false
    }
  }

  onCardEntered() {
    this.setState({ cardEntered: true });
  }

  onVideoReady() {
    this.setState({ videoReady: true })
  }

  componentWillLeave(callback) {
    this.setState({ isExiting: true });
    this.card.onExit(callback);
  }

  render() {
    return (
      <Card
        ref={el => this.card = el}
        cardTitle={this.state.roomData.title}
        onEnter={() => this.onCardEntered()}
        contentReady={this.state.videoReady && this.state.audioReady && this.state.cardEntered}
        children={

          <div>
            <VideoPlayer
              ref={player => this.player = player}
              id={this.state.roomData.slug}
              videoSettings={this.state.roomData.videoSettings}
              isMobile={this.props.isMobile}
              onVideoReady={(e) => this.onVideoReady(e)}
              ready={this.state.videoReady && this.state.cardEntered}
              pauseMedia={this.isExiting ? false : this.props.pauseMedia}/>

            <AudioPlayer
              title={this.state.roomData.title}
              audioSettings={this.state.roomData.audioSettings}
              ready={this.state.videoReady && this.state.cardEntered}
              pauseMedia={this.isExiting ? false : this.props.pauseMedia}/>
          </div>

        }/>
    )
  }
}

export default Room;
