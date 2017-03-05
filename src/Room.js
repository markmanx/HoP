import React, { Component } from 'react';
import Card from './Card.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
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
    this.card.onExit(callback);
  }

  render() {
    return (
      <Card
        ref={el => this.card = el}
        key={this.state.key}
        cardTitle={this.props.roomData.title}
        onEnter={() => this.onCardEntered()}
        contentReady={this.state.videoReady && this.state.audioReady && this.state.cardEntered}
        children={

          <div>
            <VideoPlayer
              ref={player => this.player = player}
              id={this.props.roomData.slug}
              videoSettings={this.props.roomData.videoSettings}
              isMobile={this.props.isMobile}
              onVideoReady={(e) => this.onVideoReady(e)}
              playing={this.state.videoReady && this.state.cardEntered}/>

            <AudioPlayer
              title={this.props.roomData.title}
              audioSettings={this.props.roomData.audioSettings}
              ready={this.state.cardEntered}
              playing={this.state.playing}/>
          </div>

        }/>
    )
  }
}

export default Room;
