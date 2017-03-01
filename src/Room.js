import React, { Component } from 'react';
import Card from './Card.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';

class Room extends Component {
  state = {
    key: this.props.key,
    audioReady: false,
    videoReady: false,
    contentReady: false,
    playing: false
  }

  componentDidMount() {
    this.card.onEnter(() => this.enterAnimComplete());
  }

  enterAnimComplete() {
    //this.setState({ playing: true });
  }

  componentWillLeave(callback) {
    this.card.onExit(callback);
  }

  onVideoReady() {
    this.setState({
      videoReady: true
    })

    this.card.onContentLoaded();
  }

  onAudioLoaded() {
    this.setState({ audioReady: true })
  }

  play() {
    this.player.play();
  }

  render() {
    return (
      <Card
        ref={card => this.card = card}
        key={this.state.key}
        cardTitle={this.props.roomData.title}
        onClick={(e) => this.play(e)}>

          <div>
            <VideoPlayer
              ref={player => this.player = player}
              videoSettings={this.props.roomData.videoSettings}
              isMobile={this.props.isMobile}
              onVideoReady={(e) => this.onVideoReady(e)}
              playing={this.state.playing}/>

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
